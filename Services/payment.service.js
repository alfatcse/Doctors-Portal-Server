const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Payment = require("../Model/paymentModel");
const Booking = require("../Model/bookingModel");
const { ObjectId } = require("mongodb");
exports.createPaymentIntent = async (data) => {

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: data,
    payment_method_types: ["card"],
  });
  if(paymentIntent.client_secret){
    return paymentIntent.client_secret
  }
  else {
    return false
  }
};
exports.confirmPayment=async (data)=>{
    const confirmation=await Payment.create(data)
    if(confirmation?._id){
        const result = await Booking.bulkWrite([
            {
                updateMany:{
                    filter:{
                        'appointmentData._id':ObjectId(confirmation?.bookingID)
                    },
                    update:[
                        {
                            $set:{
                                'appointmentData':{
                                    $map:{
                                        input:'$appointmentData',
                                        as:'appointmentData',
                                        in:{
                                            $cond:{
                                                if:{$eq:['$$appointmentData._id',ObjectId(confirmation?.bookingID)]},
                                                then:{
                                                    $mergeObjects:['$$appointmentData',{isPaid:true}]
                                                },
                                                else:'$$appointmentData'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]);   
       
    }
}
