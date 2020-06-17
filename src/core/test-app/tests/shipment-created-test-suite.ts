import { Suite, TestProp, expect } from "../tiny-test";
import { OrderApp, TransactionPOJO, SalesOrderShipmentPOJO, SalesOrderPackagePOJO, SalesOrderPackageItemPOJO, QuantityUnit } from "@shipengine/integration-platform-sdk";
import { buildAddressWithContactInfo } from '../factories/address';

type ShipmentCreatedProps = [TransactionPOJO, SalesOrderShipmentPOJO];

export class ShipmentCreatedTestSuite extends Suite {
  title = "shipmentCreated";

  tests() {
    const orderApp = this.app as OrderApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let errorResult;
        try {
          orderApp.shipmentCreated &&
            (await orderApp.shipmentCreated(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
        }
      });
    });
  }

  private testProps(): TestProp<ShipmentCreatedProps>[] {
    let props: TestProp<ShipmentCreatedProps>[] = [];

    if (this.staticConfig.methods && this.staticConfig.methods.shipmentCreated) {
      for (let prop of this.staticConfig.methods.shipmentCreated) {
        const title = composeTitle(prop);
        props.push({
          title,
          props: [this.transaction, prop]
        });
      }
    }

    createStaticTests(props, this.transaction);

    return props;
  }
}

function composeTitle(prop: SalesOrderShipmentPOJO): string {
  let title = "Shipment Created:";

  if(prop.trackingNumber) {
    title += ` with tracking number: ${prop.trackingNumber}`;
  }

  if(prop.shipFrom) {
    title += ` shipping from: ${prop.shipFrom.country}`;
  }

  if (prop.shipTo) {
    title += ` shipping to: ${prop.shipTo.country}`;
  }

  return title;
}

function createStaticTests(props: TestProp<ShipmentCreatedProps>[], transaction: TransactionPOJO): void {
  const packageItem: SalesOrderPackageItemPOJO = {
    salesOrder: {
      id: "123456"
    },
    salesOrderItem: {
      id: "1234556",
      sku: "blah blah"
    },
    quantity: {
      value: 3,
      unit: QuantityUnit.Each
    }
  }

  const packagePOJO: SalesOrderPackagePOJO = {
    contents: [packageItem]
  }

  let salesOrderShipment: SalesOrderShipmentPOJO = {
    shipFrom: buildAddressWithContactInfo("US-from")!,
    shipTo: buildAddressWithContactInfo("US-to")!,
    shipDateTime: new Date(),
    packages: [packagePOJO]
  }

  const title = `Shipment Created: handles an invalid sales order id`;

  props.push({
    title: title,
    props: [transaction, salesOrderShipment]
  });
}