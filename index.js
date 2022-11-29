const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const port=process.env.PORT||5006;
const app=express();
app.use(cors());
app.use(express.json());
app.get('/',async(req,res)=>{
    res.send('Doctors Portal Server Running');
})
app.listen(port,()=>console.log(`Doctors Portal Server Running ${port}`))