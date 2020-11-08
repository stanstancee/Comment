//import mongoose
const mongoose = require('mongoose');
//destructure mongoose object and get schema
const { Schema } = mongoose ;
//create new schema
const projectModel = new Schema({
    title:{type:String},
    link:{type:String},
    content:{type:String}

});

//export schema
module.exports = mongoose.model("Project",projectModel)