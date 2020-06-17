
import { Suite, TestProp, expect } from "../tiny-test";
import { OrderApp, TransactionPOJO, SalesOrderTimeRangePOJO, DateTimeZonePOJO } from "@shipengine/integration-platform-sdk";
import { DateTime } from "luxon";

type GetSalesOrdersByDateProps = [TransactionPOJO, SalesOrderTimeRangePOJO];

export class GetSalesOrdersByDateTestSuite extends Suite {
  title = "getSalesOrdersByDate";

  tests() {
    const orderApp = this.app as OrderApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          orderApp.getSalesOrdersByDate &&
            (result = await orderApp.getSalesOrdersByDate(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<GetSalesOrdersByDateProps>[] {
    let props: TestProp<GetSalesOrdersByDateProps>[] = [];

    createStaticTests(props, this.transaction);

    // Check shipengine.config.js for props to add to the test module
    if (this.staticConfig.methods && this.staticConfig.methods.getSalesOrderByDate) {
      for (let prop of this.staticConfig.methods.getSalesOrderByDate) {
        const title = composeTitle(prop);
        props.push({
          title,
          props: [this.transaction, prop]
        });
      }
    }

    return props;
  }
}

function composeTitle(prop: SalesOrderTimeRangePOJO): string {

  const startRange = getTimeString(prop.startDateTime);
  const endRange = getTimeString(prop.startDateTime);

  let title = `Get Sales Order with a Date Range of ${startRange} - ${endRange} and ${prop.includeChanges ? "" : "do not "}include changes`;
  return title;
}

function getTimeString(time: DateTimeZonePOJO | Date | string) {

  if (typeof time === "string") {
    return time;
  }
  else if(isDateTimeZonePOJO(time)) {
    const localTime = DateTime.fromISO(time.value, {zone: time.timeZone});
    return localTime.toISO();
  }
  else {
    return time.toISOString();
  }
}

function isDateTimeZonePOJO(dt: object): dt is DateTimeZonePOJO {
  return ("value" in dt && "timeZone" in dt);
}

function createStaticTests(props: TestProp<GetSalesOrdersByDateProps>[], transaction: TransactionPOJO<object>): void {
  let date = new Date();
  let noChanges: SalesOrderTimeRangePOJO = {
    startDateTime: DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).toISO(),
    endDateTime: DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).minus({ days: 1 }).toISO()
  }

  props.push({
    title: composeTitle(noChanges),
    props:[transaction, noChanges]
  });

  let includeChanges: SalesOrderTimeRangePOJO = {
    startDateTime: DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).toISO(),
    endDateTime: DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).minus({ days: 1 }).toISO(),
    includeChanges: true
  }

  props.push({
    title: composeTitle(includeChanges),
    props:[transaction, includeChanges]
  });
}