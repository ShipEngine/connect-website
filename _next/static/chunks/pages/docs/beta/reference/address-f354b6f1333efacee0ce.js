(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3106],{8014:function(e,t,n){"use strict";n.r(t),n.d(t,{title:function(){return p},description:function(){return m},createdAt:function(){return k},modifiedAt:function(){return l},default:function(){return f}});var r=n(9016),i=n(3104),d=n(6687),a=n(2320),o=n(1783),s=["components"],p=(d.createElement,"Address objects"),m="Address Objects representing address information used in shipments.",k=new Date(1653344530647.329),l=new Date(1653344530647.329),c=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",t)}},u=c("Reference"),y=c("Field"),w=c("Description"),h=c("Type"),T=function(e){return(0,a.kt)(o.Z,(0,i.Z)({title:"Address objects",description:"Address Objects representing address information used in shipments.",createdAt:new Date(1653344530647),modifiedAt:new Date(1653344530647)},e))};function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,a.kt)(T,(0,i.Z)({},n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{markdown:!0},"Address Base Object"),(0,a.kt)("p",{markdown:!0},"An address object representing address information."),(0,a.kt)(u,{mdxType:"Reference"},(0,a.kt)(y,{name:"name",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Name of the contact."))),(0,a.kt)(y,{name:"first_name",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"First or given name of the contact."))),(0,a.kt)(y,{name:"last_name",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Last or family name of the contact."))),(0,a.kt)(y,{name:"email",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Email of the contact."))),(0,a.kt)(y,{name:"phone_number",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Phone number of the contact. Cannot include newline chars."))),(0,a.kt)(y,{name:"company_name",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Company name, if applicable. Cannot include newline chars."))),(0,a.kt)(y,{name:"address_lines[]",type:"string[]",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Address fields separated by line. Up to 100 chars per line. Cannot include newline chars."))),(0,a.kt)(y,{name:"city_locality",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"City or locality. Cannot contain newline chars."))),(0,a.kt)(y,{name:"state_province",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"State or province. Cannot contain newline chars."))),(0,a.kt)(y,{name:"postal_code",type:"string",nullable:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Zip or postal code. Cannot include newline chars."))),(0,a.kt)(y,{name:"country_code",nullable:!1,mdxType:"Field"},(0,a.kt)(h,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"/docs/beta/reference/country-codes",markdown:!0,parentName:"p"},"country code string"))),(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes",markdown:!0,parentName:"p"},"ISO 3166 country code")," for the ",(0,a.kt)("a",{href:"/docs/beta/reference/country-codes",markdown:!0,parentName:"p"},"country")," of origin. This is usually the same as ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"countryOfManufacture"),", but some countries distinguish between the two for certain products."))),(0,a.kt)(y,{name:"address_residential_indicator",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether the address is residential or commercial."),(0,a.kt)("p",{markdown:!0},"Valid values include the following:"),(0,a.kt)("ul",{markdown:!0},(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"unknown")),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"yes")),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"no"))))),(0,a.kt)(y,{name:"is_eu",type:"boolean",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether the country of the shipment address is a member of the EU."))),(0,a.kt)(y,{name:"address_metadata",type:"object",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Schemaless object representing the metadata related to this address.")))),(0,a.kt)("h2",{markdown:!0},"Shipping Address Object"),(0,a.kt)("p",{markdown:!0},"This address object is used in places related to shipments like ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"ship_to")," and ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"ship_from")," in ",(0,a.kt)("a",{href:"/docs/beta/reference/methods/create-label",markdown:!0,parentName:"p"},"CreateLabel()"),"."),(0,a.kt)("p",{markdown:!0},"This object extends the Address Base."),(0,a.kt)(u,{mdxType:"Reference"},(0,a.kt)(y,{name:"...Address Base",nullable:!1,mdxType:"Field"},(0,a.kt)(h,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"#address-base-object",markdown:!0,parentName:"p"},"address base"))),(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"All fields described in the ",(0,a.kt)("a",{href:"#address-base-object",markdown:!0,parentName:"p"},"address base")," defined above."))),(0,a.kt)(y,{name:"tax_identifiers",type:"object",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Tax IDs associated with the contact related to this address."))),(0,a.kt)(y,{name:"tax_identifiers.id",type:"string",nullable:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Identification number."))),(0,a.kt)(y,{name:"tax_identifiers.type",type:"string",nullable:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The Tax ID type."),(0,a.kt)("p",{markdown:!0},"Valid values include the following:"),(0,a.kt)("ul",{markdown:!0},(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"tin")," - Tax Identification Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"ein")," - Employer Identification Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"ssn")," - Social Security Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"vat")," - Value Added Tax Identification Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"eori")," - Economic Operators Registration and Identification Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"ioss")," - Import One-Stop Shop Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"pan")," - Permanent Account Number"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"voec")," - Norway's VAT on E-Commerce number")))),(0,a.kt)(y,{name:"tax_identifiers.registration_county",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The country where the Tax ID is registered with."))),(0,a.kt)(y,{name:"tax_identifiers.description",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Description of the tax ID that may give the customs agent more context.")))),(0,a.kt)("h2",{markdown:!0},"Pickup Location Details Object"),(0,a.kt)("p",{markdown:!0},"Pickup/Dropoff location address used by carriers."),(0,a.kt)(u,{mdxType:"Reference"},(0,a.kt)(y,{name:"pickup_address",nullable:!0,mdxType:"Field"},(0,a.kt)(h,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"#shipping-address-object",markdown:!0,parentName:"p"},"shipping address object"))),(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The physical address of the warehouse or pickup address."))),(0,a.kt)(y,{name:"location_notes",type:"string",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Human readable location information for the driver to find the location."))),(0,a.kt)(y,{name:"pickup_options",type:"object",nullable:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Custom options that are used by the carrier to determine pickup locations.")))),(0,a.kt)("h2",{markdown:!0},"Order Source Address Object"),(0,a.kt)("p",{markdown:!0},"An address object used by the Order Source Apps to map sales order addresses."),(0,a.kt)(u,{mdxType:"Reference"},(0,a.kt)(y,{name:"name",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The name of the individual associated with this address."))),(0,a.kt)(y,{name:"company",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The name of the company associated with this address."))),(0,a.kt)(y,{name:"phone",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The phone number associated with this address."))),(0,a.kt)(y,{name:"address_line_1",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The first line of the address."))),(0,a.kt)(y,{name:"address_line_2",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The second line of the address."))),(0,a.kt)(y,{name:"address_line_3",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The third line of the address."))),(0,a.kt)(y,{name:"city",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The city associated with this address."))),(0,a.kt)(y,{name:"state_province",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The state, province, or municipality of the addres."))),(0,a.kt)(y,{name:"postal_code",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The postal code associated with this address."))),(0,a.kt)(y,{name:"country_code",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The two character ISO 3166 country code of this address."))),(0,a.kt)(y,{name:"residential_indicator",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates this is a residential or commercial address. Valid values include the following:"),(0,a.kt)("ul",{markdown:!0},(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"R")," - Residential"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"li"},"C")," - Commerical"),(0,a.kt)("li",{markdown:!0,parentName:"ul"},"'null'")))),(0,a.kt)(y,{name:"is_verified",type:"boolean",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether or not this address has been verified using an Address Verification Service."))),(0,a.kt)(y,{name:"pickup_location",type:"object",required:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether or not this address has been verified using an Address Verification Service."))),(0,a.kt)(y,{name:"pickup_location.carrier_id",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"An id specific to the carrier about this drop off / pickup location. Only required if ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"pickup_location")," is specified."))),(0,a.kt)(y,{name:"pickup_location.relay_id",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The id of a relay point used for the drop off / pickup location. Only required if ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"pickup_location")," is specified.")))),(0,a.kt)("h2",{markdown:!0},"BillTo Address Object"),(0,a.kt)("p",{markdown:!0},"This address object is used in places related to order sources like ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"bill_to")," in ",(0,a.kt)("a",{href:"/docs/beta/reference/methods/sales-orders-export",markdown:!0,parentName:"p"},"SalesOrdersExport"),"."),(0,a.kt)("p",{markdown:!0},"This object extends the Order Source Address object."),(0,a.kt)(u,{mdxType:"Reference"},(0,a.kt)(y,{name:"...Order Source Address",nullable:!1,mdxType:"Field"},(0,a.kt)(h,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"#order-source-address-object",markdown:!0,parentName:"p"},"order source address object"))),(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"All fields described in the ",(0,a.kt)("a",{href:"#order-source-address-object",markdown:!0,parentName:"p"},"order source address object")," defined above."))),(0,a.kt)(y,{name:"email",type:"string",nullable:!1,mdxType:"Field"},(0,a.kt)(w,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The email address of the person being billed.")))))}f.isMDXComponent=!0},7452:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/beta/reference/address",function(){return n(8014)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return t=7452,e(e.s=t);var t}));var t=e.O();_N_E=t}]);