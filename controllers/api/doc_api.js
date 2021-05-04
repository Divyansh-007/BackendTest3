// required libraries and models
const jwt = require('jsonwebtoken');
const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Report = require('../../models/report');

// registering a new doctor
module.exports.register = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.status(400).json({
            message: 'Passwords do not match , Try Again !!'
        });
    }

    try {
        let doc = await Doctor.findOne({username: req.body.username})
                                .select({'_id' : 0 ,'createdAt': 0, 'updatedAt' : 0, 'password' : 0, '__v' : 0});
        
        if(!doc){
            let newDoc = await Doctor.create({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            });

            newDoc = await Doctor.findOne({username: req.body.username})
                                    .select({'_id' : 0 ,'createdAt': 0, 'updatedAt' : 0, 'password' : 0, '__v' : 0});

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

// logging in a doctor
module.exports.login = async function(req,res){
    try {
        let doc = await Doctor.findOne({username: req.body.username});

        if(!doc){
            return res.status(422).json({
                message: 'No account with that username exists !!'
            });
        }

        doc.comparePassword(req.body.password,function(err,isMatch){
            if(!isMatch){
                return res.status(422).json({
                    message: 'Invalid Username / Password !!'
                });
            }else{
                return res.status(200).json({
                    message: 'Sign In Successfully!!, here is your token',
                    data: {
                        token: jwt.sign(doc.toJSON(),'covid',{expiresIn: '100000'})
                    }
                });
            }
        });
    }catch(err){
        console.log(err);
       return res.status(500).json({
           message: 'Internal Server Error'
       });   
    }
}

// creating report of a patient
module.exports.createReport = async function(req,res){
    try {
        let patient = await Patient.findById(req.params.id);
            
        if(!patient){
            return res.status(404).json({
                message: 'No Patient was found !!'
            });
        }else{
            let report = await Report.create({
                of: patient._id,
                createdBy: req.user._id,
                date: req.body.date,
                status: req.body.status
            });
                
            patient = await Patient.findByIdAndUpdate(req.params.id, {status: req.body.status});
            patient.reports.push(report);
            patient.save();
    
            report = await report.populate('of','name').populate('createdBy','name').execPopulate();
    
            return res.status(200).json({
                message: 'Report Created Successfully !!',
                data: {
                    report: report
                }
            });
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: 'Error in creating report !!'
        });
    }
}
