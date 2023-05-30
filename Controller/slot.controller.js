const {
  getSlot,
  updateSlot,
  insertNewSlot,
} = require("../Services/slot.service");
exports.getSlot = async (req, res, next) => {
  try {
    const data = await getSlot(req?.params);
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Slots Found",
        data: data,
      });
    } else if (data === false) {
      res.status(400).json({
        status: "Failed",
        message: "No Slot Found",
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
exports.insertSlot = async (req, res, next) => {
  try {
    const data = await insertNewSlot(req.body);
    if (data) {
      res.status(200).json({
        status: "Success",
        message: "Slots Inserted",
        data: data,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Slot can not Insert",
      data: err?.message,
    });
    next(err);
  }
};
