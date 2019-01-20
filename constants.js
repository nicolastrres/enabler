const platformsh = require('./platformsh')

const getDbUrl = () => {
  if (platformsh.isPlatformshEnv()) {
    return platformsh.getPlatformshDbUrl()
  }

  return process.env.DB_URL || 'mongodb://localhost:27017/featuresDB'
}

const getDbName = () => {
  if (platformsh.isPlatformshEnv()) {
    return platformsh.getPlatformshDBName()
  }
  return process.env.DB_NAME || 'featuresDB'
}

const DB_URL = getDbUrl()
const DB_NAME = getDbName()

module.exports = { DB_URL, DB_NAME }
