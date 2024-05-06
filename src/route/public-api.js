import express from "express";
import userController from "../controller/user-controller.js";

const pubRoute = new express.Router();

pubRoute.post("/api/users", userController.register);
pubRoute.post("/api/users/login", userController.login);
export { pubRoute };
