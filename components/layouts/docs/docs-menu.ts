import { MenuContents } from "./menu-types";

export const menu: MenuContents = [
  {
    title: "Start Here",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Welcome", href: "/" },
          { title: "Getting Started", href: "/docs" },
          { title: "App Structure", href: "/docs/structure" },
          { title: "Recommended Tools", href: "/docs/tools" },
        ]
      },
      {
        title: "Guides",
        menuItems: [
          { title: "Using the CLI", href: "/docs/cli" },
          { title: "Creating Your First App", href: "/docs/create-first-app" },
          { title: "Implementing Your Methods", href: "/docs/implementation" },
          { title: "Error Handling", href: "/docs/error-handling" },
          { title: "Sandbox Environments", href: "/docs/sandbox" },
          { title: "Testing", href: "/docs/testing" },
          { title: "Publishing", href: "/docs/publish" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Form Definitions", href: "/docs/reference/forms" },
          { title: "Transaction", href: "/docs/reference/transaction" },
          { title: "Address", href: "/docs/reference/address" },
          { title: "Common Types", href: "/docs/reference/common-types" },
          { title: "Country Codes", href: "/docs/reference/country-codes" },
          { title: "Shipping Preference", href: "/docs/reference/shipping-preferences" },
          { title: "Charge", href: "/docs/reference/charge" },
        ]
      },
    ]
  },
  {
    title: "Carrier Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Overview", href: "/docs/carrier-app" },
          { title: "How to map services", href: "/docs/carrier-app/map-services" },
          { title: "Automated tests", href: "/docs/testing/carrier-app-tests" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Carrier App", href: "/docs/reference/carrier" },
          { title: "Delivery Service", href: "/docs/reference/delivery-service" },
          { title: "Pickup Service", href: "/docs/reference/pickup-service" },
          { title: "Packaging", href: "/docs/reference/packaging" },
          { title: "Delivery Confirmation", href: "/docs/reference/delivery-confirmation" },
          { title: "Forms", href: "/docs/reference/forms" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "connect", href: "/docs/reference/methods/connect" },
          { title: "createShipment", href: "/docs/reference/methods/create-shipment" },
          { title: "cancelShipments", href: "/docs/reference/methods/cancel-shipments" },
          { title: "trackShipment", href: "/docs/reference/methods/track-shipment" },
          { title: "rateShipment", href: "/docs/reference/methods/rate-shipment" },
          { title: "createManifest", href: "/docs/reference/methods/create-manifest" },
          { title: "schedulePickup", href: "/docs/reference/methods/schedule-pickup" },
          { title: "cancelPickups", href: "/docs/reference/methods/cancel-pickups" },
        ]
      },
    ]
  },
  {
    title: "Order Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Overview", href: "/docs/order-app" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/reference/order" },
          { title: "Forms", href: "/docs/reference/forms" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "connect", href: "/docs/reference/methods/connect" },
          { title: "getSalesOrdersByDate", href: "/docs/reference/methods/get-sales-orders-by-date" },
          { title: "shipmentCreated", href: "/docs/reference/methods/shipment-created" },
          { title: "shipmentCancelled", href: "/docs/reference/methods/shipment-cancelled" },
        ]
      },
    ]
  },
  {
    title: "Service",
    open: true,
    menuItems: [
      { title: "FAQ", href: "https://help.shipengine.com/" },
      { title: "Support", href: "https://help.shipengine.com/hc/en-us/requests/new" },
      { title: "API Status", href: "https://status.shipengine.com/" },
      { title: "Terms of Service", href: "https://www.shipengine.com/terms-of-service/" },
      { title: "Privacy Policy", href: "https://www.shipengine.com/privacy-policy/" },
    ]
  },
  {
    title: "Community",
    open: true,
    menuItems: [
      { title: "Blog", href: "https://www.shipengine.com/blog/" },
      { title: "Meetup Group", href: "https://www.meetup.com/Austin-Homegrown-API/" },
    ],
  },
];
