const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
exports.sendBookingEmail=(booking)=> {
    console.log('bbbbbbb',booking);
    const { patient_email:email, slot, treatment, AppointmentDate:appointmentDate } = booking;
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
        domain: process.env.EMAIL_SEND_DOMAIN,
      },
    };
    const transporter = nodemailer.createTransport(mg(auth));
    console.log("send email", email);
    transporter.sendMail(
      {
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
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info);
        }
      }
    );
  }
