import express, { Express, Request, Response } from "express";
import cors from 'cors';
import passport from 'passport';
import {vars} from "./environment-vars";

const app: Express = express();
import "./middleware/validatedJWT-middleware";
app.use(cors({
    origin: vars.CLIENT_URL 
}));
// passport.use
// passport.authenticate('jwt', {session: false})
app.get("/", passport.authenticate('jwt', {session: false}), async(req: Request, res: Response) => {


    // console.log(req.get('Authorization'));
    console.log(req.user);
    
    res.send("success");
});

app.listen(vars.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${vars.PORT}`);
});