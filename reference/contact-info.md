---
layout: nunjucks/layouts/object-page.njk
title: ContactInfo objects
name: ContactInfo

description: An person to contact.

documentation: |
  A ContactInfo object describes contact information for a person.

fields:
  - name: name
    type: object
    description: The name of the

  - name: name.title
    type: string
    description: The title of the contact (eg "Mr", "Mrs", "Dr"). This string will be between `0` and `100` characters and will not include newline characters.

  - name: name.given
    type: string
    description: The first name of the signer. This string will be between `1` and `100` characters and will not include newline characters.

  - name: name.middle
    type: string
    description: The middle name of the signer. This string will be between `0` and `100` characters and must not include newline characters.

  - name: name.family
    type: string
    description: The last name or family name of the signer. This string must be between `0` and `100` characters and must not include newline characters.

  - name: name.suffix
    type: string
    description: The suffix of the signer (eg "Sr", "Jr", "IV"). This string must be between `0` and `100` characters and must not include newline characters.

  - name: email
    type: string
    description: The email address of the  This string must be a valid email address.

  - name: phoneNumber
    type: string
    description: The phone number of the  This string must be between `0` and `30` characters and must not include newline characters.
---
Examples
-------------------------------------------------



