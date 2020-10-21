const express = require('express')
const Con = require('../models/contactModel')
const  ContactController = require('../controller/contactController')

function contactRouter(){
    const contactRouter = express.Router()
    const control =ContactController(Con)
    contactRouter.route('/contact')
        .post(control.post)
        .get(control.get)
   return contactRouter
}

module.exports =contactRouter;