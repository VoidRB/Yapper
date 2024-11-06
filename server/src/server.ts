import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { homeRouter, loginRouter, registerRouter } from './routes/allRoutes.ts';
import '@std/dotenv/load';
import Logger from './utils.js';

const app: Express = express();
const port = Deno.env.get('PORT') || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(Logger);
app.use(bodyParser.json());

app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/register', registerRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send({ Message: 'this is where the login & register pages will live' });
});

app.listen(port, () => console.log(` : ${port}`));
