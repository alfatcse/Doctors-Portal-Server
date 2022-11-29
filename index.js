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
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions');
        const bookingsCollection = client.db('doctorsPortal').collection('bookings');
        //use Aggregate to query multiple collection and then merge data
        app.get('/appointmentOptions', async (req, res) => {
            const date = req.query.date;
            console.log(date);
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            const bookingQuery = { AppointmentDate: date };
            const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();
            options.forEach(option => {
                const optionBooked = alreadyBooked.filter(book => book.treatment === option.name);
                const bookedSlots = optionBooked.map(book => book.slot);
                const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot));
                option.slots = remainingSlots;
                console.log(option.name, bookedSlots, remainingSlots.length);
            })
            res.send(options);

        })

        /*
        API Naming Convention::
        1.app.get('/bookings')
        2.app.get('/booking/:id')
        3.app.post('booking')
        4.app.post('/booking/:id')
        */
        app.get('/booking', async (req, res) => {
            const email = req.query.email;
            const query={email:email};
            const booking=await bookingsCollection.find(query).toArray();
            res.send(booking);
        })
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const query = {
                AppointmentDate: booking.AppointmentDate,
                treatment: booking.treatment,
                email: booking.email
            }
            const alreadyBooked = await bookingsCollection.find(query).toArray();
            if (alreadyBooked.length) {
                const message = `You have already a booking on ${booking.AppointmentDate}`;
                return res.send({ acknowledged: false, message });
            }
            const result = await bookingsCollection.insertOne(booking);

            res.send(result);
        })
    } finally {

    }
}
run().catch(e => console.error(e))
app.listen(port, () => console.log(`Doctors Portal Server Running ${port}`))