import "@std/dotenv/load";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { homeRouter, loginRouter, registerRouter } from "./routes/allRoutes.ts";
import Logger from "./middleware/utils.ts";

import { authMiddleware } from "./middleware/auth.ts";

const app: Express = express();
const port = Deno.env.get("PORT") || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(Logger);
app.use(bodyParser.json());

app.use("/login", loginRouter);
app.use("/register", registerRouter);

// all routes below this middleware will require authentication
app.use(authMiddleware);
app.use("/home", homeRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send({ Message: "this is where the login & register pages will live" });
});

app.listen(port, () => console.log(` : ${port}`));
