module.exports.index = (req, res)=>{
    return res.json(200, {
        message: 'list of comments',
        comments: []
    })
}