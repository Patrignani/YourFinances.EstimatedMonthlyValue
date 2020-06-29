import * as passport from "passport";
import * as passportjwt from 'passport-jwt';
import { SystemConfig } from "./system-config";
import * as noder from 'noder.io';
import {Ioc} from "../config/ioc";

var JwtStrategy =passportjwt.Strategy,
    ExtractJwt = passportjwt.ExtractJwt;

var opts : any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SystemConfig.SECRET;   

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

  noder.$di.set(Ioc.TOKEN,jwt_payload)
    return done(null, true);
  }));
  

  export function Authenticate()
{
  return passport.authenticate('jwt', { session : false });
}

export function Initialize()
{
  return passport.initialize();
}
