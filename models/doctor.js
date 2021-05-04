const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const docSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

docSchema.pre('save',function(next){
    let doc = this;
    let salt_factor = 10;

    if(!doc.isModified('password')){
        return next();
    }

    bcrypt.genSalt(salt_factor,function(err,salt){
        if(err){return next(err);}

        bcrypt.hash(doc.password, salt, null, function(err,hash){
            if(err){return next(err);}

            doc.password = hash;
            next();
        });
    });
});

docSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password, this.password, function(err,isMatch){
        if(err){return cb(err);}

        cb(null,isMatch);
    });
}

const Doctor = mongoose.model('Doctor',docSchema);

module.exports = Doctor;
