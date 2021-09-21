import { MenuContents } from "./menu-types";

export const menu: MenuContents = [
  {
    title: "Start Here",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Welcome", href: "/" },
          { title: "Getting Started", href: "/docs/v2/getting-started" },
          { title: "App Structure", href: "/docs/v2/structure" },
          { title: "Recommended Tools", href: "/docs/v2/tools" },
        ]
      },
      {
        title: "Guides",
        menuItems: [
          { title: "Using the CLI", href: "/docs/v2/cli" },
          { title: "Creating Your First App", href: "/docs/v2/create-first-app" },
          { title: "Implementing Your Methods", href: "/docs/v2/implementation" },
          { title: "Developing in TypeScript", href: "/docs/v2/typescript" },
          { title: "Environment Variables", href: "/docs/v2/environment-variables"},
          { title: "Error Handling", href: "/docs/v2/error-handling" },
          { title: "Testing", href: "/docs/v2/testing" },
          { title: "Publishing", href: "/docs/v2/publish" },
        ]
      }
    ]
  },
  {
    title: "Carrier Apps",
    subGroups: [
      {
        title: "App Structure",
        menuItems: [
          { title: "Carrier App", href: "/docs/v2/app-definition/carrier" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "Register", href: "/docs/v2/reference/methods/register" },
          { title: "Create Label", href: "/docs/v2/reference/methods/create-label" },
          { title: "Void Labels", href: "/docs/v2/reference/methods/void-labels" },
          { title: "Create Manifest", href: "/docs/v2/reference/methods/create-manifest" },
          { title: "Schedule Pickup", href: "/docs/v2/reference/methods/schedule-pickup" },
          { title: "Cancel Pickup", href: "/docs/v2/reference/methods/cancel-pickup" },
          { title: "Get Rates", href: "/docs/v2/reference/methods/get-rates" },
          { title: "Track", href: "/docs/v2/reference/methods/track" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Carrier API Reference", href: "https://shipstation.github.io/integrations-shipping/carrierapi-redoc.html" },
          { title: "Metadata", href: "/docs/v2/reference/metadata" },
          { title: "Address", href: "/docs/v2/reference/address" },
          { title: "Package", href: "/docs/v2/reference/package" },
          { title: "Customs", href: "/docs/v2/reference/customs" },
          { title: "Document", href: "/docs/v2/reference/document" },
          { title: "Units", href: "/docs/v2/reference/units" },
          { title: "Country Codes", href: "/docs/v2/reference/country-codes" },
          { title: "Common types", href: "/docs/v2/reference/common-types" },
          { title: "Billing Line Item", href: "/docs/v2/reference/billing-line-item" },
          { title: "Fulfillment Plan Details", href: "/docs/v2/reference/fulfillment-plan-details" },
          { title: "Track Event", href: "/docs/v2/reference/track-event" },
          { title: "Shipped Shipment", href: "/docs/v2/reference/shipped-shipment" },
          { title: "Shipped Package", href: "/docs/v2/reference/shipped-package" },
          { title: "Pickup Window", href: "/docs/v2/reference/pickup-window" },
          { title: "Pickup Confirmation", href: "/docs/v2/reference/pickup-confirmation" },
        ]
      },
    ]
  },
  {
    title: "Order Apps",
    subGroups: [
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/v2/app-definition/order-source" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "SalesOrdersExport", href: "/docs/v2/reference/methods/sales-orders-export" },
          { title: "GetProducts", href: "/docs/v2/reference/methods/get-products" },
          { title: "AcknowledgeOrders", href: "/docs/v2/reference/methods/acknowledge-orders" },
          { title: "ShipmentNotification", href: "/docs/v2/reference/methods/shipment-notification" },
          { title: "NotificationStatus", href: "/docs/v2/reference/methods/notification-status" },
          { title: "RegisterDeliveryOptions", href: "/docs/v2/reference/methods/register-delivery-options" },
          { title: "VerifyDeliveryOptions", href: "/docs/v2/reference/methods/verify-delivery-options" },
          { title: "RemoveDeliveryOptions", href: "/docs/v2/reference/methods/remove-delivery-options" },
          { title: "AcceptSalesOrderItems", href: "/docs/v2/reference/methods/accept-sales-order-items" },
          { title: "CancelSalesOrderItems", href: "/docs/v2/reference/methods/cancel-sales-order-items" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Address", href: "/docs/v2/reference/address#order-source-address-object" },
          { title: "Auth", href: "/docs/v2/reference/auth" },
          { title: "BillTo", href: "/docs/v2/reference/address#billto-address-object" },
          { title: "Branding", href: "/docs/v2/reference/branding" },
          { title: "Buyer", href: "/docs/v2/reference/buyer" },
          { title: "Charge", href: "/docs/v2/reference/charge" },
          { title: "Dimensions", href: "/docs/v2/reference/dimensions" },
          { title: "Note", href: "/docs/v2/reference/note" },
          { title: "OriginalOrderSource", href: "/docs/v2/reference/original-order-source" },
          { title: "PackingSlip", href: "/docs/v2/reference/packing-slip" },
          { title: "Payment", href: "/docs/v2/reference/payment" },
          { title: "Product", href: "/docs/v2/reference/product" },
          { title: "SalesOrderItem", href: "/docs/v2/reference/sales-order-item" },
          { title: "ShipmentNotificationResult", href: "/docs/v2/reference/shipment-notification-result" },
          { title: "ShippingPreferences", href: "/docs/v2/reference/shipping-preferences" },
          { title: "Weight", href: "/docs/v2/reference/weight" },
        ]
      }
    ]
  },
  {
    title: "OAuth",
    open: true,
    menuItems: [
      { title: "OAuth Configuration", href: "/docs/oauth" },
      { title: "Examples", href: "/docs/oauth#examples" }
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
    title: "Legacy Docs",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Welcome", href: "/docs/v1" },
          { title: "Getting Started", href: "/docs/v1/getting-started" },
          { title: "App Structure", href: "/docs/v1/structure" },
          { title: "Recommended Tools", href: "/docs/v1/tools" },
        ]
      },
      {
        title: "Guides",
        menuItems: [
          { title: "Contribution Guide", href: "/docs/v1/contributing" },
          { title: "Style Guide", href: "/docs/v1/style" },
          { title: "Using the CLI", href: "/docs/v1/cli" },
          { title: "Creating Your First App", href: "/docs/v1/create-first-app" },
          { title: "Implementing Your Methods", href: "/docs/v1/implementation" },
          { title: "Developing in TypeScript", href: "/docs/v1/typescript" },
          { title: "Environment Variables", href: "/docs/v1/environment-variables"},
          { title: "Error Handling", href: "/docs/v1/error-handling" },
          { title: "Testing", href: "/docs/v1/testing" },
          { title: "Publishing", href: "/docs/v1/publish" },
        ]
      },
      {
        title: "Reference",
        menuItems: [
          { title: "Changelog", href: "/changelog" },
          { title: "Form Definitions", href: "/docs/v1/reference/forms" },
          { title: "Carrier App Transaction", href: "/docs/v1/reference/transaction" },
          { title: "Order App Transaction", href: "/docs/v1/reference/order-transaction" },
          { title: "Address", href: "/docs/v1/reference/address" },
          { title: "Common Types", href: "/docs/v1/reference/common-types" },
          { title: "Country Codes", href: "/docs/v1/reference/country-codes" },
          { title: "Shipping Preference", href: "/docs/v1/reference/shipping-preferences" },
          { title: "Charge", href: "/docs/v1/reference/charge" },
        ]
      },
    ]
  },
  {
    title: "Legacy Carrier Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Overview", href: "/docs/v1/carrier-app" },
          { title: "How to map services", href: "/docs/v1/carrier-app/map-services" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Carrier App", href: "/docs/v1/reference/carrier" },
          { title: "Delivery Service", href: "/docs/v1/reference/delivery-service" },
          { title: "Pickup Service", href: "/docs/v1/reference/pickup-service" },
          { title: "Packaging", href: "/docs/v1/reference/packaging" },
          { title: "Delivery Confirmation", href: "/docs/v1/reference/delivery-confirmation" },
          { title: "Form Definitions", href: "/docs/v1/reference/forms " },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "connect", href: "/docs/v1/reference/methods/connect" },
          { title: "createShipment", href: "/docs/v1/reference/methods/create-shipment" },
          { title: "cancelShipments", href: "/docs/v1/reference/methods/cancel-shipments" },
          { title: "trackShipment", href: "/docs/v1/reference/methods/track-shipment" },
          { title: "rateShipment", href: "/docs/v1/reference/methods/rate-shipment" },
          { title: "createManifest", href: "/docs/v1/reference/methods/create-manifest" },
          { title: "schedulePickup", href: "/docs/v1/reference/methods/schedule-pickup" },
          { title: "cancelPickups", href: "/docs/v1/reference/methods/cancel-pickups" },
        ]
      },
    ]
  },
  {
    title: "Legacy Order Apps",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Overview", href: "/docs/v1/order-app" },
          { title: "Authorization", href: "/docs/v1/oauth" },
        ]
      },
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/v1/reference/order" },
          { title: "Form Definitions", href: "/docs/v1/reference/forms#order-apps" },
        ]
      },
      {
        title: "Methods",
        menuItems: [
          { title: "getSalesOrdersByDate", href: "/docs/v1/reference/methods/get-sales-orders-by-date" },
          { title: "shipmentCreated", href: "/docs/v1/reference/methods/shipment-created" },
          { title: "acknowledgeOrders", href: "/docs/v1/reference/methods/acknowledge-orders"}
        ]
      },
    ]
  }
];
