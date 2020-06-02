import { App } from "../../utils/types";
import Suite from "./suite";
import { Runner, RunnerResults } from "./runner";

interface TinyOptions {
  grep: string | undefined;
  failFast: boolean;
  concurrency: number;
  debug: boolean;
}

export default class Tiny {
  suites: Suite[];
  options: TinyOptions;

  constructor(
    app: App,
    suiteModules: any[],
    { grep, failFast = false, concurrency = 1, debug = false }: TinyOptions,
  ) {
    process.env.NODE_ENV = "test";

    this.options = { grep, failFast, concurrency, debug };

    let tempSuites = suiteModules.map(
      (suiteModule) => new suiteModule(app),
    ) as Suite[];

    if (this.options.grep) {
      tempSuites = this.filterTests(this.options.grep, tempSuites);
    }

    this.suites = tempSuites;
  }

  async run(): Promise<RunnerResults> {
    return await Runner(this.suites, this.options);
  }

  private filterTests(grep: string, suites: Suite[]): Suite[] {
    let tempSuites = suites.filter((suite) => suite.title === grep);

    if (tempSuites.length === 0) {
      tempSuites = suites.filter((suite) => {
        let tests = suite._testCache.filter((test) => test.sha.includes(grep));
        if (tests.length === 1) {
          suite.testCache = tests;
          return true;
        } else {
          return false;
        }
      });
    }

    return tempSuites;
  }
}
