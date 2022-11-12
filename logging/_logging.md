# Logging
:::warning Avoid
Avoid using the generic JavaScript logging or a custom logging solution.
```JavaScript
// There is no way to tie this to a customers transaction
console.log('this will get lost easily');
```
:::

The `@shipengine/connect-runtime` provides a wrapper for logging in the form of a `logger` object that can be imported into any file demonstrated below.

```TypeScript
import { logger } from '@shipengine/connect-runtime';
```

This logger supports method calls that you would traditionally see in any JavaScript logging framework:
- `debug` - The **debug** log level should be used for information that may be needed for diagnosing issues and troubleshooting or when running application in the test environment for the purpose of making sure everything is running correctly.
- `info` - The standard log level indicating that something happened, the application entered a certain state, etc. For example, a controller of your authorization API may include an **info** log level with information on which user requested authorization if the authorization was successful or not. The information logged using the INFO log level should be purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.
- `warn` - The log level that indicates that something unexpected happened in the application, a problem, or a situation that might disturb one of the processes. But that doesn’t mean that the application failed. The **warn** level should be used in situations that are unexpected, but the code can continue the work. For example, a parsing error occurred that resulted in a certain document not being processed.
- `error` - The log level that should be used when the application hits an issue preventing one or more functionalities from properly functioning. The **error** log level can be used when one of the payment systems is not available, but there is still the option to check out the basket in the e-commerce application or when your social media logging option is not working for some reason.

An example usage of this logger can be found below
```TypeScript
import {
  CreateLabelRequest,
  CreateLabelResponse,
} from '@shipengine/connect-carrier-api';
import { logger } from '@shipengine/connect-runtime';

export const CreateLabel = async (
  request: CreateLabelRequest,
): Promise<CreateLabelResponse> => {
  logger.debug('This will be formatted as a debugging log');
  logger.info( 'This will be formatted as general information');
  logger.warn( 'This will be formatted as a warning');
  logger.error('This will be formatted as an error');

  // You can also log objects
  logger.info({
    response: ...some response payload,
    message: 'recieved a response'
  })
};
```

:::success Runtime Logger
The runtime logger formats messages in a way that is easier to parse, and also appends information like transaction id's an other id's that help our support team get to the root of an issue when a customer recieves an error.
:::
