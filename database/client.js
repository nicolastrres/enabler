const MongoClient = require('mongodb').MongoClient
const { DB_URL, DB_NAME } = require('../constants')

const connect = () => {
  return MongoClient.connect( DB_URL, { useNewUrlParser: true } )
}

const executableGetAll = async (client, collectionName) => {
  return client
    .db(DB_NAME)
    .collection(collectionName)
    .find({})
    .toArray()
}

const executableGet = async (client, collectionName, query) => {
  return client
    .db(DB_NAME)
    .collection(collectionName)
    .findOne(query)
}

const executableCreate = async (client, collectionName, query) => {
  return client
    .db(DB_NAME)
    .collection(collectionName)
    .insertMany(query)
}

const executableDelete = async (client, collectionName, query) => {
  return client
    .db(DB_NAME)
    .collection(collectionName)
    .deleteOne(query)
}

const getAll = (collectionName, query) => {
  return execute(executableGetAll, collectionName, query)
}

const get = (collectionName, query) => {
  return execute(executableGet, collectionName, query)
}

const create = (collectionName, query) => {
  return execute(executableCreate, collectionName, query)
}

const del = (collectionName, query) => {
  return execute(executableDelete, collectionName, query)
}

const execute = async (fn, collectionName, query) => {
  let client
  try {
    client = await connect()
    return fn(client, collectionName, query)
  } catch (e) {
    throw e
  } finally {
    client.close()
  }
}

module.exports = { create, del, get, getAll }
