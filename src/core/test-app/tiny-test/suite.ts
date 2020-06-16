import Test from "./test";
import { SdkApp } from "../../types";
import { TransactionPOJO } from "@shipengine/integration-platform-sdk";
import { TinyStaticConfig } from './tiny';

export default abstract class Suite {
  protected app: SdkApp;
  protected transaction: TransactionPOJO;
  protected debug: boolean;
  abstract title: string;
  protected staticConfig: TinyStaticConfig;
  _testCache: Test[];

  constructor(app: SdkApp, transaction: TransactionPOJO, debug = false, staticConfig: TinyStaticConfig) {
    this.app = app;
    this.transaction = transaction;
    this.debug = debug;
    this.staticConfig = staticConfig;
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
