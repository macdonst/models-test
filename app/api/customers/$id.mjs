// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getCustomer, upsertCustomer, validate } from '../../models/customers.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, customer, ...session } = req.session
    return {
      session,
      json: { problems, customer }
    }
  }

  const id = req.pathParameters?.id
  const result = await getCustomer(id)
  return {
    json: { customer: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, customer } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, customer },
      json: { problems, customer },
      location: `/customers/${customer.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, customer: removed, ...newSession } = session
  try {
    const result = await upsertCustomer({ key: id, ...customer })
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
