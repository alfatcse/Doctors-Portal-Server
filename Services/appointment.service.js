const appointmentOptions=require('../Model/AppointmentOptionModel')
exports.appointmentOptions=async()=>{
    console.log('Appointment Option Service');
    const query={};
    const data=await appointmentOptions.find(query);
    if(data){
        return data
    }
} 