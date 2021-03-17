import {MongoClient} from "mongodb";

require('dotenv').config()

const username = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const uri = `mongodb+srv://${username}:${pass}@cluster0.f1atw.mongodb.net?retryWrites=true&w=majority`;

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const collection = client.db("sample_supplies").collection("sales");

    const totalAvg = collection.aggregate([
            {
                '$set': {
                    'itemsTotal': {
                        '$sum': '$items.price'
                    }
                }
            }, {
            '$group': {
                '_id': null,
                'total': {
                    '$avg': '$itemsTotal'
                }
            }
        }
    ]);

    console.log(JSON.stringify(await totalAvg.toArray()));

    // perform actions on the collection object
    await client.close();
}

main().catch(console.error);
