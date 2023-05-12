---
title: Documents Designer
---

# Documents Designer

It is a Windows desktop application that allows creating templates for rendering documents from code.

[FAQ](./faq.md)

### Who can use Documents Designer?

Everyone building a Connect app that requires rendering documents.
At this point, Documents Designer is a tool for Windows platform only.

### Guide

[Designer window](./design-window.md)

[Document preview](./preview-window.md)

[Data source](./data-source.md)

[Conditions](./conditions.md)

### Example

This is an example template constructed using Documents Designer.

<details>
  <summary>demo_carrier_template.carrier</summary>

```json
{
  "api_code": "demo_carrier",
  "version": "1.0.0",
  "label_forms": [
    {
      "name": "standard_label",
      "components": [
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 10,
              "width": 1490,
              "name": "TopHorizontalLine",
              "left": 10
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 10,
              "width": 1490,
              "name": "BottomHorizontalLine",
              "left": 10,
              "top": 770
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 990,
              "width": 10,
              "name": "RightVerticalLine",
              "left": 1493
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 780,
              "width": 10,
              "name": "MiddleVerticalLine",
              "left": 950
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 10,
              "width": 950,
              "name": "MiddleHorizontalLine",
              "top": 360
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 990,
              "width": 10,
              "name": "MiddleVerticalLine(1)"
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "line_color": "0, 0, 0",
              "fill_color": "0, 0, 0",
              "height": 10,
              "width": 1490,
              "name": "BottomHorizontalLine(1)",
              "top": 980
            }
          ],
          "width": 1503,
          "height": 990,
          "name": "Lines",
          "left": 7,
          "top": 15
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_to.name",
              "name": "AddressToName",
              "width": 700,
              "height": 60,
              "top": 60
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_name": "Noto Sans",
              "font_size": 9.75,
              "font_size_limit": 9.75,
              "content": "\"To:\"",
              "name": "AddressToCaption",
              "width": 700,
              "height": 40
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_to.city_locality + \" \" + $.shipment.ship_to.postal_code",
              "name": "AddressToCityZip",
              "width": 700,
              "height": 60,
              "top": 120
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_to.country_code\n",
              "name": "AddressToCountry",
              "width": 700,
              "height": 60,
              "top": 180
            }
          ],
          "width": 700,
          "height": 240,
          "name": "ReceiverData",
          "left": 180,
          "top": 60
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_name": "Noto Sans",
              "font_size": 9.75,
              "font_size_limit": 9.75,
              "content": "\"From:\"",
              "name": "AddressFromCaption",
              "width": 530,
              "height": 50
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_from.name",
              "name": "AddressFromName",
              "width": 700,
              "height": 60,
              "top": 70
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_from.city_locality + \" \" + $.shipment.ship_from.postal_code",
              "name": "AddressFromCityZip",
              "width": 700,
              "height": 60,
              "top": 130
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_bold": true,
              "font_name": "Noto Sans",
              "font_size": 12.0,
              "font_size_limit": 12.0,
              "content": "$.shipment.ship_from.country_code",
              "name": "AddressFromCountry",
              "width": 700,
              "height": 60,
              "top": 190
            }
          ],
          "width": 700,
          "height": 250,
          "name": "SenderrData",
          "left": 180,
          "top": 400
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_italic": true,
              "font_name": "Arial",
              "font_size": 9.75,
              "hor_alignment": "CenterAlign",
              "font_size_limit": 9.75,
              "content": "\"Carrier: \" + .shipment.carrier_name",
              "name": "CarrierName",
              "width": 400,
              "height": 100,
              "left": 30
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_name": "Noto Sans",
              "font_size": 9.75,
              "font_size_limit": 9.75,
              "content": "\"Order #: \" + $.shipment.reference",
              "name": "OrderNo",
              "width": 440,
              "height": 70,
              "top": 150
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "font_name": "Noto Sans",
              "font_size": 9.75,
              "font_size_limit": 9.75,
              "content": "\"ShipDate #: \" + $.shipment.ship_datetime",
              "name": "DispatchDate",
              "width": 480,
              "height": 60,
              "top": 220
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelBarcode, Orion.Rendering",
              "content": "$.shipment.tracking_number",
              "barcode_type": "QRCode",
              "keep_character_casing": true,
              "narrow_bar_width": 10.0,
              "bearer_bar_width": 3.0,
              "align": "Center",
              "name": "QRcode",
              "width": 260,
              "height": 270,
              "left": 100,
              "top": 370
            }
          ],
          "width": 480,
          "height": 640,
          "name": "ShipmentData",
          "left": 990,
          "top": 110
        },
        {
          "$type": "Orion.Rendering.PrintObjects.LabelBarcode, Orion.Rendering",
          "content": ".shipment.packages[0].tracking_number",
          "narrow_bar_width": 3.0,
          "align": "Center",
          "name": "LabelBarcode",
          "width": 1410,
          "height": 150,
          "left": 60,
          "top": 820
        }
      ],
      "landscape": true,
      "paper_type": {
        "width": 1016,
        "height": 1524
      },
      "document_level": "Shipment"
    }
  ]
}
```

</details>
