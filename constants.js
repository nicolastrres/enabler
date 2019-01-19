const { head } = require('lodash')


const getDbUrl = () => {
  if (process.env.PLATFORMSH_ENV) {
    const config = require('platformsh').config()
    const db = head(config.relationships.database)
    return `${db['scheme']}://${db['username']}:${db['password']}@${db['ip']}:${db['port']}/${db['path']}`
  }

  return 'mongodb://localhost:27017/featuresDB'
}

const getDbName = () => {
  if (process.env.PLATFORMSH_ENV) {
    const config = require('platformsh').config()
    return head(config.relationships.database).path
  }
  return 'featuresDB'
}


const DB_URL = getDbUrl()
const DB_NAME = getDbName()



module.exports = { DB_URL, DB_NAME }