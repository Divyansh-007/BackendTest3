// required models
const Patient = require('../../models/patient');
const Report = require('../../models/report');

// starting api
module.exports.index = function(req,res){
    return res.status(200).json({
        message: 'Welcome to Hospital API'
    });
}

// all reports of all patients with a specific status filtered
module.exports.allReports = async function(req,res){
    let reports = await Patient.find({status: req.params.status})
                        .select({'_id' : 0 , 'status': 0, 'createdAt': 0 , 'updatedAt': 0, '__v' : 0})
                        .populate({
                            path: 'reports',
                            select: {'_id' : 0, 'of' : 0, 'createdAt': 0 , 'updatedAt': 0, '__v' : 0},
                            populate: {
                                path: 'createdBy',
                                select: {'_id' : 0, 'username': 0, 'password': 0, 'createdAt': 0 , 'updatedAt': 0, '__v' : 0}
                            }
                        });

    return res.status(200).json({
        message: `Reports of all Patients with status ${req.params.status}`,
        data: {
            reports: reports
        }
    });
}

// all reports of a patient
module.exports.patientAllReports = async function(req,res){
    try {
        let patient = await Patient.findById(req.params.id);

        let reports = await Report.find({of: patient._id})
                                    .select({'_id': 0, 'of': 0, 'createdAt': 0 , 'updatedAt': 0, '__v' : 0}).populate('createdBy','name');

        return res.status(200).json({
            message: `All Reports of Patient by Name: ${patient.name}`,
            data: {
                reports: reports
            }
        });
    }catch(err){
       console.log(err);
       return res.status(404).json({
           message: 'No Patient found !!'
       }) 
    }
}

