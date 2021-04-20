const User = require('../models/user');
const fs = require('fs');
const path = require('path');


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
module.exports.update = async (req, res) => {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    //         req.flash('success', 'User details updated');
    //         return res.redirect('back');
    //     })
    // } else {
    //     req.flash('error', 'Something went wrong!');

    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('****Multer Error', err) }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        try{
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }catch(err){
                            console.log(err);
                        }
                    }
                    // this is saving the path of the uploaded file in the user   
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }


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

                req.flash('success', 'Account created successfully, Sign In');
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