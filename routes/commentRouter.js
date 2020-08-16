const express = require("express");
const controller = require("../controller/commentController");

function routes(Comment) {
    const commentRouter = express.Router()
    const control = controller(Comment)
    commentRouter.route('/comment')
        .post(control.post)
        .get(control.get)
    commentRouter.use('/comment/:commentId', (req, res, next) => {
        Comment.findById(req.params.commentId, (err, foundComment) => {
            if (err) {
                return res.send(`You have an error ${err}`);
            }
            if (foundComment) {
                req.foundComment = foundComment;
                return next();
            };
            return res.sendStatus(404);
        })
    });
    commentRouter.route('/comment/:commentId')
        .get((req, res) => res.json(req.foundComment))

        .put((req, res) => {
            const {
                foundComment
            } = req;
            foundComment.fbId = req.body.fbId;
            foundComment.profile_picture = req.body.profile_picture;
            foundComment.profile_name = req.body.profile_name;
            foundComment.title = req.body.title;
            foundComment.content = req.body.content;
            req.foundComment.save((err) => {
                if (err) {
                    return res.sendStatus(500).send(err)
                } else {
                    return res.json(req.foundComment)
                }
            })
            return res.status(201).json(foundComment);
        })

        .patch((req, res) => {
            const {
                foundComment
            } = req;
            if (req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0]
                const value = item[1];
                foundComment[key] = value;
            });
            req.foundComment.save((err) => {
                if (err) {
                    return res.sendStatus(500).send(err)
                } else {
                    return res.json(req.foundComment)
                }
            })
        })
        .delete((req, res) => {
            req.foundComment.remove(err => {
                if (err) {
                    return res.send(err)
                } else {
                    return res.sendStatus(204);
                }
            });
        })
    return commentRouter;
}

module.exports = routes