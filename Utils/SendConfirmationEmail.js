const mg = require("mailgun-js");
exports.sendBookingEmail = async (booking) => {
  const {
    patient_email: email,
    slot,
    treatment,
    AppointmentDate: appointmentDate,
  } = booking;
  const transporter = () =>
    mg({
      apiKey: process.env.EMAIL_SEND_KEY,
      domain: process.env.EMAIL_SEND_DOMAIN,
    });
  const emailInfo = {
    from: "alfatjahanbsmrstu@gmail.com", // verified sender email
    to: email, // recipient email
    subject: `Your Appointment for ${treatment} is confirmed`, // Subject line
    text: "Doctor's Portal Booking Confirmation!", // plain text body
    html: `
               <h3>Your appointment is confirmed</h3>
               <div> 
                <p> Your appointment for treatment ${treatment}</p>
                <p> Please Visit us on ${appointmentDate} at ${slot}</p>
                <p>Thanks from Doctor'‚s Portal</>
               </div>
          `, // html body
  };
  await transporter()
    .messages()
    .send(emailInfo, (error, body) => {
      if (error) {
        console.log("An Error Occurred",error);
      } else {
        console.log("Email Send Successfully");
      }
    });
};
