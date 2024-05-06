import express from "express";
import { pubRoute } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const app = express();

app.use(express.json());
app.use(pubRoute);
app.use(errorMiddleware);
