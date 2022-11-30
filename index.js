const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
function verifyJWT(req, res, next) {
   // console.log(req.headers.authorization);
    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).send('Unauthorized Accesss now');
    }
    const token = authheader.split(' ')[1];
   // console.log('token',token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded) {
        if (err) {
            console.log(err);
            return res.status(403).send({ message: err });
        }
        req.decoded = decoded;
        next();
    })
}
async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions');
        const bookingsCollection = client.db('doctorsPortal').collection('bookings');
        const userCollection = client.db('doctorsPortal').collection('users');
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
        app.get('/booking', verifyJWT, async (req, res) => {
            const email = req.query.email;
            const decodedEmail = req.decoded.email;
            console.log('de',decodedEmail);
            if (email !== decodedEmail) {
                return res.status(403).send({ message: 'Forbidden nh Access' })
            }
            const query = { email: email };
            const booking = await bookingsCollection.find(query).toArray();
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
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '10h' });
                return res.send({ accessToken: token })
            }
            res.status(403).send({ accessToken: 'No token' });
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })
    } finally {

    }
}
run().catch(e => console.error(e))
app.listen(port, () => console.log(`Doctors Portal Server Running ${port}`))