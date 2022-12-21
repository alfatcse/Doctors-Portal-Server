const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const http = require("http");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5006;
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
app.get('/', async (req, res) => {
    res.send('Doctors Portal Server Running');
})
io.on("connection", (socket) => {
    socket.emit("me", socket.id)
    console.log(socket.id);
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icjdeya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function sendBookingEmail(booking) {
    const { email, slot, treatment, appointmentDate } = booking;
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.sendgrid.net',
    //     port: 587,
    //     auth: {
    //         user: "apikey",
    //         pass: process.env.SENDGRID_API_KEY
    //     }
    // })
    const auth = {
        auth: {
            api_key: process.env.EMAIL_SEND_KEY,
            domain: process.env.EMAIL_SEND_DOMAIN
        }
    }
    const transporter = nodemailer.createTransport(mg(auth));
    console.log('send email', email);
    transporter.sendMail({
        from: "alfatjahanbsmrstu@gmil.com", // verified sender email
        to: email, // recipient email
        subject: `Your Appointment for ${treatment} is confirmed`, // Subject line
        text: "Hello world!", // plain text body
        html: `
             <h3>Your appointment is confirmed</h3>
             <div> 
              <p> Your appointment for treatment ${treatment}</p>
              <p> Please Visit us on ${appointmentDate} at ${slot}</p>
              <p>Thanks from Doctors Portal mas</>
             </div>
        `, // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info);
        }
    });

}
function verifyJWT(req, res, next) {
    // console.log(req.headers.authorization);
    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).send('Unauthorized hhz Access');
    }
    const token = authheader.split(' ')[1];
    // console.log('token',token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
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
        const doctorsCollection = client.db('doctorsPortal').collection('doctors');
        const paymentCollection = client.db('doctorsPortal').collection('payment');
        const slotCollection = client.db('doctorsPortal').collection('slot');
        //make you use verifyAdmin after checking JWT
        const verifyAdmin = async (req, res, next) => {
            // console.log('inside:::', req.decoded.email);
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await userCollection.findOne(query);
            if (user?.role !== 'admin') {
                return res.status(403).send({ message: 'forbiden accesss' });
            }
            next();
        }
        //use Aggregate to query multiple collection and then merge data
        app.get('/appointmentOptions', async (req, res) => {
            const date = req.query.date;
            // console.log(date);
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            const bookingQuery = { AppointmentDate: date };
            const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();
            options.forEach(option => {
                const optionBooked = alreadyBooked.filter(book => book.treatment === option.name);
                const bookedSlots = optionBooked.map(book => book.slot);
                const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot));
                option.slots = remainingSlots;
                // console.log(option.name, bookedSlots, remainingSlots.length);
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
            console.log('decod', decodedEmail);
            if (email !== decodedEmail) {
                return res.status(403).send({ message: 'Forbidden  Access' })
            }
            const query = { email: email };
            const booking = await bookingsCollection.find(query).toArray();
            //send email about appointment confirmation

            res.send(booking);
        })
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await userCollection.findOne(query);
            // console.log('role', user.role);
            res.send(user);
        })
        app.get('/users', async (req, res) => {
            const query = {

            };
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            console.log('emailgh', email);
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });
                console.log('token', token, user);
                return res.send({ accessToken: token })
            }
            res.status(403).send({ accessToken: 'No fdfdtoken' });
        })
        app.get('/appointmentSpecialty', async (req, res) => {
            const query = {};
            const result = await appointmentOptionCollection.find(query).project({ name: 1 }).toArray();
            res.send(result);
        })

        app.get('/addprice', async (req, res) => {
            const filter = {}
            const option = { upsert: true }
            const updateDoc = {
                $set: {
                    price: 99
                }
            }
            const result = await appointmentOptionCollection.updateMany(filter, updateDoc, option);
            res.send(result);
        })
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const booking = await bookingsCollection.findOne(query);
            console.log(booking.phone);
            res.send(booking);
        })
        app.get('/docemailslot/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const q = {
                docEmail: email
            }
            const resu = await slotCollection.findOne(q);
            console.log('docem', resu);
            res.send(resu);
        })
        app.get('/useremail', async (req, res) => {
            const email = req.query.email;
            const user = await userCollection.findOne({ email });
            //console.log(user);
            res.send(user);
        })
        app.get('/bookingpatient/:specialty', async (req, res) => {
            const s = req.params.specialty;

            console.log('ss nnn', s);

            const allPatient = await bookingsCollection.find({ doctor: s }).toArray();
            //console.log(allPatient);
            res.send(allPatient)
        })
        app.post('/vediocall/:id', async (req, res) => {
            const id = req.params.id;
            const calid = req.body;
            console.log('id calid', id, calid);
            const booking = await bookingsCollection.findOne({ _id: ObjectId(id) });
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {

                    callerID: calid.collerid
                }
            }
            const option = { upsert: true }
            const updateResult = await bookingsCollection.updateOne(filter, updateDoc, option);
            console.log(updateResult);
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
            //send email about appointment confirmation 
            sendBookingEmail(booking);
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })
        app.post('/create-payment-intent', async (req, res) => {
            const booking = req.body;
            const price = booking.price;
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                "payment_method_types": [
                    "card"
                ],
            })
            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        })
        //Payment method
        app.post('/payment', async (req, res) => {
            const payment = req.body;
            const result = await paymentCollection.insertOne(payment);
            const id = payment.bookingID;
            console.log('booking', id);
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    paid: true,
                    transactionId: payment.transactionId
                }
            }
            const option = { upsert: true }
            const updateResult = await bookingsCollection.updateOne(filter, updateDoc, option);
            res.send(result);
        })
        app.put('/users/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail };
            // const user = await userCollection.findOne(query);
            // if (user?.role !== 'admin') {
            //     return res.status(403).send({ message: 'forbiden accesss' });
            // }
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        app.put('/addslot/:email', async (req, res) => {
            const email = req.params.email;
            const slot = req.body;
            console.log(email, slot);
            const docSlot = {
                docEmail: email,
                docSlot: slot
            }
            const rt = await slotCollection.findOne({ docEmail: email });
            console.log(rt);
            if (rt) {
                console.log('same', rt.docSlot);
                const u = [...rt.docSlot, ...slot]
                const filter = {
                    docEmail: email
                };
                const options = { upsert: true };
                const updateDoc = {
                    $set: {
                        docSlot: u
                    }
                }
                const zu = await slotCollection.findOneAndUpdate(filter, updateDoc, options)
            }
            else {
                console.log('not same');
                const r = await slotCollection.insertOne(docSlot)
            }

        })
        app.post('/doctors', verifyJWT, verifyAdmin, async (req, res) => {
            const doctor = req.body;
            const result = await doctorsCollection.insertOne(doctor);
            res.send(result);
        })
        app.post('/deleteslot', async (req, res) => {
            const delBody = req.body;
            const r = await slotCollection.findOne({ docEmail: delBody.doctor });
            r.docSlot.map(p => {
                {
                    if (p.date === delBody.AppointmentDate) {
                        p.slot.pop(delBody.slot);
                    }
                }
            })
            console.log(r.docSlot);
            const w=[];
            console.log(w);
            r.docSlot.map(p=>{
                if(p.slot.length!==0)
                {
                    w.push(p);
                }
            })
            console.log(w);
            const filter = {
                docEmail: delBody.doctor
            };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    docSlot: w
                }
            }
            const zu = await slotCollection.findOneAndUpdate(filter, updateDoc, options)
            console.log(zu)
            res.send(delBody);
        })
        app.get('/doctors', verifyJWT, verifyAdmin, async (req, res) => {
            const query = {
                role: 'Doctor'
            };
            const doctors = await userCollection.find(query).toArray();
            res.send(doctors);
        })
        app.delete('/doctors/:id', verifyJWT, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(filter);
            res.send(result);
        })
        app.put('/verifydoctor/:id', async (req, res) => {
            const id = req.params.id;
            const sp = req.body.specialty;
            console.log(id, sp);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    isverified: 'verified'
                }
            }
            const result = await userCollection.findOneAndUpdate(filter, updateDoc, options);
            const q = {
                name: sp
            }
            const doc = {
                $push: {
                    doctors: {
                        name: result.value.name,
                        docEmail: result.value.email
                    }
                }
            }
            const r = await appointmentOptionCollection.updateOne(q, doc, options);
            res.send(result);

        })
    } finally {

    }
}
run().catch(e => console.error(e))

server.listen(port, () => console.log("server is running on port 5000"))