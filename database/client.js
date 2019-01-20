const MongoClient = require('mongodb').MongoClient
const { DB_URL, DB_NAME } = require('../constants')


const connect = () => {
  return MongoClient.connect(DB_URL, { useNewUrlParser: true })
}

const executableGetAll = async (client, collectionName) => client.db(DB_NAME).collection(collectionName).find({}).toArray()

const executableGet = async (client, collectionName, query) => client.db(DB_NAME).collection(collectionName).findOne(query)

const executableCreate = async (client, collectionName, query) => client.db(DB_NAME).collection(collectionName).insertMany(query)


const getAll = (collectionName, query) => execute((executableGetAll), collectionName, query)
const get = (collectionName, query) => execute(executableGet, collectionName, query)
const create = (collectionName, query) => execute(executableCreate, collectionName, query)

const execute = async (fn, collectionName, query) => {
  let client
  try {
    client = await connect()
    return fn(client, collectionName, query)
  } catch (e) {
    throw e
  } finally  {
    client.close()
  }
}

module.exports = { create, get, getAll }