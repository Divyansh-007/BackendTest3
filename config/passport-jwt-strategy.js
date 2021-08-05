// required libraries and models
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const Doctor = require('../models/doctor');

// options to be used
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "JWT Secret"
}

// new strategy initialization
passport.use(new JWTStrategy(opts, function(jwtPayload,done){
    Doctor.findById(jwtPayload._id,function(err,doc){
        if(err){console.log('error in finding the doctor',err); return;}

        if(doc){
            return done(null,doc);
        }else{
            return done(null,false);
        }
    });
}));
