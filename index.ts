import {MongoClient} from "mongodb";

require('dotenv').config()

const username = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${username}:${pass}@cluster0.f1atw.mongodb.net?retryWrites=true&w=majority`;

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const collection = client.db(dbName).collection("listingsAndReviews");
    const itemArr = await collection.find({}).limit(10).toArray();
    console.log(JSON.stringify(itemArr));
    // perform actions on the collection object
    await client.close();
}

main().catch(console.error);
