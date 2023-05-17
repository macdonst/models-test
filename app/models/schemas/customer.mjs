export const Customer = {
  "$id": "customer",
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "shipping_address": {
      "$id": "address",
      "type": "object",
      "properties": {
        "street_address": {
          "$anchor": "street_address",
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        }
      },
      "required": [
        "street_address",
        "city",
        "state"
      ]
    },
    "billing_address": {
      "$id": "address",
      "type": "object",
      "properties": {
        "street_address": {
          "$anchor": "street_address",
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        }
      },
      "required": [
        "street_address",
        "city",
        "state"
      ]
    },
    "key": {
      "type": "string"
    }
  },
  "required": [
    "first_name",
    "last_name",
    "shipping_address",
    "billing_address"
  ],
  "id": "customer"
}