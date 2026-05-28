const express  = require("express");
const authRouter = express.Router();
const controller = require("../controllers/auth.controller");

// register route
authRouter.post("/register", controller.register);


module.exports = authRouter;