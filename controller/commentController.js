function commentsController(Comment){
    function post(req,res){
            const comment = new Comment(req.body);
            if(!req.body.title){
                res.status(400);
                return res.send("Title is required")
            }
            comment.save();
             res.status(201)
            return res.json(comment);
    }
    function get(req, res) {
        const query = {};
        if (req.query.profile_name) {
            query.profile_name = req.query.profile_name;
        }
        Comment.find(query, (err, foundComments) => {
            if (err) {
                return res.send(`You have an error ${err}`);
            }
            return res.json(foundComments)
        })
    }
    return {post,get}
}
module.exports = commentsController;