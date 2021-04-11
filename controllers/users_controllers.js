const User = require('../models/user');



module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user

        });
    });
}


// Update user details
module.exports.update = (req, res) =>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , (err, user)=>{
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}
// get the signUp data
module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    })
}
// sign n and create a session for user
module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}