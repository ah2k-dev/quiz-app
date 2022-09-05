const express = require("express");
const auth = require("../controllers/authController");
const router = express.Router();

router.route("/login").post(auth.login);
router.route('/presist-login').post(auth.presistLogin);
router.route('/logout').get(auth.logout);
module.exports = router;
