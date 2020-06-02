import Test from "./test";
import { App } from "../../utils/types";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { v4 } from "uuid";

export default abstract class Suite {
  app: App;
  protected transactionWithMockSession: TransactionPOJO;
  abstract title: string;
  _testCache: Test[];

  constructor(app: App) {
    this.app = app;
    this._testCache = this.tests();

    this.transactionWithMockSession = {
      id: v4(),
      isRetry: false,
      useSandbox: false,
      session: {},
    };
  }

  abstract tests(): Test[];

  set testCache(tests: Test[]) {
    this._testCache = tests;
  }

  protected test(title: string, fn: any): Test {
    return new Test({ title, fn });
  }

  protected xtest(title: string, fn: any): Test {
    return new Test({ title, fn, skip: true });
  }
}
