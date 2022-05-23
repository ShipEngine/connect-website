(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8256],{9245:function(e,t,n){"use strict";n.r(t),n.d(t,{title:function(){return p},description:function(){return s},createdAt:function(){return k},modifiedAt:function(){return c},default:function(){return f}});var i=n(9016),r=n(3104),o=n(6687),a=n(2320),d=n(1783),m=["components"],p=(o.createElement,"Sales Order Item objects"),s="An object representing an item in a sales order.",k=new Date(1653338063541.9846),c=new Date(1653338063541.9846),u=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",t)}},h=u("Reference"),l=u("Field"),T=u("Description"),w=u("Type"),y=function(e){return(0,a.kt)(d.Z,(0,r.Z)({title:"Sales Order Item objects",description:"An object representing an item in a sales order.",createdAt:new Date(1653338063542),modifiedAt:new Date(1653338063542)},e))};function f(e){var t=e.components,n=(0,i.Z)(e,m);return(0,a.kt)(y,(0,r.Z)({},n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{markdown:!0},"Sales Order Item Object"),(0,a.kt)("p",{markdown:!0},"Sales order item objects are used throughout ",(0,a.kt)("a",{href:"/",markdown:!0,parentName:"p"},"ShipEngine Connect")," to describe single items in a sales order."),(0,a.kt)("h2",{markdown:!0},"Properties"),(0,a.kt)("p",{markdown:!0},"This table lists the properties of a sales order item object and identifies those properties that are required. This object\nis used for a property of the object returned from the ",(0,a.kt)("a",{href:"/docs/reference/methods/get-sales-orders-by-date",markdown:!0,parentName:"p"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"a"},"getSalesOrdersByDate")," method")," method and is\nnot passed as an argument to any method."),(0,a.kt)(h,{mdxType:"Reference"},(0,a.kt)(l,{name:"id",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The marketplace's unique ID for the order item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"name",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The user-friendly name of the item. This is often the same as the product name. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product",type:"object",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The product associated with this item."))),(0,a.kt)(l,{name:"product.id",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The marketplace's unique ID for the product. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.identifiers",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Your own identifiers for this product.")),(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,a.kt)(l,{name:"product.details",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A list of details associated with this product.")),(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,a.kt)(l,{name:"product.sku",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit"),". This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.upc",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Universal_Product_Code",markdown:!0,parentName:"p"},"Universal Product Code")," for this item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.isbn",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://www.isbn-international.org/",markdown:!0,parentName:"p"},"International Standard Book Number")," for this item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.asin",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://www.amazon.com/gp/seller/asin-upc-isbn-info.html",markdown:!0,parentName:"p"},"Amazon Standard Identification Number")," for this item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.fulfillmentSku",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit")," related to the fulfillment of this item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.inventoryID",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The inventory ID for this item. This string must not contain newline characters."))),(0,a.kt)(l,{name:"product.dimensions",type:"object",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The dimensions for the product."))),(0,a.kt)(l,{name:"product.dimensions.length",type:"number",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The length of the product. This value may contain decimals."))),(0,a.kt)(l,{name:"product.dimensions.width",type:"number",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The width of the product. This value may contain decimals."))),(0,a.kt)(l,{name:"product.dimensions.height",type:"number",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The height of the product. This value may contain decimals."))),(0,a.kt)(l,{name:"product.dimensions.unit",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The unit of measurement for the dimensions. Valid values include the following:"),(0,a.kt)("ul",{markdown:!0},(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"in")," - inches"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"cm")," - centimeters")))),(0,a.kt)(l,{name:"quantity",type:"object",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The quantity of this item in the sales order."))),(0,a.kt)(l,{name:"quantity.value",type:"number",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The quantity of items in this sales order item. The minimum value for this property is ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"1"),"."))),(0,a.kt)(l,{name:"unitPrice",type:"object",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The sale price of each item. This should NOT include additional charges or adjustments, such as taxes or discounts."))),(0,a.kt)(l,{name:"unitPrice.value",type:"number",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The value for this amount."))),(0,a.kt)(l,{name:"unitPrice.currency",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The currency for this amount."))),(0,a.kt)(l,{name:"unitWeight",type:"object",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The weight of each item."))),(0,a.kt)(l,{name:"unitWeight.value",type:"number",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The value for the weight. The minimum value for this property is ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"1"),"."))),(0,a.kt)(l,{name:"unitWeight.unit",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The unit of measure for this weight. Valid values include the following:"),(0,a.kt)("ul",{markdown:!0},(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"g")," for grams"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"oz")," for ounces"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"kg")," for kilograms"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"lb")," for pounds")))),(0,a.kt)(l,{name:"sku",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit"),". This string must not contain newline characters."))),(0,a.kt)(l,{name:"identifiers",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Your own identifiers for this sales order item.")),(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,a.kt)(l,{name:"description",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The carrier's description of the charge, not specific to the user. This string must not contain newline characters."))),(0,a.kt)(l,{name:"itemURL",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"https://nodejs.org/api/url.html",markdown:!0,parentName:"p"},"URL")," or string")),(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The URL of a webpage where the customer can view the order item. Must be a valid HTTP or HTTPS url."))),(0,a.kt)(l,{name:"thumbnailURL",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"https://nodejs.org/api/url.html",markdown:!0,parentName:"p"},"URL")," or string")),(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The URL of a webpage where the customer can view an image of the order item."))),(0,a.kt)(l,{name:"location",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},"string")),(0,a.kt)(T,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The location where the product can be found in a warehouse.")))))}f.isMDXComponent=!0},3886:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/sales-order-item",function(){return n(9245)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return t=3886,e(e.s=t);var t}));var t=e.O();_N_E=t}]);