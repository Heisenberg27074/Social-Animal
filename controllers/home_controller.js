module.exports.home = function(req, res){
    return res.end('<h1>Express is up for codeial.</h1>');
}

module.exports.login = (req,res) => {
    return res.end('<h1>Login to our website</h1>');
}