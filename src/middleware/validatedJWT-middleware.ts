import { ExtractJwt, Strategy } from 'passport-jwt';
import {vars} from '../environment-vars'
import passport from 'passport';
import fs from 'fs';
import { UserTable } from "@database/table/user-table";


passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync('certificate/app_cert.pem'),
    issuer: vars.OAUTH2_ISSUER_URL,
    audience: vars.OAUTH2_CLIENT_ID,
    ignoreExpiration: false
}, function (jwtPayload, done) {
    return new Promise(async(resolve) => {
        console.log("A user has been authenticated");
        const userTable = new UserTable();
        const result = await userTable.findUser(jwtPayload.email);
        if(!result){
            const account = await userTable.insertUser({username: jwtPayload.nickname, email: jwtPayload.email, name: jwtPayload.name});
            resolve(done(null, account));
        } else {
            resolve(done(null, result));
        }
    });
}));