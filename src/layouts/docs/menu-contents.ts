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
          { title: "Contribution Guide", href: "/docs/contributing" },
          { title: "Style Guide", href: "/docs/style" },
          { title: "Using the CLI", href: "/docs/cli" },
          { title: "Creating Your First App", href: "/docs/create-first-app" },
          { title: "Implementing Your Methods", href: "/docs/implementation" },
          { title: "Developing in TypeScript", href: "/docs/typescript" },
          { title: "Environment Variables", href: "/docs/environment-variables"},
          { title: "Error Handling", href: "/docs/error-handling" },
          { title: "Testing", href: "/docs/testing" },
          { title: "Publishing", href: "/docs/publish" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Changelog", href: "/changelog" },
          { title: "Form Definitions", href: "/docs/reference/forms" },
          { title: "Carrier App Transaction", href: "/docs/reference/transaction" },
          { title: "Order App Transaction", href: "/docs/reference/order-transaction" },
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
          { title: "Form Definitions", href: "/docs/reference/forms " },
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
          { title: "Authorization", href: "/docs/oauth" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/reference/order" },
          { title: "Form Definitions", href: "/docs/reference/forms#order-apps" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "getSalesOrdersByDate", href: "/docs/reference/methods/get-sales-orders-by-date" },
          { title: "shipmentCreated", href: "/docs/reference/methods/shipment-created" },
          { title: "acknowledgeOrders", href: "/docs/reference/methods/acknowledge-orders"}
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
  {
    title: "Beta Carrier Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Connect Apps 2.0", href: "/docs/beta" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Carrier App", href: "/docs/beta/app-definition/carrier" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "Register", href: "/docs/beta/reference/methods/register" },
          { title: "Create Label", href: "/docs/beta/reference/methods/create-label" },
          { title: "Void Labels", href: "/docs/beta/reference/methods/void-labels" },
          { title: "Create Manifest", href: "/docs/beta/reference/methods/create-manifest" },
          { title: "Schedule Pickup", href: "/docs/beta/reference/methods/schedule-pickup" },
          { title: "Cancel Pickup", href: "/docs/beta/reference/methods/cancel-pickup" },
          { title: "Get Rates", href: "/docs/beta/reference/methods/get-rates" },
          { title: "Track", href: "/docs/beta/reference/methods/track" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Metadata", href: "/docs/beta/reference/metadata" },
          { title: "Address", href: "/docs/beta/reference/address" },
          { title: "Package", href: "/docs/beta/reference/package" },
          { title: "Customs", href: "/docs/beta/reference/customs" },
          { title: "Document", href: "/docs/beta/reference/document" },
          { title: "Units", href: "/docs/beta/reference/units" },
          { title: "Country Codes", href: "/docs/beta/reference/country-codes" },
          { title: "Common types", href: "/docs/beta/reference/common-types" },
          { title: "Billing Line Item", href: "/docs/beta/reference/billing-line-item" },
          { title: "Fulfillment Plan Details", href: "/docs/beta/reference/fulfillment-plan-details" },
          { title: "Track Event", href: "/docs/beta/reference/track-event" },
          { title: "Shipped Shipment", href: "/docs/beta/reference/shipped-shipment" },
          { title: "Shipped Package", href: "/docs/beta/reference/shipped-package" },
          { title: "Pickup Window", href: "/docs/beta/reference/pickup-window" },
          { title: "Pickup Confirmation", href: "/docs/beta/reference/pickup-confirmation" },
        ]
      },
    ]
  },
  {
    title: "Beta Order Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Connect Apps 2.0", href: "/docs/beta" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/beta/app-definition/order-source" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "SalesOrdersExport", href: "/docs/beta/reference/methods/sales-orders-export" }
        ]
      }
    ]
  }
];
