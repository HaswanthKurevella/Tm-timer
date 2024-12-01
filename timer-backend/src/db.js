import { MongoClient } from "mongodb";
let db;
async function connectToDB(cb) {
    // const url = "mongodb+srv://haswanth:8919481293@cluster0.ip8mc6w.mongodb.net/?retryWrites=true&w=majority"
    const url="mongodb://localhost:27017"
    const client = new MongoClient(url);
    await client.connect();
    db = client.db('tms')
    cb();
}
export { db, connectToDB };