const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json())

// user = phusser3
// password =KyAtkeugRfs76GkC



const uri =`mongodb+srv://${process.env.DB_USER}>:${process.env.DB_PASSWORD}@cluster0.cxbomvd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});












app.get('/',(req,res)=>{
    res.send('photography server running')
})


app.listen(port,()=>{
    console.log(`photography server running on port ${port}`)
})