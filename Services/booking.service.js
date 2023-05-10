const Booking=require('../Model/bookingModel');
exports.CreateBooking=async(data)=>{
    console.log('Booking Service',data);
    console.log(data);
    const booking=await Booking.create(data);
    console.log(booking);
    if(booking){
        return booking
    }
}