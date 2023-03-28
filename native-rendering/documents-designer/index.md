---
title: Documents Designer
---

# Documents Designer

It is a Windows desktop application that allows creating templates for rendering documents from code.

[FAQ](./faq.md)

## Who can use Documents Designer?

Everyone building a Connect app that requires rendering documents.
At this point, Documents Designer is a tool for Windows platform only.

## Guide

[Design window](./design-window.md)

[Document preview](./preview-window.md)

[Data source](./data-source.md)

### Example

This is an example template constructed using Documents Designer.

<details>
  <summary>dummy_carrier.carrier</summary>

```json
{
  "ApiCode": "dummy_carrier",
  "Version": "1.0.0",
  "LabelForms": [
    {
      "Name": "standard_label",
      "Components": [
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "Components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 10,
              "Width": 1490,
              "Name": "TopHorizontalLine",
              "Left": 10
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 10,
              "Width": 1490,
              "Name": "BottomHorizontalLine",
              "Left": 10,
              "Top": 770
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 990,
              "Width": 10,
              "Name": "RightVerticalLine",
              "Left": 1493
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 780,
              "Width": 10,
              "Name": "MiddleVerticalLine",
              "Left": 950
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 10,
              "Width": 950,
              "Name": "MiddleHorizontalLine",
              "Top": 360
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 990,
              "Width": 10,
              "Name": "MiddleVerticalLine(1)"
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelShape, Orion.Rendering",
              "LineColor": "0, 0, 0",
              "FillColor": "0, 0, 0",
              "Height": 10,
              "Width": 1490,
              "Name": "BottomHorizontalLine(1)",
              "Top": 980
            }
          ],
          "Width": 1503,
          "Height": 990,
          "Name": "Lines",
          "Left": 7,
          "Top": 15
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "Components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontBold": true,
              "FontName": "Noto Sans",
              "FontSize": 12.0,
              "FontSizeLimit": 12.0,
              "Content": "RemoveEmptyLines(\nNewLine($.shipment.ship_to.name) +\nNewLine($.shipment.ship_to.company_name) + \nNewLine($.shipment.ship_to.address_lines[0]) + \nNewLine($.shipment.ship_to.address_lines[1]) + \nNewLine($.shipment.ship_to.city_locality) + \nNewLine($.shipment.ship_to.postal_ode) + \nNewLine(GetLocalizedCountryName($.shipment.ship_to.country_code, EN))\n)",
              "Name": "ToData",
              "Width": 700,
              "Height": 280,
              "Top": 60
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontName": "Noto Sans",
              "FontSize": 9.75,
              "FontSizeLimit": 9.75,
              "Content": "\"To:\"",
              "Name": "To",
              "Width": 700,
              "Height": 40
            }
          ],
          "Width": 700,
          "Height": 340,
          "Name": "ReceiverData",
          "Left": 180,
          "Top": 60
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "Components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontName": "Noto Sans",
              "FontSize": 9.75,
              "FontSizeLimit": 9.75,
              "Content": "\"From:\"",
              "Name": "From",
              "Width": 530,
              "Height": 50
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontName": "Noto Sans",
              "FontSize": 10.0,
              "FontSizeLimit": 10.0,
              "Content": "RemoveEmptyLines(\nNewLine(if(Len($.shipment.ship_from.company_name) > 0) $.shipment.ship_from.company_name else $.shipment.ship_from.name) +\nNewLine($.shipment.ship_from.address_lines[0]) + \nNewLine($.shipment.ship_from.address_lines[1]) + \nNewLine($.shipment.ship_from.city_locality) + \nNewLine($.shipment.ship_from.postal_code) + \nNewLine(GetLocalizedCountryName($.shipment.ship_from.country_code, EN))\n)",
              "Name": "FromData",
              "Width": 750,
              "Height": 300,
              "Top": 60
            }
          ],
          "Width": 750,
          "Height": 360,
          "Name": "SenderrData",
          "Left": 180,
          "Top": 400
        },
        {
          "$type": "Orion.Rendering.PrintObjects.GroupBand, Orion.Rendering",
          "Components": [
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontName": "Noto Sans",
              "FontSize": 9.75,
              "FontSizeLimit": 9.75,
              "Content": "\"Order #: \" + $.shipment.reference",
              "Name": "Order",
              "Width": 440,
              "Height": 70
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
              "FontName": "Noto Sans",
              "FontSize": 9.75,
              "FontSizeLimit": 9.75,
              "Content": "\"ShipDate #: \" + if($.shipment.ship_datetime) DateToString($.shipment.ship_datetime, \"dd/MM/yy\") else DateToString(Now(),\"dd/MM/yy\")",
              "Name": "DispatchDate",
              "Width": 480,
              "Height": 60,
              "Top": 70
            },
            {
              "$type": "Orion.Rendering.PrintObjects.LabelBarcode, Orion.Rendering",
              "Content": "$.shipment.tracking_number",
              "BarcodeType": "QRCode",
              "KeepCharacterCasing": true,
              "NarrowBarWidth": 10.0,
              "BearerBarWidth": 3.0,
              "Align": "Center",
              "Name": "Barcode",
              "Width": 260,
              "Height": 270,
              "Left": 100,
              "Top": 220
            }
          ],
          "Width": 480,
          "Height": 490,
          "Name": "ShipmentData",
          "Left": 990,
          "Top": 260
        },
        {
          "$type": "Orion.Rendering.PrintObjects.LabelEdit, Orion.Rendering",
          "FontItalic": true,
          "FontName": "Arial",
          "FontSize": 9.75,
          "HorAlignment": "CenterAlign",
          "FontSizeLimit": 9.75,
          "Content": "\"Carrier: \\n\\n\" + .shipment.api_code",
          "Name": "LabelEdit",
          "Width": 400,
          "Height": 240,
          "Left": 1020,
          "Top": 110
        },
        {
          "$type": "Orion.Rendering.PrintObjects.LabelBarcode, Orion.Rendering",
          "Content": ".shipment.packages[0].tracking_number",
          "NarrowBarWidth": 3.0,
          "Align": "Center",
          "Name": "LabelBarcode",
          "Width": 1410,
          "Height": 150,
          "Left": 60,
          "Top": 820
        }
      ],
      "Landscape": true,
      "PaperType": {
        "Width": 1016,
        "Height": 1524
      },
      "DocumentLevel": "Shipment"
    }
  ]
}
```

</details>
