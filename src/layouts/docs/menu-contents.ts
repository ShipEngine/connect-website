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
          { title: "Register", href: "/docs/reference/methods/register" },
          {
            title: "Create Label",
            href: "/docs/reference/methods/create-label",
          },
          {
            title: "Void Labels",
            href: "/docs/reference/methods/void-labels",
          },
          {
            title: "Create Manifest",
            href: "/docs/reference/methods/create-manifest",
          },
          {
            title: "Schedule Pickup",
            href: "/docs/reference/methods/schedule-pickup",
          },
          {
            title: "Cancel Pickup",
            href: "/docs/reference/methods/cancel-pickup",
          },
          { title: "Get Rates", href: "/docs/reference/methods/get-rates" },
          { title: "Track", href: "/docs/reference/methods/track" },
        ],
      },
      {
        title: "Reference",
        menuItems: [
          {
            title: "Carrier API Reference",
            href: "https://shipstation.github.io/integrations-shipping/carrierapi-redoc.html",
          },
          { title: "Metadata", href: "/docs/reference/metadata" },
          {
            "title": "Forms",
            "href": "/docs/reference/forms"
          },
          { title: "Address", href: "/docs/reference/carrier-address" },
          { title: "Package", href: "/docs/reference/package" },
          { title: "Customs", href: "/docs/reference/customs" },
          { title: "Document", href: "/docs/reference/document" },
          { title: "Units", href: "/docs/reference/units" },
          { title: "Country Codes", href: "/docs/reference/country-codes" },
          { title: "Common types", href: "/docs/reference/common-types" },
          {
            title: "Billing Line Item",
            href: "/docs/reference/billing-line-item",
          },
          {
            title: "Fulfillment Plan Details",
            href: "/docs/reference/fulfillment-plan-details",
          },
          { title: "Track Event", href: "/docs/reference/track-event" },
          {
            title: "Shipped Shipment",
            href: "/docs/reference/shipped-shipment",
          },
          {
            title: "Shipped Package",
            href: "/docs/reference/shipped-package",
          },
          { title: "Pickup Window", href: "/docs/reference/pickup-window" },
          {
            title: "Pickup Confirmation",
            href: "/docs/reference/pickup-confirmation",
          },
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
            title: "RejectSalesOrderItems",
            href: "/docs/reference/methods/reject-sales-order-items",
          },
          {
            title: "GetConnectionContext",
            href: "/docs/reference/methods/get-connection-context",
          },
          {
            title: "GetPackingSlipTemplate",
            href: "/docs/reference/methods/get-packing-slip-template",
          },
        ],
      },
      {
        title: "Reference",
        menuItems: [
          {
            "title": "ResidentialIndicator",
            "href": "/docs/reference/residential-indicator"
          },
          {
            "title": "Address",
            "href": "/docs/reference/order-address"
          },
          {
            "title": "PickupLocation",
            "href": "/docs/reference/pickup-location"
          },
          {
            "title": "BillTo",
            "href": "/docs/reference/bill-to"
          },
          {
            "title": "Branding",
            "href": "/docs/reference/branding"
          },
          {
            "title": "Buyer",
            "href": "/docs/reference/buyer"
          },
          {
            "title": "Charge",
            "href": "/docs/reference/charge"
          },
          {
            "title": "ShipEngineErrorCode",
            "href": "/docs/reference/ship-engine-error-code"
          },
          {
            "title": "DetailedError",
            "href": "/docs/reference/detailed-error"
          },
          {
            "title": "DimensionsUnit",
            "href": "/docs/reference/dimensions-unit"
          },
          {
            "title": "Dimensions",
            "href": "/docs/reference/dimensions"
          },
          {
            "title": "DocumentFormat",
            "href": "/docs/reference/document-format"
          },
          {
            "title": "DocumentType",
            "href": "/docs/reference/document-type"
          },
          {
            "title": "Document",
            "href": "/docs/reference/document"
          },
          {
            "title": "LabelVoucher",
            "href": "/docs/reference/label-voucher"
          },
          {
            "title": "NoteType",
            "href": "/docs/reference/note-type"
          },
          {
            "title": "Note",
            "href": "/docs/reference/note"
          },
          {
            "title": "PaymentStatus",
            "href": "/docs/reference/payment-status"
          },
          {
            "title": "Payment",
            "href": "/docs/reference/payment"
          },
          {
            "title": "Product",
            "href": "/docs/reference/product"
          },
          {
            "title": "ProductDetail",
            "href": "/docs/reference/product-detail"
          },
          {
            "title": "ProductIdentifiers",
            "href": "/docs/reference/product-identifiers"
          },
          {
            "title": "ProductUrls",
            "href": "/docs/reference/product-urls"
          },
          {
            "title": "SalesOrderItem",
            "href": "/docs/reference/sales-order-item"
          },
          {
            "title": "SalesOrderStatus",
            "href": "/docs/reference/sales-order-status"
          },
          {
            "title": "OriginalOrderSource",
            "href": "/docs/reference/original-order-source"
          },
          {
            "title": "RequestedFulfillment",
            "href": "/docs/reference/requested-fulfillment"
          },
          {
            "title": "RequestedFulfillmentExtensions",
            "href": "/docs/reference/requested-fulfillment-extensions"
          },
          {
            "title": "SalesOrder",
            "href": "/docs/reference/sales-order"
          },
          {
            "title": "NotificationStatus",
            "href": "/docs/reference/notification-status"
          },
          {
            "title": "ShipmentNotificationResult",
            "href": "/docs/reference/shipment-notification-result"
          },
          {
            "title": "ShippingPreferences",
            "href": "/docs/reference/shipping-preferences"
          },
          {
            "title": "WeightUnit",
            "href": "/docs/reference/weight-unit"
          },
          {
            "title": "Weight",
            "href": "/docs/reference/weight"
          },
          {
            "title": "AcceptSalesOrderItemsNotification",
            "href": "/docs/reference/accept-sales-order-items-notification"
          },
          {
            "title": "AcceptSalesOrderItemsRequest",
            "href": "/docs/reference/accept-sales-order-items-request"
          },
          {
            "title": "RequestedAcceptItem",
            "href": "/docs/reference/requested-accept-item"
          },
          {
            "title": "RequestedAcceptProduct",
            "href": "/docs/reference/requested-accept-product"
          },
          {
            "title": "AcknowledgeOrdersRequest",
            "href": "/docs/reference/acknowledge-orders-request"
          },
          {
            "title": "OrderAcknowledgement",
            "href": "/docs/reference/order-acknowledgement"
          },
          {
            "title": "CancelSalesOrderItemsNotification",
            "href": "/docs/reference/cancel-sales-order-items-notification"
          },
          {
            "title": "CancelSalesOrderItemsRequest",
            "href": "/docs/reference/cancel-sales-order-items-request"
          },
          {
            "title": "RequestedCancelItem",
            "href": "/docs/reference/requested-cancel-item"
          },
          {
            "title": "RequestedCancelProduct",
            "href": "/docs/reference/requested-cancel-product"
          },
          {
            "title": "RejectSalesOrderItemsNotification",
            "href": "/docs/reference/reject-sales-order-items-notification"
          },
          {
            "title": "RejectSalesOrderItemsRequest",
            "href": "/docs/reference/reject-sales-order-items-request"
          },
          {
            "title": "RequestedRejectItem",
            "href": "/docs/reference/requested-reject-item"
          },
          {
            "title": "RequestedRejectProduct",
            "href": "/docs/reference/requested-reject-product"
          },
          {
            "title": "GetConnectionContextRequest",
            "href": "/docs/reference/get-connection-context-request"
          },
          {
            "title": "GetConnectionContextResponse",
            "href": "/docs/reference/get-connection-context-response"
          },
          {
            "title": "GetProductsRequest",
            "href": "/docs/reference/get-products-request"
          },
          {
            "title": "NotificationStatusRequest",
            "href": "/docs/reference/notification-status-request"
          },
          {
            "title": "PendingNotification",
            "href": "/docs/reference/pending-notification"
          },
          {
            "title": "RegisterDeliveryOptionsRequest",
            "href": "/docs/reference/register-delivery-options-request"
          },
          {
            "title": "RemoveDeliveryOptionsRequest",
            "href": "/docs/reference/remove-delivery-options-request"
          },
          {
            "title": "Auth",
            "href": "/docs/reference/auth"
          },
          {
            "title": "Forms",
            "href": "/docs/reference/forms"
          },
          {
            "title": "RequestBase",
            "href": "/docs/reference/request-base"
          },
          {
            "title": "SalesOrderStatusMapping",
            "href": "/docs/reference/sales-order-status-mapping"
          },
          {
            "title": "SalesOrderCustomFieldMappings",
            "href": "/docs/reference/sales-order-custom-field-mappings"
          },
          {
            "title": "SalesOrderCustomStatusMappings",
            "href": "/docs/reference/sales-order-custom-status-mappings"
          },
          {
            "title": "SalesOrderExportCriteria",
            "href": "/docs/reference/sales-order-export-criteria"
          },
          {
            "title": "SalesOrdersExportRequest",
            "href": "/docs/reference/sales-orders-export-request"
          },
          {
            "title": "ShipmentNotification",
            "href": "/docs/reference/shipment-notification"
          },
          {
            "title": "ShipmentNotificationItem",
            "href": "/docs/reference/shipment-notification-item"
          },
          {
            "title": "ShipmentNotificationRequest",
            "href": "/docs/reference/shipment-notification-request"
          },
          {
            "title": "VerifyDeliveryOptionsRequest",
            "href": "/docs/reference/verify-delivery-options-request"
          },
          {
            "title": "AcceptSalesOrderItemsResponse",
            "href": "/docs/reference/accept-sales-order-items-response"
          },
          {
            "title": "AcceptSalesOrderItemsResult",
            "href": "/docs/reference/accept-sales-order-items-result"
          },
          {
            "title": "AcknowledgeOrdersResponse",
            "href": "/docs/reference/acknowledge-orders-response"
          },
          {
            "title": "OrderAcknowledgementResponse",
            "href": "/docs/reference/order-acknowledgement-response"
          },
          {
            "title": "BadRequestResponse",
            "href": "/docs/reference/bad-request-response"
          },
          {
            "title": "CancelSalesOrderItemsResponse",
            "href": "/docs/reference/cancel-sales-order-items-response"
          },
          {
            "title": "CancelSalesOrderItemsResult",
            "href": "/docs/reference/cancel-sales-order-items-result"
          },
          {
            "title": "ExternalServerErrorResponse",
            "href": "/docs/reference/external-server-error-response"
          },
          {
            "title": "GetProductsResponse",
            "href": "/docs/reference/get-products-response"
          },
          {
            "title": "InternalServerErrorResponse",
            "href": "/docs/reference/internal-server-error-response"
          },
          {
            "title": "NotificationStatusResponse",
            "href": "/docs/reference/notification-status-response"
          },
          {
            "title": "RateLimitResponse",
            "href": "/docs/reference/rate-limit-response"
          },
          {
            "title": "RegisterDeliveryOptionsResponse",
            "href": "/docs/reference/register-delivery-options-response"
          },
          {
            "title": "RemoveDeliveryOptionsResponse",
            "href": "/docs/reference/remove-delivery-options-response"
          },
          {
            "title": "SalesOrdersExportResponse",
            "href": "/docs/reference/sales-orders-export-response"
          },
          {
            "title": "ShipmentNotificationResponse",
            "href": "/docs/reference/shipment-notification-response"
          },
          {
            "title": "UnauthorizedResponse",
            "href": "/docs/reference/unauthorized-response"
          },
          {
            "title": "VerifyDeliveryOptionsResponse",
            "href": "/docs/reference/verify-delivery-options-response"
          }
        ],
      },
    ],
  },
  {
    title: "Fulfillment Apps",
    subGroups: [
      {
        title: "App Structure",
        menuItems: [
          {
            title: "Fulfillment Provider App",
            href: "/docs/app-definition/fulfillment-provider",
          },
        ],
      },
      {
        title: "Methods",
        menuItems: [
          {
            title: "Cancellation",
            href: "/docs/reference/fulfillment-provider/methods/cancellation",
          },
          {
            title: "Connect",
            href: "/docs/reference/fulfillment-provider/methods/connect",
          },
          {
            title: "Delegate Fulfillment",
            href:
              "/docs/reference/fulfillment-provider/methods/delegate-fulfillment",
          },
          {
            title: "Get Recent Changes",
            href:
              "/docs/reference/fulfillment-provider/methods/get-recent-changes",
          },
          {
            title: "Inventory",
            href: "/docs/reference/fulfillment-provider/methods/inventory",
          },
          {
            title: "Rates",
            href: "/docs/reference/fulfillment-provider/methods/rates",
          },
          {
            title: "Status",
            href: "/docs/reference/fulfillment-provider/methods/status",
          },
        ],
      },
      {
        title: "Reference",
        menuItems: [
          {
            title: "Address",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/address",
          },
          {
            title: "AddressResidentialIndicator",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/addresses/address-residential-indicator",
          },
          {
            title: "AdvancedOptions",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/advanced-options",
          },
          {
            title: "Auth",
            href: "/docs/reference/fulfillment-provider/models/auth",
          },
          {
            title: "BillingCategories",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/billing/billing-categories",
          },
          {
            title: "BillingLineItem",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/billing/billing-line-item",
          },
          {
            title: "BillTo",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/bill-to",
          },
          {
            title: "Branding",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/branding",
          },
          {
            title: "Buyer",
            href: "/docs/reference/fulfillment-provider/models/order-source/buyer",
          },
          {
            title: "CancellationDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/cancellation-details",
          },
          {
            title: "CancellationRequest",
            href:
              "/docs/reference/fulfillment-provider/requests/cancel-fulfillment-request",
          },
          {
            title: "CancellationReason",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/cancellation-reason",
          },
          {
            title: "CancellationResponse",
            href:
              "/docs/reference/fulfillment-provider/responses/cancel-fulfillment-response",
          },
          {
            title: "Charge",
            href: "/docs/reference/fulfillment-provider/models/order-source/charge",
          },
          {
            title: "ConfirmationTypes",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/confirmation-types",
          },
          {
            title: "ConnectRequest",
            href: "/docs/reference/fulfillment-provider/requests/connect-request",
          },
          {
            title: "ConnectResponse",
            href: "/docs/reference/fulfillment-provider/responses/connect-response",
          },
          {
            title: "Currency",
            href: "/docs/reference/fulfillment-provider/models/carrier/currency",
          },
          {
            title: "Customs",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/customs/customs",
          },
          {
            title: "CustomsContentTypes",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/customs/customs-content-types",
          },
          {
            title: "CustomsItem",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/customs/customs-item",
          },
          {
            title: "CustomsNonDelivery",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/customs/customs-non-delivery",
          },
          {
            title: "DelegationRequest",
            href:
              "/docs/reference/fulfillment-provider/requests/delegate-fulfillment-request",
          },
          {
            title: "DelegationResponse",
            href:
              "/docs/reference/fulfillment-provider/responses/delegate-fulfillment-response",
          },
          {
            title: "DetailedError",
            href:
              "/docs/reference/fulfillment-provider/models/errors/detailed-error",
          },
          {
            title: "DimensionDetails",
            href:
              "/docs/reference/fulfillment-provider/models/units/dimension-details",
          },
          {
            title: "DimensionUnit",
            href:
              "/docs/reference/fulfillment-provider/models/units/dimension-unit",
          },
          {
            title: "Dimensions",
            href: "/docs/reference/fulfillment-provider/models/units/dimensions",
          },
          {
            title: "Document",
            href: "/docs/reference/fulfillment-provider/models/documents/document",
          },
          {
            title: "DocumentFormat",
            href:
              "/docs/reference/fulfillment-provider/models/documents/document-format",
          },
          {
            title: "DocumentType",
            href:
              "/docs/reference/fulfillment-provider/models/documents/document-type",
          },
          {
            title: "FormDownload",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/form-download",
          },
          {
            title: "FulfillmentPlanDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/fulfillment-plans/fulfillment-plan-details",
          },
          {
            title: "FulfillmentPlanItems",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/fulfillment-plans/fulfillment-plan-items",
          },       
          {
            title: "GetFulfillmentRequest",
            href: "/docs/reference/fulfillment-provider/requests/get-fulfillment-request",
          },
          {
            title: "GetFulfillmentResponse",
            href: "/docs/reference/fulfillment-provider/responses/get-fulfillment-response",
          }, 
          {
            title: "GetInventoryRequest",
            href: "/docs/reference/fulfillment-provider/requests/get-inventory-request",
          },
          {
            title: "GetInventoryResponse",
            href:
              "/docs/reference/fulfillment-provider/responses/get-inventory-response",
          },
          {
            title: "GetRatesRequest",
            href: "/docs/reference/fulfillment-provider/requests/get-rates-request",
          },
          {
            title: "GetRatesResponse",
            href:
              "/docs/reference/fulfillment-provider/responses/get-rates-response",
          },
          {
            title: "GetRecentChangesRequest",
            href:
              "/docs/reference/fulfillment-provider/requests/get-recent-changes-request",
          },
          {
            title: "GetRecentChangesResponse",
            href:
              "/docs/reference/fulfillment-provider/responses/get-recent-changes-response",
          },
          {
            title: "Identifier",
            href: "/docs/reference/fulfillment-provider/models/carrier/identifier",
          },
          {
            title: "InsuranceProviders",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/insurance-providers",
          },
          {
            title: "Label",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/manifests/label",
          },
          {
            title: "LabelDownload",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/label-download",
          },
          {
            title: "LabelLayouts",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/label-layouts",
          },
          {
            title: "LabelMessage",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/label-message",
          },
          {
            title: "LabelPackage",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/label-package",
          },
          {
            title: "LabelVoucher",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/label-voucher",
          },
          {
            title: "Manifest",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/manifests/manifest",
          },
          {
            title: "Note",
            href: "/docs/reference/fulfillment-provider/models/order-source/note",
          },
          {
            title: "NoteType",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/note-type",
          },
          {
            title: "OriginalOrderSource",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/original-order-source",
          },    
          {
            title: "Package",
            href: "/docs/reference/fulfillment-provider/models/carrier/package",
          },
          {
            title: "PackingSlip",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/packing-slip",
          },
          {
            title: "Payment",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/payment",
          },
          {
            title: "PaymentStatus",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/payment-status",
          },
          {
            title: "PickupConfirmation",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-confirmation",
          },
          {
            title: "PickupContactDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-contact-details",
          },
          {
            title: "PickupLocation",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/pickup-location",
          },
          {
            title: "PickupLocationDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-location-details",
          },
          {
            title: "PickupPackage",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-package",
          },
          {
            title: "PickupShipment",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-shipment",
          },
          {
            title: "PickupShipmentDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-shipment-details",
          },
          {
            title: "PickupWindow",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/pickup-window",
          },
          {
            title: "Product",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/product",
          },
          {
            title: "ProductDetail",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/product-detail",
          },
          {
            title: "ProductIdentifiers",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/product-identifiers",
          },
          {
            title: "ProductUrls",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/product-urls",
          },
          {
            title: "PudoLocation",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/addresses/pudo-location",
          },
          {
            title: "QuantityWithReason",
            href:
              "/docs/reference/fulfillment-provider/models/quantity-with-reason",
          },
          {
            title: "Rate",
            href: "/docs/reference/fulfillment-provider/models/carrier/rates/rate",
          },
          {
            title: "RawExternalSource",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/fulfillment-plans/raw-external-source",
          },
          {
            title: "RequestedFulfillment",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/requested-fulfillment",
          },
          {
            title: "RequestedFulfillmentExtensions",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/requested-fulfillment-extensions",
          },
          {
            title: "ResidentialIndicator",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/residential-indicator",
          },
          {
            title: "ResourceDownload",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/resource-download",
          },
          {
            title: "ReturnLabelDetails",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/return-label-details",
          },
          {
            title: "SalesOrder",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/sales-order",
          },
          {
            title: "SalesOrderItem",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/sales-order-item",
          },
          {
            title: "SalesOrderShippingStatus",
            href:
              "/docs/reference/fulfillment-provider/models/sales-order-shipping-status",
          },
          {
            title: "SalesOrderStatus",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/sales-order-status",
          },
          {
            title: "SalesOrderStatusItem",
            href:
              "/docs/reference/fulfillment-provider/models/sales-order-status-item",
          },
          {
            title: "SalesOrderStatusChange",
            href:
              "/docs/reference/fulfillment-provider/models/sales-order-status-change",
          },
          {
            title: "ShipFrom",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/addresses/ship-from",
          },
          {
            title: "ShipFromDisplay",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/addresses/ship-from-display",
          },
          {
            title: "ShipmentIdentifier",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/shipment-identifier",
          },
          {
            title: "ShipmentNotification",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/shipment-notification",
          },
          {
            title: "ShipmentNotificationItem",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/shipment-notification-item",
          },
          {
            title: "ShippedPackage",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/shipped-package",
          },
          {
            title: "ShippedShipment",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/pickup/shipped-shipment",
          },
          {
            title: "ShippingPreferences",
            href:
              "/docs/reference/fulfillment-provider/models/order-source/shipping-preferences",
          },
          {
            title: "ShipTo",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/addresses/ship-to",
          },
          {
            title: "StandardizedErrorCode",
            href:
              "/docs/reference/fulfillment-provider/models/errors/standardized-error-code",
          },
          {
            title: "TaxIdentifier",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/taxes/tax-identifier",
          },
          {
            title: "TaxIdentifierType",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/taxes/tax-identifier-type",
          },
          {
            title: "TimeWindow",
            href: "/docs/reference/fulfillment-provider/models/carrier/time-window",
          },
          {
            title: "VoidRequest",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/void-request",
          },
          {
            title: "VoidResponse",
            href:
              "/docs/reference/fulfillment-provider/models/carrier/labels/void-response",
          },
          {
            title: "Weight",
            href: "/docs/reference/fulfillment-provider/models/order-source/weight",
          },
          {
            title: "WeightDetails",
            href:
              "/docs/reference/fulfillment-provider/models/units/weight-details",
          },
          {
            title: "WeightUnit",
            href: "/docs/reference/fulfillment-provider/models/units/weight-unit",
          },
        ],
      },
    ],
  },
  {
    title: "Authentication",
    open: true,
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
    open: true,
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
    open: true,
    menuItems: [
      { title: "Blog", href: "https://www.shipengine.com/blog/" },
      {
        title: "Meetup Group",
        href: "https://www.meetup.com/Austin-Homegrown-API/",
      },
    ],
  }
];
