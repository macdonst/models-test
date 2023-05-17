import data from '@begin/data'
import { validator } from '@begin/validator'
import { Address } from './schemas/address.mjs'

const deleteAddress = async function (key) {
  await data.destroy({ table: 'addresses', key })
  return { key }
}

const upsertAddress = async function (address) {
  return data.set({ table: 'addresses', ...address })
}

const getAddress = async function (key) {
  return data.get({ table: 'addresses', key })
}

const getAddresses = async function () {
  const databasePageResults = await data.page({
    table: 'addresses',
    limit: 25
  })

  let addresses = []
  for await (let databasePageResult of databasePageResults) {
    for (let address of databasePageResult) {
      delete address.table
      addresses.push(address)
    }
  }

  return addresses
}

const validate = {
  shared (req) {
    return validator(req, Address)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, address: data } : { address: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, address: data } : { address: data }
  }
}

export {
  deleteAddress,
  getAddress,
  getAddresses,
  upsertAddress,
  validate
}
