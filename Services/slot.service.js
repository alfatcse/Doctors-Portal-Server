const slots=require('../Model/SlotModel')
exports.slot=async(data)=>{
    console.log('Slot Service',data?.email);
    const query={
        docEmail:data?.email
    }
    const SlotData=await slots.findOne(query);
    console.log('sss',SlotData);
    if(SlotData){
        return SlotData
    }
}