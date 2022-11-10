const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    app.get('/service',async(req,res) =>{
        const query ={}
        const cursor = serviceCollection.find(query)
        const services = await cursor.limit(3).toArray()
        res.send(services)
    })

    app.get('/services/:id',async(req, res)=>{
        const id =req.params.id;
        const query={_id:ObjectId(id)}
        const service=await serviceCollection.findOne(query)
        res.send(service)
    })

    app.post('/services',async(req,res)=>{
        const service = req.body;
        console.log(service)
        const ServiceResult =await serviceCollection.insertOne(service)
        res.send(ServiceResult)
    })
    





    const reviewsCollection = client.db('photography').collection('reviews');
    
    app.post('/review',async(req,res)=>{
        const review = req.body
        const result =await reviewsCollection.insertOne(review)
        res.send(result)
    })


    app.get('/review/:id',async(req,res)=>{
        const id= req.params.id;
        const query = {serviceId:id}
        const sort={date:-1}
        const cursor = reviewsCollection.find(query)
        const result = await cursor.sort(sort).toArray()
        res.send(result)
    })

    app.get('/myreview/:id',async(req,res)=>{
        const id= req.params.id;
        const query = {email:id}
        const sort={date:-1}
        const cursor = reviewsCollection.find(query)
        const result = await cursor.sort(sort).toArray()
        res.send(result)
    });


    app.delete('/myreview/:id',async(req,res)=>{
        const id =req.params.id;
        const query ={_id:ObjectId(id)}
        const result =await reviewsCollection.deleteOne(query)
        res.send(result)
    });


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