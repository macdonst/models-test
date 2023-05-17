// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteAddress } from '../../../models/addresses.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, address: removed, ...newSession } = session
  try {
    let address = await deleteAddress(id)
    return {
      session: newSession,
      json: { address },
      location: '/addresses'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/addresses'
    }
  }
}
