---
title: Documents data source
---

# Document data source

During template design creation, document data can be accessed using JSONPath syntax. You can use both, the dot notation:

```code
$.shipment.tracking_number
```
or the bracket notation:

```code
$['shipment']['tracking_number']
```
## Notes:
1. For now limited JSONPath syntax can be used. Notice that filter **expressions are not supported** yet.
2. The leading `$.` or `.` or `@` is mandatory. One of these has to be used to differentiate variables from JSONPath syntax.
### Exception:
Special leading character `@` can be used as reference to current object, but not in all cases. It depends on the document type. For instance, for Package document type we can use `@package` reference to handle date from each package consecutively in multi package shipment.

3. Root element can start either with `$.` or `.`
4. Relative nested object path has to begin with `.`
`$.` always means the root element reference.
5. **Double dots ..property are NOT handled at all**
6. Wildcard selecting all elements `[*]` can be used in an array only. Regardless of their indexes it means all items of the array.
7. **Wildcard selecting all elements `.*` for object (means all properties) is NOT allowed. E.g. `shipment.*`**

## JSONPath usage examples
Below JSONPath examples are created for data source object structure:
```code
{
	"shipment": {
		"tracking_number": "123PL",
		"packages": [
			{
				"weight": "12"
			},
			{
				"weight": "02"
			}
		]
	},
	contract {
	    "parameters":{
			"Account.Number": "1234",
			"IsBrexit" : "true"
		}
	}
}
```

## Examples:

### Properties

```code
$.shipment.tracking_number
```

## Arrays

Can be reference with index or asterisk for each elements iteration
```code
$.shipment.packages[0].weight
Sum($.shipment.packages[*].weight)
$['shipment']['packages'][0]['weight']
```

## Dictionaries

Generally dot and bracket notation can be used but in case when dictionary key contains dot in key name you have to used bracket notation only.
```code
$.contract.parameters.isBrexit
$.contract.parameters['isBrexit']
$.contract.parameters['Account.Number']
```

## Table data

When you need to design template with dynamic array of data rows (e.g. `$.shipment.packages`) it is necessary to use table element.  
In this case data source has to be defined.  

![Table data](./images/table-data-source.png)<p>
When you work with table you can specify:

### Element by relative path

In this case relative path does not start with `$` but only with dot.

### Elements range [:n], [1,3,5], [0:2], [-n:], [n:]

Json path elements range is supported as well. E.g. you can select the first n elements of the array or return only selected items if they exist in the array.

## Current Package data reference

You can use current Package alias using prefix `@`

```code
@package.weight
```

![](./images/package-alias.png)

