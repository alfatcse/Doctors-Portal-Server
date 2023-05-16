const Booking=require('../Model/bookingModel');
exports.CreateBooking=async(data)=>{
    const booking=await Booking.create(data);
    if(booking){
        return booking
    }
}
exports.CheckBooking=async(data)=>{
    const alreadyBooked=await Booking.find(data)
    console.log('aaa',alreadyBooked);
    if(alreadyBooked?.length){
        return true
    }
    else {
        return false
    }
}