const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cxbomvd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    const serviceCollection = client.db('photography').collection('services');

    app.get('/services',async(req,res) =>{
        const query ={}
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
    })
    
}
finally{

}

}
run().catch(err=>console.error(err))




app.get('/',(req,res)=>{
    res.send('photography server running')
})


app.listen(port,()=>{
    console.log(`photography server running on port ${port}`)
})