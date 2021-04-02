const User = require('../models/user');
module.exports.profile = (req,res) => {

    return res.render('users', {
        title: "User Profile",
        name: "Kunal Verma"
    });
}
// render the sign up page
module.exports.signUp = (req,res) => {
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = (req,res) => {
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}
// get the signUp data
module.exports.create = (req,res) =>{
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error increating user while signing up'); return}
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    })
}   
// sign n and create a session for user
module.exports.createSession = (req,res) =>{
   
}