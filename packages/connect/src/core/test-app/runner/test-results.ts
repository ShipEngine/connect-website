export interface TestResults {
  passed: number;
  skipped: number;
  failed: number;
  hasFailed: () => boolean;
}

type ReducerOptions =
  | 'INCREMENT_PASSED'
  | 'INCREMENT_SKIPPED'
  | 'INCREMENT_FAILED';

export type TestReducer = (action: ReducerOptions) => void;

export function useTestResults(): [TestResults, TestReducer] {
  const testResults: TestResults = {
    passed: 0,
    skipped: 0,
    failed: 0,
    hasFailed: function () {
      return this.failed > 0;
    },
  };

  const reducer = (action: ReducerOptions) => {
    switch (action) {
      case 'INCREMENT_PASSED':
        testResults.passed++;
        return;
      case 'INCREMENT_SKIPPED':
        testResults.skipped++;
        return;
      case 'INCREMENT_FAILED':
        testResults.failed++;
    }
  };

  return [testResults, reducer];
}
