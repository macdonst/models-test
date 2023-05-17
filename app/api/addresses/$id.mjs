// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getAddress, upsertAddress, validate } from '../../models/addresses.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, address, ...session } = req.session
    return {
      session,
      json: { problems, address }
    }
  }

  const id = req.pathParameters?.id
  const result = await getAddress(id)
  return {
    json: { address: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, address } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, address },
      json: { problems, address },
      location: `/addresses/${address.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, address: removed, ...newSession } = session
  try {
    const result = await upsertAddress({ key: id, ...address })
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
