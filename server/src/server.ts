import "@std/dotenv/load";
import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { chatRouter, loginRouter, registerRouter } from "./routes/allRoutes.ts";
import Logger from "./middleware/utils.ts";

import { authMiddleware } from "./middleware/auth.ts";

const app: Express = express();
const port = Deno.env.get("PORT") || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(Logger);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// all routes below this middleware will require authentication
app.use(authMiddleware);
app.use("/chat", chatRouter);

app.listen(port, () => console.log(` : ${port}`));
