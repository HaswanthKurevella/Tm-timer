import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
let db;
async function connectToDB(cb) {
    const url = process.env.url;
    // const url="mongodb://localhost:27017"
    const client = new MongoClient(url);
    db = client.db('tms')
    cb();
}
export { db, connectToDB };