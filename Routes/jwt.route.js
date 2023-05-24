const express = require("express");
const { createJwt } = require("../Utils/CreateJwt");
const router = express.Router();
router.route('/jwt').get(createJwt)
module.exports = router;