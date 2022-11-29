const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5006;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async (req, res) => {
    res.send('Doctors Portal Server Running');
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icjdeya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const appointmentOptionCollection=client.db('doctorsPortal').collection('appointmentOptions');
        const bookingsCollection=client.db('doctorsPortal').collection('bookings');
        app.get('/appointmentOptions',async(req,res)=>{
            const query={};
            const options=await appointmentOptionCollection.find(query).toArray();
            res.send(options);

        })
        /*
        API Naming Convention::
        1.app.get('/bookings')
        2.app.get('/booking/:id')
        3.app.post('booking')
        4.app.post('/booking/:id')
        */
        app.post('/bookings',async(req,res)=>{
            const booking=req.body;
            console.log(booking);
            const result=await bookingsCollection.insertOne(booking);
            res.send(result);
        })
     } finally {

      }
}
run().catch(e => console.error(e))
app.listen(port, () => console.log(`Doctors Portal Server Running ${port}`))