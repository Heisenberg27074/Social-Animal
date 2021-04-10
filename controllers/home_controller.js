const Post = require('../models/post');


module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // showing the posts
    // Post.find({}, (err, posts) => {
    //     if (err) { console.log('Error cant show posts', err); return; }
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // showing posts and populating the user object

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
        

    })
    .exec(function (err, posts) {
        if (err) { console.log('Error cant show posts', err); return; }
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
}
