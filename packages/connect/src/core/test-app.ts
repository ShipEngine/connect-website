import loadAndValidateApp, { isInvalidAppError } from './load-and-validate-app';
import { TestResults, useTestResults } from './test-app/runner/test-results';
import { SdkApp } from './types';
import { logFail, logPass, logStep } from './utils/log-helpers';
import { logResults } from './utils/log-helpers';

export default async function testApp(pathToApp: string): Promise<TestResults> {
  const [testResults, testResultsReducer] = useTestResults();

  // Set NODE_ENV first because its possible that the shipengine.config
  // might key off the process.env to set environment variables
  process.env.NODE_ENV = 'test';

  let app: SdkApp;

  try {
    logStep('validating app structure');

    app = await loadAndValidateApp(pathToApp);

    logPass('app structure is valid');
    testResultsReducer('INCREMENT_PASSED');
  } catch (error) {
    if (isInvalidAppError(error)) {
      const errorsCount = error.errors.length;
      const errorsWithInflection = errorsCount > 1 ? 'errors' : 'error';

      logFail(
        `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`,
      );

      error.errors.forEach((errorMessage: string) => {
        logFail(errorMessage);
      });

      for (let i = 0; i < errorsCount; i++) {
        testResultsReducer('INCREMENT_FAILED');
      }

      logResults(testResults);
      return testResults;
    }

    throw error;
  }

  return testResults;
}
