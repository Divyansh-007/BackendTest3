const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'covid'
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){
    Doctor.findById(jwtPayload._id,function(err,doctor){
        if(err){console.log('error in finding the doctor',err); return;}

        if(doctor){
            return done(null,doctor);
        }else{
            return done(null,false);
        }
    });
}));