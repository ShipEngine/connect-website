import Test from "./test";
import { App } from "../../utils/types";

export default abstract class Suite {
  app: App;
  abstract title: string;
  _testCache: Test[];

  constructor(app: App) {
    this.app = app;
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
