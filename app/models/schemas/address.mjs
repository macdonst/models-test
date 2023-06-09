export const Address = {
  "$id": "https://example.com/schemas/address",
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
    },
    "key": {
      "type": "string"
    }
  },
  "required": [
    "street_address",
    "city",
    "state"
  ],
  "id": "address"
}