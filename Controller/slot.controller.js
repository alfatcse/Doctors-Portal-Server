const slots = require("../Model/SlotModel");
const { getSlot, updateSlot } = require("../Services/slot.service");
exports.getSlot = async (req, res, next) => {
  console.log("req", req?.params);
  try {
    const data = await getSlot(req?.params);
    console.log("slotData", data);
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Slots Found",
        data: data,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Slot Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.updateSlot = async (req, res, next) => {
  try {
    const data = await updateSlot(req?.body);
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Slots Updated",
        data: data,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Slot can not Update",
      data: err?.message,
    });
    next(err);
  }
};
