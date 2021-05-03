const Patient = require('../../models/patient');
const Report = require('../../models/report');

module.exports.index = function(req,res){
    return res.status(200).json({
        message: 'Welcome to Hospital API'
    });
}

module.exports.allReports = async function(req,res){
    let reports = await Report.find({status: req.params.status}).populate('of','name').populate('createdBy','name');

    return res.status(200).json({
        message: `Reports of all Patients with status ${req.params.status}`,
        data: {
            reports: reports
        }
    });
}

module.exports.patientAllReports = async function(req,res){
    try {
        let patient = await Patient.findById(req.params.id);

        let reports = await Report.find({of: patient._id}).select({'_id': 0, 'of': 0}).populate('createdBy','name');

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

