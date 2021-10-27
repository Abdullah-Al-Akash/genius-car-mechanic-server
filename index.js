const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// Connect With MongoDB:
const uri = "mongodb+srv://Explore-MongoDB:<password>@cluster0.7gqmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
        res.send("Successfully Running Genius Car Server");
})

app.listen(port, () => {
        console.log("Successfully Genius Server run on PORT", port);
})