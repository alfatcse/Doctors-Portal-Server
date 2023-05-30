const slots = require("../Model/SlotModel");
const User = require("../Model/UserModel");
const appointmentOptions = require("../Model/AppointmentOptionModel");
exports.getSlot = async (data) => {
  const query = {
    docEmail: data?.email,
  };
  const SlotData = await slots.findOne(query);
  if (SlotData) {
    return SlotData;
  } else {
    return false;
  }
};
exports.updateSlot = async (data) => {
  console.log("Update slot");
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
  const a = await User.findOne({ email: data.doctor });
  console.log(a);
  const updateFirst = { $pop: { slots: -1 } };
  const updateSlot = await appointmentOptions.updateOne(
    { name: a.specialty },
    updateFirst
  );
  console.log("update slot", updateSlot);
  return w;
};
exports.insertNewSlot = async (data) => {
  const q = {
    docEmail: data?.docEmail,
  };
  const options = { new: true, useFindAndModify: false };
  const r = await slots.findOne(q);
  if (r) {
    let u = [...r?.docSlot, ...data?.docSlot];
    const tz = await User.findOne({ email: data?.docEmail });
    const z = await appointmentOptions.findOne({
      name: tz.specialty,
    });
    data.docSlot.map((s) => {
      z.slots.push(...s.slot);
    });
    const filter = { name: tz.specialty };
    const options1 = { new: true, useFindAndModify: false };
    const updateDoc1 = {
      $set: {
        slots: z.slots,
      },
    };
    const updateDoc = {
      $set: {
        docSlot: u,
      },
    };
    const zu = await slots.updateOne(q, updateDoc, options);
    const s = await appointmentOptions.updateOne(filter, updateDoc1, options1);
    if (zu.modifiedCount === 1 && s.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  } else {
    const zu = await slots.create(data);
    const tz = await User.findOne({ email: data?.docEmail });
    const z = await appointmentOptions.findOne({
      name: tz.specialty,
    });
    data.docSlot.map((s) => {
      z.slots.push(...s.slot);
    });
    const filter = { name: tz.specialty };
    const options1 = { new: true, useFindAndModify: false };
    const updateDoc1 = {
      $set: {
        slots: z.slots,
      },
    };
    const s = await appointmentOptions.updateOne(filter, updateDoc1, options1);
    console.log(s, zu);
    if (s.modifiedCount === 1 && zu) {
      return true;
    } else {
      return false;
    }
  }
};
