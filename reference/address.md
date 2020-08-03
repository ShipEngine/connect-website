---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: Address objects
name: Address

description: Addresses with contact info store not only store location and contact information but also the email and phone number needed to contact the address owner.

documentation: |
  Addresses are used throughout the [ShipEngine Integration Platform](./../index.md). Your application will almost certainly need to access or return address objects. Examples include the origin and destination addresses of a shipment, a carrier pickup location, a warehouse, etc.

  Each address object has properties for the street, city, province, country, and postal code. Some addresses also include contact information, such as a person's name, email, and phone number.

  The properties that are required when an `AddressWithContactInfo` object is expected are included below. Only include these additional properties
  when an `AddressWithContactInfo` object is required. If an Address object is expected, the type for the property will be `Address`. In this case, only include the properties that are not marked as contact info properties.

fields:
  - name: company
    type: string
    required: false
    description: The company name for the address, if provided. This string must be between `0` and `100` characters    and must not include newline characters and must not include newline characters.

  - name: addressLines
    type: string[]
    required: true
    description: Rather than providing two or three distinct address fields, simply provide all lines of the address in a string array.
      Each string in the array must be between `0` and `100` characters and must not include newline characters.

  - name: cityLocality
    type: string
    required: true
    description: The city or locality for this address. This string must be between `1` and `100` characters and must
      not include newline characters.

  - name: stateProvince
    type: string
    required: true
    description: The state or province for this address. This string must be between `1` and `100` characters and must
      not include newline characters.

  - name: postalCode
    type: string
    required: true
    description: The zip code or other postal code for this address. This string must be between `1` and `100` characters and must
      not include newline characters.

  - name: country
    type: |
      [Country](./country-codes.md)
    required: true
    description: The country for the address.

  - name: isResidential
    type: boolean
    required: false
    description: A boolean value indicating whether or not the address is residential.

  - name: contact.name
    type: object
    description: The name of the contact.

  - name: contact.name.title
    type: string
    required: false
    description: The title of the contact (eg "Mr", "Mrs", "Dr"). This string must be between `0` and `100` characters
        and must not include newline characters.

  - name: contact.name.given
    type: string
    required: true
    description: The first name of the signer. This string must be between `1` and `100` characters
        and must not include newline characters.

  - name: contact.name.middle
    type: string
    required: false
    description: The middle name of the signer. This string must be between `0` and `100` characters
       and must not include newline characters.

  - name: contact.name.family
    type: string
    required: false
    description: The last name or family name of the signer. This string must be between `0` and `100` characters
       and must not include newline characters.

  - name: contact.name.suffix
    type: string
    required: false
    description: The suffix of the signer (eg "Sr", "Jr", "IV"). This string must be between `0` and `100` characters
        and must not include newline characters.

  - name: email
    type: string
    required: false
    description: The email address of the contact. This string must
       be a valid email address. </br> </br>

       _Only include this property if an AddressWithContactInfo object is required._

  - name: phoneNumber
    type: string
    required: false
    description: |
      The phone number of the contact. This string must be between `0` and `30` characters
          and must not include newline characters. </br> </br>
      _Only include this property if an AddressWithContactInfo object is required._

---
Examples
-------------------------------------------------
Here's an example address object:

```javascript
{
  company: "Example Corp",
  addressLines: [
    "4009 Marathon Blvd",
    "Suite 310",
  ],
  cityLocality: "Austin",
  stateProvince: "TX",
  postalCode: "78756",
  country: "US",
  isResidential: false
}
```

And here's an example address with contact info:

```javascript
{
  name: {
    title: "Mr.",
    given: "John",
    family: "Doe",
  },
  email: "johndoe@example.com",
  phoneNumber: "555-555-5555",
  company: "Example Corp",
  addressLines: [
    "4009 Marathon Blvd",
    "Suite 310",
  ],
  cityLocality: "Austin",
  stateProvince: "TX",
  postalCode: "78756",
  country: "US",
  isResidential: false
}
```
