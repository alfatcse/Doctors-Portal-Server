const express = require("express");
const { createJwt } = require("../Utils/JWT");
const router = express.Router();
router.route('/jwt').get(createJwt)
module.exports = router;