import Test from "./test";
import { App } from "../../utils/types";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";

export default abstract class Suite {
  protected app: App;
  protected transaction: TransactionPOJO;
  protected debug: boolean;
  abstract title: string;
  _testCache: Test[];

  constructor(app: App, transaction: TransactionPOJO, debug = false) {
    this.app = app;
    this.transaction = transaction;
    this.debug = debug;
    this._testCache = this.tests();
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
