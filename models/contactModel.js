const mongoose = require("mongoose");

const {Schema} = mongoose;

const contactModel = new Schema({
  name:{type:String} ,
  email: {type:String},
  phone: {type:String},
  message: {type:String}
});

module.exports = mongoose.model("Contact",contactModel)