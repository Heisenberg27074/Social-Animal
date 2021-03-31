module.exports.profile = (req,res) => {

    return res.render('users', {
        title: "User Profile",
        name: "Kunal Verma"
    });
}

module.exports.friends = (req,res) => {
    return res.end('<h1>User Friends </h1>');
}