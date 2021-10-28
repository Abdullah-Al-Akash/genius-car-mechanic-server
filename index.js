const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const app = express();
const port = 5000;

// Middleware:
app.use(cors())
app.use(express.json())

// Connect With MongoDB:
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7gqmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function For MongoDB:
async function run() {
        try {
                await client.connect();

                const database = client.db('carMechanic');
                const collection = database.collection('services');

                // GET API:
                app.get('/services', async (req, res) => {
                        const cursor = collection.find({});
                        const services = await cursor.toArray();
                        res.send(services);
                })

                // GET SINGLE SERVICES:
                app.get('/services/:id', async (req, res) => {
                        const id = req.params.id;
                        console.log("Getting Specific Service", id);
                        const query = { _id: ObjectId(id) };
                        const service = await collection.findOne(query)
                        res.json(service);

                })

                // POST API:
                app.post('/services', async (req, res) => {
                        const service = req.body;
                        console.log("Hit The API", service);

                        const result = await collection.insertOne(service);
                        console.log(result);

                        res.send(result);
                })

                // Delete API:
                app.delete('/services/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { _id: ObjectId(id) };
                        const result = await collection.deleteOne(query);
                        res.json(result);
                })
        }
        finally {
                // await client.close();
        }
}
run().catch(console.dir);

app.get('/', (req, res) => {
        res.send("Successfully Running Genius Car Server");
})

app.listen(port, () => {
        console.log("Successfully Genius Server run on PORT", port);
})