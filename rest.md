---
title: Understanding REST
description: ShipEngine is a REST API, which means that it follows HTTP conventions for things like URLs, methods, headers, and status codes.
tags:
  - rest api
  - http
  - https
  - json
  - data types
  - http methods
  - http verbs
  - endpoints
  - headers
  - http headers
  - status codes
  - http status
  - response codes
---

Introduction to REST
======================================
ShipEngine is a [REST <small>(REpresentational State Transfer)</small>](https://en.wikipedia.org/wiki/Representational_state_transfer) API, which means that it follows certain HTTP conventions for things like URLs, methods, headers, and status codes. If you're not yet familiar with REST, then this page is for you.  We'll explain the basics that you need to know to get started with ShipEngine.


Resources
---------------------------------
REST APIs are centered around [resources](https://restful-api-design.readthedocs.io/en/latest/resources.html). Resources are data on which you can perform operations. For example, one of the resources in ShipEngine is a Label, and the operations that you can perform on a label include [creating a label](labels/create-a-label.md), [querying labels](reference/list-labels.md), and [voiding labels](labels/voiding.md).


JSON
---------------------------------
REST allows resources to be represented in any format, such as JSON, XML, CSV, binary, etc.  Almost all resources in ShipEngine are in [JSON format](https://en.wikipedia.org/wiki/JSON).  One notable exception to this is label images, which can be downloaded in a [variety of formats](labels/formats.md).

JSON is a convenient format to represent REST resources because it's human readable, compresses well, and is supported by all modern programming languages. In addition, JSON is fairly easy to understand because it only has a few data types:

|Type|Description|Example|
|--|--|--|
|String|Text data, such as names and addresses|`"John Doe"`|
|Number|Positive, negative or decimal numbers|`100` &nbsp; `42.7` &nbsp; `-5`|
|Boolean|Either true or false.|`true` &nbsp; `false`|
|Null|No value.|`null`|
|Object|A set of key/value pairs inside curly braces. The keys are always strings, but the values can be _any_ JSON data type.|<code style="white-space: nowrap">{<br>&nbsp;"name" : "John Doe",<br>&nbsp;"age": 37,<br>&nbsp;"is_married": true<br>}</code>|
|Array|An ordered list of values inside square brackets. The values can be _any_ JSON data type.|`["red", "green", "blue"]`|


HTTP
---------------------------------
REST APIs communicate using [HTTP <small>(HyperText Transfer Protocol)</small>](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) or its more secure sibling, HTTPS <small>(HTTP Secure)</small>, which uses [TLS <small>(Transport Layer Security)</small>](https://en.wikipedia.org/wiki/Transport_Layer_Security") to encrypt request and response data.

ShipEngine requires HTTPS and TLS v1.1 or higher for all API calls. This means that all API calls must be made to `https://api.shipengine.com`, **not** `http://`.

> *Note*
> ### Deprecated security protocols
> ShipEngine does *not* support older security protocols such as TLS 1.0 or any version of [SSL](https://hosting.review/web-hosting-glossary/#12).  These protocols have been [deprecated by the IETF](https://tools.ietf.org/html/rfc7568) due to security vulnerabilities.

See our [Security & Authentication Guide](auth.md) for more information.



Requests & Responses
---------------------------------
To call a REST API, you need to send an HTTP request to the server. The request contains all the information necessary to tell the server (e.g. ShipEngine) what you want it to do. When the server is finished performing the operation that you requested, it sends an HTTP response back to you, which contains all the information necessary to let you know whether the operation was successful or not, and includes any data that you requested.

HTTP requests consist of four parts: [method](#methods), [endpoint](#endpoints), [headers](#headers), and [JSON data](#json). You can learn more about [the anatomy of an HTTP request](https://www.shipengine.com/the-anatomy-of-an-http-request/) on our blog.

HTTP responses consist of just three parts: [status code](#status-codes), [headers](#headers), and [JSON data](#json).


Methods
---------------------------------
The HTTP protocol includes many different "methods" (also called "verbs"), such as GET, POST, PUT, PATCH, OPTIONS, and more. Each of these methods instructs the server to perform a certain operation on a resource. To keep things simple, ShipEngine only uses the following methods:

|Method|Description|
|--|--|
|GET|Requests one or more resources from the server.|
|POST|Creates one or more new resources.|
|PUT|Updates a resource, or performs an action.|
|PATCH|Adds data to an existing resource.|
|DELETE|Deletes or deactivates a resource.|


Endpoints
---------------------------------
To call a ShipEngine API, you have to know its endpoint, which is a combination of a [URL <small>(Uniform Resource Locator)</small>](https://en.wikipedia.org/wiki/URL) and an HTTP method. For example, to [create a shipping label](labels/create-a-label.md), you need to call the `POST https://api.shipengine.com/v1/labels` endpoint. In this case, the `POST` method tells the server that you want to create a new resource, and the `/v1/labels` URL path tells the server what kind of resource you want to create (a label resource).


Headers
---------------------------------
HTTP requests and responses have a headers section and a data section. The data section contains a REST resource, such as a label in JSON format. The headers section contains metadata about the request or response. There are [many different types of headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields), but these are the main ones that are relevant for ShipEngine:

### Request Headers

|Header Name|Description|Example|
|--|--|--|
|API-Key|Your ShipEngine [API auth key](auth.md)|`API-Key: STlTyUyfFYmw2F2Qqhj8BhRQAfG72HP`|
|Content-Type|Tells the server what data format you're sending. ShipEngine only supports [JSON format](#json).|`Content-Type: application/json`|

### Response Headers

|Header Name|Description|Example|
|--|--|--|
|Content-Type|Tells you what data format the server is sending. This will be [JSON format](#json), except for label downloads, which can be in a [variety of formats](labels/formats.md).|`Content-Type: application/json`|
|Content-Length|The size of the response data, in bytes.|`Content-Length: 2537`|
|Date|The date/time that the response was sent|`Date: Fri, 18 Oct 2019 18:00:28 GMT`|
|X-ShipEngine-RequestID|A unique ID for every request/response. You can use this for logging, or when opening a [support ticket](https://help.shipengine.com/hc/en-us/requests/new)|`X-ShipEngine-RequestID: c6c453ca-37e9-4326-9d32-e72da2ae4195`|


Status Codes
---------------------------------
[HTTP response status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) let you know whether your API request was processed successfully, or if an [error](errors/index.md) occurred. ShipEngine uses the following status codes:

|Status Code|Description|Reason|
|--|--|--|
|200|Success|The HTTP request was successful.|
|201|Created|The requested resource was successfully created.|
|204|No Content|The HTTP request was successful, and the response is empty.|
|400|Bad Request|There's something wrong with your request. See the [error code](errors/index.md) for more details about the problem.|
|401|Unauthorized|Your [API key](auth.md) is invalid, expired, or has been deactivated.|
|404|Not Found|The resource you requested does not exist. For example, a request to `v1/shipments/se-123456` would return a 404 status code if there is no shipment with an ID of `se-123456`|
|405|Not Allowed|The [HTTP method](#methods) you used is not supported by ShipEngine.|
|409|Conflict|The request conflicts with the current state of the server. For example, you may be attempting to create a resource that already exists, or ship a package that has already been shipped.|
|500|Internal Server Error|The server cannot process the request. If this occurrs persistently, then please [contact support for help](https://help.shipengine.com/hc/en-us/requests/new).|
