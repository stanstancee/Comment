const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(cors());
if(process.env.ENV ==='Test'){
  console.log("testing");
   mongoose.connect('mongodb://localhost/CommentDBTest', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

}
else{

const db = mongoose.connect('mongodb+srv://admin-stanley:bonjan1994@cluster0.oqzrt.mongodb.net/ContactDB?retryWrites=true&w=majority', {
    
  useUnifiedTopology: true,
  useNewUrlParser: true
  
});
console.log('success')
}

const commentRouter = express.Router()

const port = process.env.PORT || 4000;
const Comment = require('./models/commentModel');
const Contact = require('./models/contactModel');
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json())

const commentRoute= require('./routes/commentRouter')(Comment)
const contactRoute = require('./routes/contactRouter')(Contact)
app.use('/api', commentRoute);
app.use('/api',contactRoute);


app.get("/", (req, res) => {
  res.send("Hi, Welcome to my API")
})



app.post("/contact",(req,res)=>{
  const {name,email,phone,message} = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',

    auth: {
      user: process.env.EMAIL,
      pass:process.env.PASSWORD
    }
  });
  
  const mailOptions = {
    from:email ,
    to:process.env.EMAIL,
    subject: `Message from ${name , phone} `,
   text: `${ message }`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
     res.json(error)
    } else {
      res.status(200).json(info.response);
    }
  });
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app,{server};