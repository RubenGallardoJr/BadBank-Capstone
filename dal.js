const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to MongoDB and initialize the 'myproject' database
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    db = client.db('myproject');
    console.log("Connected successfully to db server");
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

// Create user account
async function create(name, email, password) {
  try {
    const collection = db.collection('users');
    const doc = { name, email, password, balance: 0 };
    const result = await collection.insertOne(doc);
    return result.ops[0];
  } catch (error) {
    throw error;
  }
}

// Find user account
async function find(email) {
  try {
    const customers = await db
      .collection('users')
      .find({ email: email })
      .toArray();
    return customers;
  } catch (error) {
    throw error;
  }
}

// Find one user account
async function findOne(email) {
  try {
    const customer = await db
      .collection('users')
      .findOne({ email: email });
    return customer;
  } catch (error) {
    throw error;
  }
}

// Update - deposit/withdraw amount
async function update(email, amount) {
  try {
    const result = await db
      .collection('users')
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw error;
  }
}

// All users
async function all() {
  try {
    const customers = await db
      .collection('users')
      .find({})
      .toArray();
    return customers;
  } catch (error) {
    throw error;
  }
}

module.exports = { create, findOne, find, update, all };
