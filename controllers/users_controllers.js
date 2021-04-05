const User = require('../models/user');



module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: "User Profile",
         
    });
}
// render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up" 
    });
}

// render the sign in page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
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
    return res.redirect('/users/profile');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}