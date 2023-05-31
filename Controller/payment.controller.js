const {
  createPaymentIntent,
  confirmPayment,
} = require("../Services/payment.service");
exports.getPaymentIntent = async (req, res, next) => {
  try {
    const amount = req.body.price * 100;
    const client_secret = await createPaymentIntent(amount);
    if (client_secret !== false) {
      res.status(200).json({
        status: "Success",
        message: "Payment Intent Created",
        clientSecret: client_secret,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Payment Intent not created",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Payment Intent not created",
      data: err?.message,
    });
    next(err);
  }
};
exports.confirmPayment = async (req, res, next) => {
  try {
    const confirmation = await confirmPayment(req.body);
    if (confirmation === true) {
      res.status(200).json({
        status: "Success",
        message: "Payment Confirmed",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Payment Intent not created",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Payment Intent not created",
      data: err?.message,
    });
    next(err);
  }
};
