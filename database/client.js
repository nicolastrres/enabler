const MongoClient = require('mongodb').MongoClient
const { DB_URL, DB_NAME } = require('constants')
const { isNil } = require('lodash')

let client

const connect = () => {
  client = new MongoClient(DB_URL)
  client.connect()
}

const getDb = () => {
  if (isNil(client)) connect()
  return client.db(DB_NAME)
}

const getAll = async (collectionName) => {
  const db = await getDb()
  const collection = db.collection(collectionName)

  return collection.find({}).toArray()
}

module.exports = { getAll }