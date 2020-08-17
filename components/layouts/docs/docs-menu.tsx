import Menu, { Group, MenuItem, SubGroup } from "./menu";

export default function DocsMenu() {
  return (
    <Menu>
      <Group title="Start Here">
        <SubGroup title="Overview">
          <MenuItem href="/">Welcome</MenuItem>
          <MenuItem href="/docs">Getting Started</MenuItem>
          <MenuItem href="/docs/structure">App Structure</MenuItem>
          <MenuItem href="/docs/tools">Recommended Tools</MenuItem>
        </SubGroup>
        <SubGroup title="Guides">
          <MenuItem href="/docs/cli">Using the CLI</MenuItem>
          <MenuItem href="/docs/create-first-app">Creating Your First App</MenuItem>
          <MenuItem href="/docs/implementation">Implementing Your Methods</MenuItem>
          <MenuItem href="/docs/error-handling">Error Handling</MenuItem>
          <MenuItem href="/docs/sandbox">Sandbox Environments</MenuItem>
          <MenuItem href="/docs/testing">Testing</MenuItem>
          <MenuItem href="/docs/publish">Publishing</MenuItem>
        </SubGroup>
        <SubGroup title="Reference">
          <MenuItem href="/docs/reference/forms">Form Definitions</MenuItem>
          <MenuItem href="/docs/reference/transaction">Transaction</MenuItem>
          <MenuItem href="/docs/reference/address">Address</MenuItem>
          <MenuItem href="/docs/reference/common-types">Common Types</MenuItem>
          <MenuItem href="/docs/reference/country-codes">Country Codes</MenuItem>
          <MenuItem href="/docs/reference/shipping-preferences">Shipping Preference</MenuItem>
          <MenuItem href="/docs/reference/charge">Charge</MenuItem>
        </SubGroup>
      </Group>

      <Group title="Carrier Apps">
        <SubGroup title="Overview">
          <MenuItem href="/docs/carrier-app">Overview</MenuItem>
          <MenuItem href="/docs/carrier-app/map-services">How to map services</MenuItem>
          <MenuItem href="/docs/testing/carrier-app-tests">Automated tests</MenuItem>
        </SubGroup>
        <SubGroup title="App Structure">
          <MenuItem href="/docs/reference/carrier">Carrier App</MenuItem>
          <MenuItem href="/docs/reference/delivery-service">Delivery Service</MenuItem>
          <MenuItem href="/docs/reference/pickup-service">Pickup Service</MenuItem>
          <MenuItem href="/docs/reference/packaging">Packaging</MenuItem>
          <MenuItem href="/docs/reference/delivery-confirmation">Delivery Confirmation</MenuItem>
          <MenuItem href="/docs/reference/forms">Forms</MenuItem>
        </SubGroup>
        <SubGroup title="Methods">
          <MenuItem href="/docs/reference/methods/connect">connect</MenuItem>
          <MenuItem href="/docs/reference/methods/create-shipment">createShipment</MenuItem>
          <MenuItem href="/docs/reference/methods/cancel-shipments">cancelShipments</MenuItem>
          <MenuItem href="/docs/reference/methods/track-shipment">trackShipment</MenuItem>
          <MenuItem href="/docs/reference/methods/rate-shipment">rateShipment</MenuItem>
          <MenuItem href="/docs/reference/methods/create-manifest">createManifest</MenuItem>
          <MenuItem href="/docs/reference/methods/schedule-pickup">schedulePickup</MenuItem>
          <MenuItem href="/docs/reference/methods/cancel-pickups">cancelPickups</MenuItem>
        </SubGroup>
      </Group>

      <Group title="Order Apps">
        <SubGroup title="Overview">
          <MenuItem href="/docs/order-app">Overview</MenuItem>
        </SubGroup>
        <SubGroup title="App Structure">
          <MenuItem href="/docs/reference/order">Order App</MenuItem>
          <MenuItem href="/docs/reference/forms">Forms</MenuItem>
        </SubGroup>
        <SubGroup title="Methods">
          <MenuItem href="/docs/reference/methods/connect">connect</MenuItem>
          <MenuItem href="/docs/reference/methods/get-sales-orders-by-date">getSalesOrdersByDate</MenuItem>
          <MenuItem href="/docs/reference/methods/shipment-created">shipmentCreated</MenuItem>
          <MenuItem href="/docs/reference/methods/shipment-cancelled">shipmentCancelled</MenuItem>
        </SubGroup>
      </Group>

      <Group title="Service" open>
        <MenuItem href="https://help.shipengine.com/">FAQ</MenuItem>
        <MenuItem href="https://help.shipengine.com/hc/en-us/requests/new">Support</MenuItem>
        <MenuItem href="https://status.shipengine.com/">API Status</MenuItem>
        <MenuItem href="https://www.shipengine.com/terms-of-service/">Terms of Service</MenuItem>
        <MenuItem href="https://www.shipengine.com/privacy-policy/">Privacy Policy</MenuItem>
      </Group>

      <Group title="Community" open>
        <MenuItem href="https://www.shipengine.com/blog/">Blog</MenuItem>
        <MenuItem href="https://www.meetup.com/Austin-Homegrown-API/">Meetup Group</MenuItem>
      </Group>

    </Menu>
  );
}
