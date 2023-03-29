---
title: FAQ
---

# FAQ

### How to enable syntax suggestions in formula editor?
Please use *Ctrl + Spacebar*.

### Why are some print objects on design marked as red?
Printed object is marked as red in the design view when it is located outside the printable page area.  

![](./images/object-out-of-print-area.png)

### How to generate proper page count for multi-page documents?
The number of pages can be calculated after all the pages of the document have been rendered.  
That's why accurate *PagesCount* can only be calculated for an object that is placed in a group band with `IsDocumentSummary` set to `true`.

### How to calculate the summary of the entire document on the first page?
If there is the need to include some kind of summary details on the first page for multi-page document (e.g. total weight)
then use a group band with the property `IsDocumentSummary=true`.

### Why does the *IsDocumentSummary=true* property in the table's children group not work?
It should be used only for the entire document. For table you should use *Footer* and *Header* instead.

### How to reference current package data in *Package* document kind?
You can use package alias syntax:
```code
@package.weight_details.weight_in_grams
```

### Why doesn't the current package reference work for me?
Package reference `@package` works only for `Package` document kind.

### Why is only one document rendered for multi-page documents?
When multi-page document is rendered to Png format, then every rendered page is returned as a single document with page number in document's name.
