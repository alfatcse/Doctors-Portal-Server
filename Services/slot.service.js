const slots = require("../Model/SlotModel");
exports.getSlot = async (data) => {
  const query = {
    docEmail: data?.email,
  };
  const SlotData = await slots.findOne(query);
  if (SlotData) {
    return SlotData;
  }
};
exports.updateSlot = async (data) => {
  const query = {
    docEmail: data.doctor,
  };
  const r = await slots.findOne(query);
  r.docSlot.map((p) => {
    {
      if (p.date === data.AppointmentDate) {
        p.slot.pop(data.slot);
      }
    }
  });
  const w = [];
  r.docSlot.map((p) => {
    if (p.slot.length !== 0) {
      w.push(p);
    }
  });
  const filter = {
    docEmail: data.doctor,
  };
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      docSlot: w,
    },
  };
  const zu = await slots.findOneAndUpdate(filter, updateDoc);
  console.log('zu',zu);
  return w;
};
