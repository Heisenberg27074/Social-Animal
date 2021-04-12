const User = require('../models/user');



module.exports.profile = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }

}


// Update user details
module.exports.update = (req, res) => {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            req.flash('success', 'User details updated');
            return res.redirect('back');
        })
    } else {
        req.flash('error', 'Something went wrong!');

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
        req.flash('error', 'Password do not match');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                req.flash('success', 'Account created successfully, Sign In' );
                return res.redirect('/users/sign-in');
            });
        } else {
            req.flash('warning', 'This email is already associated to an account');

            return res.redirect('back');
        }
    })
}
// sign n and create a session for user
module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}