const Patient = require('../../models/patient');

module.exports.register = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.status(400).json({
            message: 'Passwords do not match , Try Again !!'
        });
    }

    try {
        let patient = await Patient.findOne({phoneNumber: req.body.phoneNumber});
        
        if(!patient){
            let newPatient = await Patient.create({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
            });

            newPatient = await Patient.findOne({phoneNumber: req.body.phoneNumber});

            return res.status(200).json({
                message: 'You are registered successfully !!',
                data: {
                    patient: newPatient
                }
            });
        }else{
            return res.status(200).json({
                message: 'You are already registered , Please login to continue !!',
                data: {
                    patient: patient
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