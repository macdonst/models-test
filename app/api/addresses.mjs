// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getAddresses, upsertAddress, validate } from '../models/addresses.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const addresses = await getAddresses()
  if (req.session.problems) {
    let { problems, address, ...session } = req.session
    return {
      session,
      json: { problems, addresses, address }
    }
  }

  return {
    json: { addresses }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, address } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, address },
      json: { problems, address },
      location: '/addresses'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, address: removed, ...newSession } = session
  try {
    const result = await upsertAddress(address)
    return {
      session: newSession,
      json: { address: result },
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
