const { head } = require('lodash')

const isPlatformshEnv = () => process.env.PLATFORMSH_ENV

const getPlatformshDbUrl = () => {
  const config = require('platformsh').config()
  const db = head(config.relationships.database)
  return `${db['scheme']}://${db['username']}:${db['password']}@${db['ip']}:${db['port']}/${db['path']}`
}

const getPlatformshDBName = () => {
  const config = require('platformsh').config()
  return head(config.relationships.database).path
}

module.exports = { isPlatformshEnv, getPlatformshDbUrl, getPlatformshDBName }