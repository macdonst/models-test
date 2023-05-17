import data from '@begin/data'
import { validator } from '@begin/validator'
import { Customer } from './schemas/customer.mjs'

const deleteCustomer = async function (key) {
  await data.destroy({ table: 'customers', key })
  return { key }
}

const upsertCustomer = async function (customer) {
  return data.set({ table: 'customers', ...customer })
}

const getCustomer = async function (key) {
  return data.get({ table: 'customers', key })
}

const getCustomers = async function () {
  const databasePageResults = await data.page({
    table: 'customers',
    limit: 25
  })

  let customers = []
  for await (let databasePageResult of databasePageResults) {
    for (let customer of databasePageResult) {
      delete customer.table
      customers.push(customer)
    }
  }

  return customers
}

const validate = {
  shared (req) {
    return validator(req, Customer)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, customer: data } : { customer: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, customer: data } : { customer: data }
  }
}

export {
  deleteCustomer,
  getCustomer,
  getCustomers,
  upsertCustomer,
  validate
}
