const express = require('express');
const Project = require('../models/projectModel')

function  projectRouter(){
const projectRouter = express.Router()
projectRouter.route('/project')
.post(function(req,res){
//create a new model
const project = new Project(req.body);
// check if link is included which is required
if(!req.body.link){
    res.status(404);
    return res.send("link is required")
}
   project.save((err,doc)=>{
       if(err){
           return(`There was an error saving your document ${err}`)
       }
       res.send(doc)
   })
  res.status(200)
}


)
.get((req,res)=>{
 
    Project.find({},(err,foundProject)=>{
        if(err){
            res.send(`There was an error finding your document`)
        }
        else{
           return res.json(foundProject)
        }
        
    });
});
return projectRouter
}
module.exports = projectRouter