module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    });
}

module.exports.login = (req,res) => {
    return res.render('login',{
        title: "LogIn",
      
    });
}