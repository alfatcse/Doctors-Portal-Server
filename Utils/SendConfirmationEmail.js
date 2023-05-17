const nodemailer = require("nodemailer");
const sendBookingEmail = (booking) => {
  console.log(booking);
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  };
  const {
    patient_email: email,
    slot,
    treatment,
    AppointmentDate: appointmentDate,
  } = booking;
  let transporter = nodemailer.createTransport(config);
  let message = {
    from: process.env.EMAIL_ADDRESS,
    to: booking.patient_email,
    subject: "Appointment Confirmation",
    html: `<h3>Your appointment is confirmed</h3>
            <div> 
                <p> Your appointment for treatment ${treatment}</p>
                <p> Please Visit us on ${appointmentDate} at ${slot}</p>
                <p>Thanks from Doctor's Portal</>
            </div>`, 
  };
  transporter
    .sendMail(message)
    .then(() => {
      console.log("done");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = {
  sendBookingEmail,
};
