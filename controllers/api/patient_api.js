// required model
const Patient = require('../../models/patient');

// registering a new patient
module.exports.register = async function(req,res){
    if(req.body.phoneNumber != req.body.confirm_phoneNumber){
        return res.status(400).json({
            message: 'Phone Numbers do not match , Try Again !!'
        });
    }

    try {
        let patient = await Patient.findOne({phoneNumber: req.body.phoneNumber})
                                    .select({'createdAt' : 0, 'updatedAt' : 0, '__v': 0});
        
        if(!patient){
            let newPatient = await Patient.create({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                status: req.body.status
            });

            newPatient = await Patient.findOne({phoneNumber: req.body.phoneNumber})
                                        .select({'createdAt' : 0, 'updatedAt' : 0, '__v' : 0});

            return res.status(200).json({
                message: 'New Patient is registered successfully !!',
                data: {
                    patient: newPatient
                }
            });
        }else{
            return res.status(200).json({
                message: 'The Patient is already registered !!',
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