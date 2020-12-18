const express = require('express');
const Project = require('../models/projectModel')

function projectRouter() {
    const projectRouter = express.Router()
    projectRouter.route('/project')
        .post(function (req, res) {
                //create a new model
                const project = new Project(req.body);
                // check if title is included which is required
                if (!req.body.title) {
                    res.status(404);
                    return res.send("title is required")
                }
                project.save((err, doc) => {
                    if (err) {
                        return (`There was an error saving your document ${err}`)
                    }
                    res.send(doc);
                })
                res.status(200);
            }


        )
        .get((req, res) => {

            Project.find({}, (err, foundProject) => {
                if (err) {
                    res.send(`There was an error finding your document`)
                } else {
                    return res.json(foundProject)
                }

            });
        });
    projectRouter.use('/project/:projectId', (req, res, next) => {
        Project.findById(req.params.projectId, (err, foundProject) => {
            if (err) {
                return res.send(`You have an error ${err}`);
            }
            if (foundProject) {
                req.foundProject = foundProject;
                return next();
            }
            return res.sendStatus(404);
        })
    });
    projectRouter.route('/project/:projectId')
        .get((req, res) => {
            const returnProject = req.foundProject.toJSON();

            return res.json(returnProject)

        })
        .put((req, res) => {
            const {
                foundProject
            } = req;
            foundProject.image1 = req.body.image1;
            foundProject.image2 = req.body.image2;
            foundProject.title = req.body.title;
            foundProject.bookmark = req.body.bookmark;
            foundProject.bookmark2 = req.body.bookmark2;
            foundProject.projectBackground = req.body.projectBackground;
            req.foundProject.save((err) => {
                if (err) {
                    return res.sendStatus(500).send(err)
                } else {
                    return res.json(req.foundProject)
                }
            })
            return res.status(201).json(foundProject);
        })

        .patch((req, res) => {
            const {
                foundProject
            } = req;
            if (req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0]
                const value = item[1];
                foundProject[key] = value;
            });
            req.foundProject.save((err) => {
                if (err) {
                    return res.sendStatus(500).send(err)
                } else {
                    return res.json(req.foundProject)
                }
            })
        })
        .delete((req, res) => {
            req.foundProject.remove(err => {
                if (err) {
                    return res.send(err)
                } else {
                    return res.sendStatus(204);
                }
            });
        });
    return projectRouter
}
module.exports = projectRouter