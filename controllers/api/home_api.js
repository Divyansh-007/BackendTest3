module.exports.index = function(req,res){
    return res.status(200).json({
        message: 'Welcome to Hospital API'
    });
}