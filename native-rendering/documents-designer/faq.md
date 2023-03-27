---
title: Documents Designer FAQ
---

# Documents Designer FAQ

## How to enable syntax suggestions in formula editor?
Please use Ctrl + space.

## Why are some print objects on design marked as red?
Printed object is marked as red in the design view when it is located outside the printable page area. 
![](./images/object-out-of-print-area.png)

## How to generate proper page count for multi page documents?
Pages count is now after all document precalculation.  
It is why proper value can be rendered only for print object put on Group band with IsDocumentSummary=true property.

## How to calculate whole document summary on first page?
If there is the need to include some summary data on first page for multi page document (e.g. total weight)
then Group band with `IsDocumentSummary=true` property must be used.

## Why property IsDocumentSummary set to true doesn’t work on table’s child group?
It should be used only for the whole document. For table's Footer and Header, group should be used instead.

## How to handle current package data in Package document type?
You can use package alias syntax:
```code
@package.weight
```

## Why current package reference does not work?
Package reference `@package` works only for `Package` document type

## Why is one document rendered to multiple documents?
When multi page document is rendered to png format, then every rendered page is returned as a single document with page number in document's name.
