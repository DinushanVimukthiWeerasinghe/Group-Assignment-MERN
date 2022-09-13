import {MongoClient, ServerApiVersion} from 'mongodb'
import ENV from "../core/HandleEnv.js";
// const uri = "mongodb+srv://root:root@cluster0.geaezuv.mongodb.net/?retryWrites=true&w=majority";
// const uri = process.env.MONGODB_URI
const client = new MongoClient(ENV.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const Database= {
    connect: async () => {
        await client.connect()
        return true
    },
    close: async () => {
        await client.close()
        return true
    },
    getDb: () => {
        return client.db('test')
    },
    getCollection: (collectionName) => {
        return client.db('test').collection(collectionName)
    }

}

export default Database
