(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8928],{8769:function(e,n,t){"use strict";t.r(n),t.d(n,{title:function(){return c},description:function(){return d},createdAt:function(){return k},modifiedAt:function(){return m},default:function(){return g}});var a=t(9016),i=t(3104),r=t(6687),p=t(2320),o=t(1783),s=["components"],c=(r.createElement,"cancelPickups Method"),d="This method cancels a one or more previously scheduled pickups.",k=new Date(1653338063537.9844),m=new Date(1653338063537.9844),l=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,p.kt)("div",n)}},u=l("CodeWrapper"),h=l("Reference"),y=l("Field"),w=l("Type"),T=l("Description"),f=function(e){return(0,p.kt)(o.Z,(0,i.Z)({title:"cancelPickups Method",description:"This method cancels a one or more previously scheduled pickups.",createdAt:new Date(1653338063538),modifiedAt:new Date(1653338063538)},e))};function g(e){var n=e.components,t=(0,a.Z)(e,s);return(0,p.kt)(f,(0,i.Z)({},t,{components:n,mdxType:"MDXLayout"}),(0,p.kt)("h1",{markdown:!0},(0,p.kt)("inlineCode",{markdown:!0,parentName:"h1"},"cancelPickups()")),(0,p.kt)("p",{markdown:!0},"This method cancels one or more previously scheduled pickups. If your carrier allows previously scheduled pickups to be cancelled,\nyou will need to implement this method."),(0,p.kt)("h2",{markdown:!0},"Syntax"),(0,p.kt)(u,{mdxType:"CodeWrapper"},(0,p.kt)("pre",{markdown:!0},(0,p.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},"module.exports = async function cancelPickups(transaction, pickups) {\n  // Your code here\n}\n")),(0,p.kt)("pre",{markdown:!0},(0,p.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import {\n  Transaction, PickupCancellation, PickupCancellationOutcome\n} from "@shipengine/connect";\n\nexport default async function cancelPickups(\n  transaction: Transaction,\n  pickups: PickupCancellation[]\n): Promise<void | PickupCancellationOutcome[]> {\n  // Your code here\n}\n'))),(0,p.kt)("h2",{markdown:!0},"Parameters"),(0,p.kt)("h3",{markdown:!0},(0,p.kt)("inlineCode",{markdown:!0,parentName:"h3"},"transaction")),(0,p.kt)("p",{markdown:!0},"A ",(0,p.kt)("a",{href:"/docs/reference/transaction",markdown:!0,parentName:"p"},"transaction object")," containing information about the transaction and session state."),(0,p.kt)("h3",{markdown:!0},(0,p.kt)("inlineCode",{markdown:!0,parentName:"h3"},"pickups")),(0,p.kt)("p",{markdown:!0},"An ",(0,p.kt)("em",{markdown:!0,parentName:"p"},"array")," of objects representing a request for a carrier to cancel one or more previously scheduled pickups."),(0,p.kt)(h,{mdxType:"Reference"},(0,p.kt)(y,{name:"cancellationID",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The unique ID of this cancellation. This ID is used to correlate cancellations with outcomes."))),(0,p.kt)(y,{name:"id",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The unique ID of the pickup to be cancelled. This string will not contain newline characters."))),(0,p.kt)(y,{name:"identifiers",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Your own identifiers for this pickup service.")),(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,p.kt)(y,{name:"pickupService",type:"object",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The ",(0,p.kt)("a",{href:"/docs/reference/pickup-service",markdown:!0,parentName:"p"},"pickup service")," to use for this pickup request."))),(0,p.kt)(y,{name:"pickupService.id",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A UUID that uniquely identifies the pickup service. This ID should never change. This is the UUID you used in the ",(0,p.kt)("a",{href:"/docs/reference/pickup-service",markdown:!0,parentName:"p"},"Pickup Service Definition")," file for this pickup service."))),(0,p.kt)(y,{name:"pickupService.identifiers",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Your own identifiers for this pickup service.")),(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,p.kt)(y,{name:"pickupService.code",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Optional code used to map to what the carrier uses to identify the pickup service."))),(0,p.kt)(y,{name:"pickupService.name",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},'The user-friendly service name (e.g. "One-Time Pickup", "Recurring Pickup", "Drop-Off"). This string will not contain newline characters.'))),(0,p.kt)(y,{name:"pickupService.description",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A short, user-friendly description of the service. This string will not contain newline characters."))),(0,p.kt)(y,{name:"reason",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The reason for the cancellation. Valid values include the following:"),(0,p.kt)("ul",{markdown:!0},(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"not_ready")," - The package was not ready for pickup."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"price")," - The customer cancelled the pickup because of the price."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"schedule")," - The pickup was cancelled because it could not be picked up within the needed time sframe."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"carrier_failed_pickup")," - The carrier failed to pick up the package."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"other")," - The cancellation is for a reason not covered by any of the other categories.")))),(0,p.kt)(y,{name:"notes",type:"object[]",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"An array of objects containing additional information about this cancellation."))),(0,p.kt)(y,{name:"notes[].type",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/common-types#notes-types",markdown:!0,parentName:"p"},"notes type string"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The type for this note."))),(0,p.kt)(y,{name:"notes[].text",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The note text itself."))),(0,p.kt)(y,{name:"address",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/address#address-properties",markdown:!0,parentName:"p"},"address object"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The address where the package(s) should be picked up."))),(0,p.kt)(y,{name:"contact",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/contact-info",markdown:!0,parentName:"p"},"contact info object"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"An object representing contact information about the person there to meet the driver."))),(0,p.kt)(y,{name:"timeWindows",type:"object[]",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A list of dates and times when the carrier intended to pickup. This array will contain at least one value."))),(0,p.kt)(y,{name:"timeWindows[].startDateTime",nullable:!0,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"date/time object"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The start date/time of the request window."))),(0,p.kt)(y,{name:"timeWindows[].endDateTime",nullable:!0,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"date/time object"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The end date/time of the request window."))),(0,p.kt)(y,{name:"timeWindows[].toString()",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},"method")),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A method that returns the time range as a string."))),(0,p.kt)(y,{name:"shipments",type:"object[]",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A list of shipments that were scheduled to be picked up. This array will contain at least one shipment."))),(0,p.kt)(y,{name:"shipments.trackingNumber",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages. This string must not contain newline characters."))),(0,p.kt)(y,{name:"shipments.identifiers",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Your own identifiers for this shipment.")),(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,p.kt)(y,{name:"shipments[].deliveryService",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/delivery-service-object#delivery-service-argument",markdown:!0,parentName:"p"},"delivery service object"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The delivery service assigned to the original pickup request. This array will contain at least one value."))),(0,p.kt)(y,{name:"shipments[].metadata",type:"object",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The carrier's custom data about this shipment that was previously persisted by the ShipEngine Platform."))),(0,p.kt)(y,{name:"shipments[].packages",type:"object[]",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The list of packages in this shipment. This array will contain at least one value."))),(0,p.kt)(y,{name:"shipments.packages[].trackingNumber",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages. This string must not contain newline characters."))),(0,p.kt)(y,{name:"shipments[].packages[].identifiers",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Your own identifiers for this package.")),(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,p.kt)(y,{name:"shipments[].packages[].packaging",type:"object",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The packaging used for this package."))),(0,p.kt)(y,{name:"shipments[].packages[].packaging.id",nullable:!1,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"A UUID that uniquely identifies this packaging. This is the UUID you used int he ",(0,p.kt)("a",{href:"/docs/reference/packaging",markdown:!0,parentName:"p"},"Packaging Definition")," file for this packaging."))),(0,p.kt)(y,{name:"shipments[].packages[].packaging.identifiers",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Your own identifiers for this packaging.")),(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,p.kt)(y,{name:"shipments[].packages[].packaging[].code",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Optional code used to map to what the carrier uses to identify the packaging."))),(0,p.kt)(y,{name:"shipments[].packages[].dimensions",type:"object",nullable:!0,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The dimensions for the package."))),(0,p.kt)(y,{name:"shipments[].packages[].dimensions.length",type:"number",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The length of the package. This value may contain decimals."))),(0,p.kt)(y,{name:"shipments[].packages[].dimensions.width",type:"number",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The width of the package. This value may contain decimals."))),(0,p.kt)(y,{name:"shipments[].packages[].dimensions.height",type:"number",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The height of this package. This value may contain decimals."))),(0,p.kt)(y,{name:"shipments[].packages[].dimensions.unit",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The unit of measurement for the dimensions. Valid values include the following:"),(0,p.kt)("ul",{markdown:!0},(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"in")," for inches"),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"cm")," for centimeters")))),(0,p.kt)(y,{name:"shipments[].packages[].weight",type:"object",nullable:!0,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The weight of the package."))),(0,p.kt)(y,{name:"shipments[].packages[].weight.value",type:"number",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The weight value for this package. This value may contain decimals."))),(0,p.kt)(y,{name:"shipments[].packages[].weight.unit",type:"string",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The unit of measure for this weight. Valid values include the following:"),(0,p.kt)("ul",{markdown:!0},(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"g")," for grams"),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"oz")," for ounces"),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"kg")," for kilograms"),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"lb")," for pounds")))),(0,p.kt)(y,{name:"shipments[].packages[].metadata",type:"object",nullable:!0,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The carrier's custom data about this package that was previously persisted by ShipEngine Connect. Must be JSON serializable."))),(0,p.kt)(y,{name:"shipments[].package",type:"object",nullable:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The first package in the ",(0,p.kt)("inlineCode",{markdown:!0,parentName:"p"},"packages")," array. This is useful for carriers that only support single-piece shipments. This object has all the same properties as the objects in the ",(0,p.kt)("inlineCode",{markdown:!0,parentName:"p"},"packages")," array described above.")))),(0,p.kt)("h2",{markdown:!0},"Return Value"),(0,p.kt)("h3",{markdown:!0},(0,p.kt)("inlineCode",{markdown:!0,parentName:"h3"},"cancellationOutcomes")),(0,p.kt)("p",{markdown:!0},"An object that contains information about a pickup cancellation request."),(0,p.kt)(h,{mdxType:"Reference"},(0,p.kt)(y,{name:"cancellationId",required:!0,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"An identifier that indicates which pickup cancellation this outcome is for."))),(0,p.kt)(y,{name:"status",type:"string",required:!0,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The status of the cancellation request. Valid values include the following:"),(0,p.kt)("ul",{markdown:!0},(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"success")," - Cancellation was successful."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"error")," - Cancellation encountered an error."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"timeout")," - Cancellation call timed out, probably related to a network error."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"skipped")," - Cancellation was skipped."),(0,p.kt)("li",{markdown:!0,parentName:"ul"},(0,p.kt)("inlineCode",{markdown:!0,parentName:"li"},"throttled")," - Cancellation could not be made because requests are being throttled.")))),(0,p.kt)(y,{name:"confirmationNumber",type:"string",required:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The confirmation number for this cancellation request. This string must not contain newline characters."))),(0,p.kt)(y,{name:"code",type:"string",required:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The carrier's code for this cancellation outcome. This string must not contain newline characters."))),(0,p.kt)(y,{name:"description",type:"string",required:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The carrier's description of the cancellation outcome. This description should not be specific to this particular pickup. This string must not contain newline characters."))),(0,p.kt)(y,{name:"notes",type:"object[]",required:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"An array of objects containing additional information about this cancellation."))),(0,p.kt)(y,{name:"notes[].type",required:!0,mdxType:"Field"},(0,p.kt)(w,{mdxType:"Type"},(0,p.kt)("p",{markdown:!0},(0,p.kt)("a",{href:"/docs/reference/common-types#notes-types",markdown:!0,parentName:"p"},"notes type string"))),(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The type for this note."))),(0,p.kt)(y,{name:"notes[].text",type:"string",required:!0,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"The note text itself."))),(0,p.kt)(y,{name:"metadata",type:"object",required:!1,mdxType:"Field"},(0,p.kt)(T,{mdxType:"Description"},(0,p.kt)("p",{markdown:!0},"Custom data about this pickup that will be persisted by ShipEngine Connect. Must be JSON serializable.")))),(0,p.kt)("h2",{markdown:!0},"Example"),(0,p.kt)(u,{mdxType:"CodeWrapper"},(0,p.kt)("pre",{markdown:!0},(0,p.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},"module.exports = async function cancelPickups(transaction, pickups) {\n\n  let data = {\n    operation: \"pick_up_cancellation\",\n    scheduld_pick_ups: pickups.map((pickup) => {\n      // STEP 1: Validation\n      if (pickup.pickupService.id === sameDayPickup.id) {\n        throw new Error(`Same-day pickups cannot be canceled`);\n      }\n\n      // STEP 2: Create the data that the carrier's API expects\n      return {\n        session_id: transaction.session.id,\n        pick_up_id: pickup.id,\n        service_code: pickup.pickupService.code,\n        zone: Number.parseInt(pickup.address.postalCode),\n        reference: pickup.reason,\n      };\n    })\n  };\n\n  // STEP 3: Call the carrier's API\n  let response = await apiClient.request({ data });\n\n  // STEP 4: Create the output data that ShipEngine expects\n  return response.data.canceled_pick_ups.map((cancellation, index) => {\n    if (cancellation.error) {\n      return {\n        cancellationID: pickups[index].cancellationID,\n        confirmationNumber: cancellation.id,\n        status: 'Error',\n        notes: [\n          {\n            type: 'Internal',\n            text: cancellation.reason,\n          }\n        ],\n      };\n    }\n    else {\n      return {\n        cancellationID: pickups[index].cancellationID,\n        confirmationNumber: cancellation.id,\n        status: 'Success',\n        notes: [\n          {\n            type: 'MessageToBuyer',\n            text: `Pickup ${pickups[index].id} was canceled successfully`,\n          }\n        ],\n      };\n    }\n  });\n}\n")),(0,p.kt)("pre",{markdown:!0},(0,p.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import {\n  CancellationStatus,\n  NoteType,\n  PickupCancellation,\n  PickupCancellationOutcome,\n  Transaction\n} from "@shipengine/connect";\n\nexport default async function cancelPickups(\n  transaction: Transaction<Session>, pickups: PickupCancellation[]): Promise<PickupCancellationOutcome[]> {\n\n  let data : PickUpCancellationRequest = {\n    operation: "pick_up_cancellation",\n    scheduld_pick_ups: pickups.map((pickup) => {\n      // STEP 1: Validation\n      if (pickup.pickupService.id === sameDayPickup.id) {\n        throw new Error(`Same-day pickups cannot be canceled`);\n      }\n\n      // STEP 2: Create the data that the carrier\'s API expects\n      return {\n        session_id: transaction.session.id,\n        pick_up_id: pickup.id,\n        service_code: pickup.pickupService.code,\n        zone: Number.parseInt(pickup.address.postalCode),\n        reference: pickup.reason,\n      };\n    })\n  };\n\n  // STEP 3: Call the carrier\'s API\n  let response = await apiClient.request<PickUpCancellationResponse>({ data });\n\n  // STEP 4: Create the output data that ShipEngine expects\n  return response.data.canceled_pick_ups.map((cancellation, index) => {\n    if (cancellation.error) {\n      return {\n        cancellationID: pickups[index].cancellationID,\n        confirmationNumber: cancellation.id,\n        status: CancellationStatus.Error,\n        notes: [\n          {\n            type: NoteType.Internal,\n            text: cancellation.reason,\n          }\n        ],\n      };\n    }\n    else {\n      return {\n        cancellationID: pickups[index].cancellationID,\n        confirmationNumber: cancellation.id,\n        status: CancellationStatus.Success,\n        notes: [\n          {\n            type: NoteType.MessageToBuyer,\n            text: `Pickup ${pickups[index].id} was canceled successfully`\n          }\n        ],\n      };\n    }\n  });\n}\n'))))}g.isMDXComponent=!0},9989:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/methods/cancel-pickups",function(){return t(8769)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return n=9989,e(e.s=n);var n}));var n=e.O();_N_E=n}]);