const MongoClient = require('mongodb').MongoClient
const { DB_URL, DB_NAME } = require('../constants')


const connect = () => {
  return MongoClient.connect(DB_URL, { useNewUrlParser: true })
}

const getAll = async (collectionName) => {
  let client
  try {
    client = await connect()
    return client.db(DB_NAME).collection(collectionName).find({}).toArray()
  } catch (e) {
    throw e
  } finally  {
    client.close()
  }
}

const get = async (collectionName, query) => {
  let client
  try {
    client = await connect()
    return client.db(DB_NAME).collection(collectionName).findOne(query)
  } catch (e) {
    throw e
  } finally  {
    client.close()
  }
}

module.exports = { get, getAll }