import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import passport from 'passport';
import {vars} from "./environment-vars";
import { addArea, getArea, getStatus, getLabel } from "@controller/controller";
import { initSetup } from "./initial-setup";

const app: Express = express();
import "./middleware/validatedJWT-middleware";
app.use(cors({
    origin: vars.CLIENT_URL 
}));

app.use(bodyParser.json());
// app.use(queryParser);
// initSetup();

app.post("/api/v1/area", passport.authenticate('jwt', {session: false}), addArea);
app.get("/api/v1/area", passport.authenticate('jwt', {session: false}), getArea);

app.get("/api/v1/status", passport.authenticate('jwt', {session: false}), getStatus);

app.get("/api/v1/label", passport.authenticate('jwt', {session: false}), getLabel);

app.listen(vars.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${vars.PORT}`);
});