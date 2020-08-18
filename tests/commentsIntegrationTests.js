 const should = require("should");

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");



const Comment = mongoose.model('Comment');
const agent = request.agent(app);

describe('Comment Crud Test',()=>{
   it('should allow a comment to be posted ,fbId must be a number and comment must include  _id',(done)=>{
      const commentPost = {
        fbId: 2345787978080,
        profile_picture: "lk.jpg",
        profile_name: "luke Chekwube",
        title: "Oh boy",
        content: "This is what i like"
    };
    agent.post('/api/comment')
    .send(commentPost)
    .expect(201)
    .end((err,results)=>{
        results.body.should.have.property('fbId')
        results.body.should.have.property('_id')
        done();
    })
   })
   afterEach((done)=>{
       Comment.deleteMany({}).exec();
       done();
   });
  
});