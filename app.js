const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require('body-parser');
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
  const db = mongoose.connect('mongodb://localhost/CommentDB', {
    
  useUnifiedTopology: true,
  useNewUrlParser: true
  
});
const cb = mongoose.connect('mongodb://localhost/ContactDB', {
    
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

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app,{server};