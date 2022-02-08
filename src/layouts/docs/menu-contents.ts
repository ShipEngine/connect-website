import { MenuContents } from "./menu-types";

export const menu: MenuContents = [
  {
    title: "Start Here",
    subGroups: [
      {
        title: "Overview",
        menuItems: [
          { title: "Welcome", href: "/" },
          { title: "Getting Started", href: "/docs/getting-started" },
          { title: "App Structure", href: "/docs/structure" },
          { title: "Recommended Tools", href: "/docs/tools" },
        ],
      },
      {
        title: "Guides",
        menuItems: [
          { title: "Using the CLI", href: "/docs/cli" },
          {
            title: "Creating Your First App",
            href: "/docs/create-first-app",
          },
          {
            title: "Implementing Your Methods",
            href: "/docs/implementation",
          },
          { title: "Developing in TypeScript", href: "/docs/typescript" },
          {
            title: "Environment Variables",
            href: "/docs/environment-variables",
          },
          { title: "Error Handling", href: "/docs/error-handling" },
          { title: "Testing", href: "/docs/testing" },
          { title: "Publishing", href: "/docs/publish" },
        ],
      },
    ],
  },
  {
    title: "Carrier Apps",
    subGroups: [
      {
        title: "App Structure",
        menuItems: [
          { title: "Carrier App", href: "/docs/app-definition/carrier" },
        ],
      },
      {
        title: "Methods",
        menuItems: [
          { title: "Register", href: "/docs/api/carrier#operation/Register" },
          {
            title: "Create Label",
            href: "/docs/api/carrier#operation/Create a Label",
          },
          {
            title: "Void Labels",
            href: "/docs/api/carrier#operation/Void%20a%20Label",
          },
          {
            title: "Create Manifest",
            href: "/docs/api/carrier#operation/Create%20Manifest",
          },
          {
            title: "Schedule Pickup",
            href: "/docs/api/carrier#operation/Schedule%20Adhoc%20Pickup",
          },
          {
            title: "Cancel Pickup",
            href: "/docs/api/carrier#operation/Cancel%20Adhoc%20Pickup",
          },
          { title: "Get Rates", href: "/docs/api/carrier#operation/Get%20Rates" },
          { title: "Track", href: "/docs/api/carrier#operation/Track%20a%20Shipment" },
        ],
      },
    ],
  },
  {
    title: "Order Apps",
    subGroups: [
      {
        title: "App Structure",
        menuItems: [
          { title: "Order App", href: "/docs/app-definition/order-source" },
        ],
      },
      {
        title: "Methods",
        menuItems: [
          {
            title: "SalesOrdersExport",
            href: "/docs/reference/methods/sales-orders-export",
          },
          {
            title: "GetProducts",
            href: "/docs/reference/methods/get-products",
          },
          {
            title: "AcknowledgeOrders",
            href: "/docs/reference/methods/acknowledge-orders",
          },
          {
            title: "ShipmentNotification",
            href: "/docs/reference/methods/shipment-notification",
          },
          {
            title: "NotificationStatus",
            href: "/docs/reference/methods/notification-status",
          },
          {
            title: "RegisterDeliveryOptions",
            href: "/docs/reference/methods/register-delivery-options",
          },
          {
            title: "VerifyDeliveryOptions",
            href: "/docs/reference/methods/verify-delivery-options",
          },
          {
            title: "RemoveDeliveryOptions",
            href: "/docs/reference/methods/remove-delivery-options",
          },
          {
            title: "AcceptSalesOrderItems",
            href: "/docs/reference/methods/accept-sales-order-items",
          },
          {
            title: "CancelSalesOrderItems",
            href: "/docs/reference/methods/cancel-sales-order-items",
          },
          {
            title: "GetConnectionContext",
            href: "/docs/reference/methods/get-connection-context",
          },
        ],
      },
    ],
  },
  {
    title: "Authentication",
    open: false,
    subGroups: [
      {
        title: "OAuth",
        menuItems: [
          { title: "OAuth Configuration", href: "/docs/oauth" },
          { title: "OAuth 1", href: "/docs/oauth/1.0" },
          { title: "OAuth 2", href: "/docs/oauth/2.0" },
        ],
      },
      {
        title: "Advanced",
        menuItems: [
          { title: "Response Transformation", href: "/docs/oauth/advanced/response-transformation" },
          { title: "Templating", href: "/docs/oauth/templating" },
          { title: "Connection Context", href: "/docs/oauth/advanced/connection-context" },
        ],
      },
      {
        title: "Examples",
        menuItems: [
          { title: "Example Definition", href: "/docs/oauth/examples/definition" },
          { title: "eBay", href: "/docs/oauth/examples/ebay" },
          { title: "Google", href: "/docs/oauth/examples/google" },
          { title: "Trade Me", href: "/docs/oauth/examples/trade-me" },
        ],
      },
    ],
  },
  {
    title: "Service",
    open: false,
    menuItems: [
      { title: "FAQ", href: "https://help.shipengine.com/" },
      {
        title: "Support",
        href: "https://help.shipengine.com/hc/en-us/requests/new",
      },
      { title: "API Status", href: "https://status.shipengine.com/" },
      {
        title: "Terms of Service",
        href: "https://www.shipengine.com/terms-of-service/",
      },
      {
        title: "Privacy Policy",
        href: "https://www.shipengine.com/privacy-policy/",
      },
    ],
  },
  {
    title: "Community",
    open: false,
    menuItems: [
      { title: "Blog", href: "https://www.shipengine.com/blog/" },
      {
        title: "Meetup Group",
        href: "https://www.meetup.com/Austin-Homegrown-API/",
      },
    ],
  }
];
