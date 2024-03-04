import { MongoClient } from 'mongodb';
const connectionString = process.env.CONNECTION_STRING || "";
const client = new MongoClient(connectionString);
const primaryDB = process.env.DATABASE;
let database;
try {
    database = await client.db(primaryDB);
} catch (error) {
    console.log('error')
}

export default database;