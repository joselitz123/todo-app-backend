import { RequestHandler } from 'express';
// import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {vars} from '../environment-vars'
import passport from 'passport';
import fs from 'fs';

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync('certificate/app_cert.pem'),
    issuer: vars.OAUTH2_ISSUER_URL,
    audience: vars.OAUTH2_CLIENT_ID,
    ignoreExpiration: false
}, function (jwtPayload, done) {
    console.log(jwtPayload);
    return done(null, jwtPayload);
}))

// export const authFunction: VerifyCallbackWithRequest = () => {
//     passport.authenticate    
// }