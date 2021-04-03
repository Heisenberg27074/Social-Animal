const User = require('../models/user');

module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, (err, user) => {
            if(user){
                return res.render('user_profile', {
                    title:"User Profile",
                    user : user
                })
            }
            return res.redirect('/users/sign-in');
        
        });
    } else {
        return res.redirect('/users/sign-in');
    }

}
// render the sign up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = (req, res) => {
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
                if (err) { console.log('error increating user while signing up'); return }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    })
}
// sign n and create a session for user
module.exports.createSession = (req, res) => {
    // steps to authenticate

    User.findOne({ email: req.body.email }, (err, user) => {
        //    find the user
        if (err) { console.log(`error in finding user while signing in, ${err}`); return }
        // handle user found
        if (user) {
            // handle password which dont match
            if (user.password != req.body.password) {
                console.log(`Password do not match`);
                return res.redirect('back');
            }

            // handle session creation
            // console.log(user.id, user._id);
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else
            // handle user not found
            return res.redirect('back');
    })

}
module.exports.signOut = (req,res) =>{
        console.log(req.cookies);
        res.cookie('user_id',0);
        return res.redirect('/users/sign-in');
    }