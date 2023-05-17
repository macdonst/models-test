// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getCustomers, upsertCustomer, validate } from '../models/customers.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const customers = await getCustomers()
  if (req.session.problems) {
    let { problems, customer, ...session } = req.session
    return {
      session,
      json: { problems, customers, customer }
    }
  }

  return {
    json: { customers }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, customer } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, customer },
      json: { problems, customer },
      location: '/customers'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, customer: removed, ...newSession } = session
  try {
    const result = await upsertCustomer(customer)
    return {
      session: newSession,
      json: { customer: result },
      location: '/customers'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/customers'
    }
  }
}
