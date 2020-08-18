const should = require("should");
const sinon = require("sinon");
const commentsController = require('../controller/commentController');
process.env.ENV = "Test";
describe("Comment Controller Test",()=>{
    describe('post',()=>{
        it("should not allow empty comment title",()=>{
            const Comment = function(comment){
                this.save = ()=>{}
            }
            const req = {
                body:{
                    profile_name:"Luke Stanley",
                    profile_pic:"lovely.jpg"
                }
            }
            const res = {
                status:sinon.spy(),
                send:sinon.spy(),
                json:sinon.spy()
            }
            const controller = commentsController(Comment);
            controller.post(req,res)
            res.status.calledWith(400).should.equal(true,`Bad status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true)
        });
    });
});


