// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteCustomer } from '../../../models/customers.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, customer: removed, ...newSession } = session
  try {
    let customer = await deleteCustomer(id)
    return {
      session: newSession,
      json: { customer },
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
