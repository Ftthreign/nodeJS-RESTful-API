import express from "express";
import userController from "../controller/user-controller.js";

const pubRoute = new express.Router();

pubRoute.post("/api/users", userController.register);

export { pubRoute };
