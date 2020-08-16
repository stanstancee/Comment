const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require('body-parser');
const app = express();
if(process.env.ENV ==='Test'){
  const db = mongoose.connect('mongodb://localhost/CommentDBTest', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
}
else{
  const db = mongoose.connect('mongodb://localhost/CommentDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
}

const commentRouter = express.Router()

const port = process.env.PORT || 3000;
const Comment = require('./models/commentModel');
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json())

const commentRoute= require('./routes/commentRouter')(Comment)

app.use('/api', commentRoute);


app.get("/", (req, res) => {
  res.send("Hi, Welcome to my API")
})

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app,{server};