const mongoose = require("mongoose");

const {Schema} = mongoose;

const commentModel = new Schema({
  fbId: {type:Number}, 
  profile_picture: {type:String},
  profile_name:{type:String} ,
  title: {type:String},
  content: {type:String}
});

module.exports = mongoose.model("Comment",commentModel)