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

