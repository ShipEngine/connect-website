---
hidden: true
layout: nunjucks/layouts/method-page.njk
title: getSeller Method
name: getSeller
description:
  This method returns detailed information about a seller on the marketplace

documentation: |
  This method returns detailed information about a seller on the marketplace

param:
  name: seller
  type: SellerIdentifier
  signature: getSeller
  description: |
    An object that identifies a seller who sells goods in a marketplace.

  fields:
    - name: id
      type: string
      description: The marketplace's unique ID for the seller. This string will be between `1` and `100` characters and will not contain newline characters.

    - name: identifiers
      type: object
      description: Your own identifiers for this seller.

return:
  name: seller
  type: SellerPOJO
  signature: SellerPOJO
  description: |
    An object that identifies a seller who sells goods in a marketplace.
  fields:
    - name: id
      type: string
      required: true
      description: The marketplace's unique ID for the seller. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: identifiers
      type: object
      required: false
      description: Your own identifiers for this seller.

    - name: store
      type: object
      required: true
      description: The store in the marketplace where the seller sells their goods.

    - name: store.id
      type: string
      required: true
      description: The marketplace's unique ID for the store. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: store.identifers
      type: object
      required: false
      description: Your own identifiers for this store.

    - name: store.name
      type: string
      required: true
      description: The store's name. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: store.warehouses
      type: object[]
      required: true
      description: The store's warehouse locations.

    - name: store.warehouses[].id
      type: string
      required: true
      description: The marketplace's unique ID for the warehouse. This string must be between `1` and `100` characters and must not contain newline characters.

    - name: store.warehouses[].identifiers
      type: object
      required: false
      description: Your own identifiers for this warehouse.

    - name: store.warehouses[].name
      type: string
      required: false
      description: The user-friendly warehouse name (e.g. "East Coast Warehouse"). This string must be between `0` and `100` characters and must not contain newline characters.

    - name: store.warehouses[].shipFrom
      type: |
        [Address](./../address.md)
      required: true
      description: The address used for packages that are shipped out of this warehouse.

    - name: store.warehouses[].returnTo
      type: |
        [Address](./../address.md)
      required: false
      description: The return address for this warehouse. Defaults to the `shipFrom` address.

    - name: contact
      type: object
      description: An object representing contact information.

    - name: contact.name
      type: object
      description: The name of the contact.

    - name: contact.name.title
      type: string
      description: The title of the contact (eg "Mr", "Mrs", "Dr"). This string must be between `0` and `100` characters and must not include newline characters.

    - name: contact.name.given
      type: string
      required: true
      description: The first name of the signer. This string must be between `1` and `100` characters and must not include newline characters.

    - name: contact.name.middle
      type: string
      description: The middle name of the signer. This string must be between `0` and `100` characters and must not include newline characters.

    - name: contact.name.family
      type: string
      description: The last name or family name of the signer. This string must be between `0` and `100` characters and must not include newline characters.

    - name: contact.name.suffix
      type: string
      description: The suffix of the signer (eg "Sr", "Jr", "IV"). This string must be between `0` and `100` characters and must not include newline characters.

    - name: contact.email
      type: string
      description: The email address of the contact. This string must be a valid email address.

    - name: contact.phoneNumber
      type: string
      description: The phone number of the contact. This string must be between `0` and `30` characters and must not include newline characters.

    - name: contact.phoneNumberExtension
      type: string
      description: The phone number extension. This string must be between `0` and `30` characters and must not include newline characters.

    - name: metadata
      type: object
      required: false
      description: Custom data about this seller that will be persisted by the ShipEngine Integration Platform. Must be JSON serializable.

---
Examples
------------------

```javascript
async function getSeller(transaction, seller) {

  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_seller",
    session_id: transaction.session.id,
    seller_id: seller.id
  }

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSeller(response.data);

}
```
```typescript
export default async function getSeller(
  transaction: Transaction<Session>,
  seller: SellerIdentifier,
): Promise<SellerPOJO> {

  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order source's API expects
  const data = {
    operation: "retrieve_seller",
    session_id: transaction.session.id,
    seller_id: seller.id
  }

  // STEP 3: Call the order source's API
  const response = await apiClient.request<RetrieveSellerResponse>({ data });

  // Step 4: Create the output data that ShipEngine expects
  return formatSeller(response.data);

}
```
