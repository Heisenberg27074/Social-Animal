module.exports.profile = (req,res) => {

    return res.end('<h1>User profile</h1>');
}

module.exports.friends = (req,res) => {
    return res.end('<h1>User Friends </h1>');
}