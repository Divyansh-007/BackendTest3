const Doctor = require('../../models/doctor');

module.exports.register = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.status(400).json({
            message: 'Passwords do not match , Try Again !!'
        });
    }

    try {
        let doc = await Doctor.findOne({username: req.body.username}).select({'_id' : 0 ,'name': 1, 'username' : 1});
        
        if(!doc){
            let newDoc = await Doctor.create({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            });

            newDoc = await Doctor.findOne({username: req.body.username}).select({'_id' : 0 ,'name': 1, 'username' : 1});

            return res.status(200).json({
                message: 'You are registered successfully !!',
                data: {
                    doctor: newDoc
                }
            });
        }else{
            return res.status(200).json({
                message: 'You are already registered , Please login to continue !!',
                data: {
                    doctor: doc
                }
            });
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: 'Error in registering !!'
        });
    }
}