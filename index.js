const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection, client } = require("./Utils/DBConnect");
const UserRoute = require("./Routes/user.route");
const AppointmentRoute = require("./Routes/appointment.route");
const SlotRoute = require("./Routes/slot.route");
const BookingRoute = require("./Routes/booking.route");
const JwtRoute = require("./Routes/jwt.route");
const paymentRoute = require("./Routes/payment.route");
const http = require("http");
const port = process.env.PORT || 5006;
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
app.use("/api/v1", UserRoute);
app.use("/api/v1", AppointmentRoute);
app.use("/api/v1", SlotRoute);
app.use("/api/v1", BookingRoute);
app.use("/api/v1", JwtRoute);
app.use("/api/v1", paymentRoute);
app.get("/", async (req, res) => {
  res.send("Doctors Portal Server Running");
});
server.listen(port, () => console.log(`server is running on port ${port}`));
