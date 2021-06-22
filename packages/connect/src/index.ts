/**
 * Export the ShipEngine Connect SDK library, so app developers can import type definitions,
 * enumerations, and error classes.
 */
process.emitWarning(
  'Importing @shipengine/connect as a dependency in your app is no longer supported, ' +
    'please install the latest version of @shipengine/connect-sdk instead.',
  'DeprecationWarning',
);

export * from '@shipengine/connect-sdk';
