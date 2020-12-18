//import mongoose
const mongoose = require('mongoose');
//destructure mongoose object and get schema
const { Schema } = mongoose ;
//create new schema
const projectModel = new Schema({
    title:{type:String},
    image1:{type:String},
    image2:{type:String},
    bookmark:{type:String},
    bookmark2:{type:String},
	projectBackground:{type:String}

	

});

//export schema
module.exports = mongoose.model("Project",projectModel)