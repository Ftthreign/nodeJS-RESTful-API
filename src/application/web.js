import express from "express";
import { pubRoute } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

export const app = express();

app.use(express.json());
app.use(pubRoute);
app.use(userRouter);
app.use(errorMiddleware);
