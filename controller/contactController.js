function ContactController(Contact){
    function post(req,res){
            const contact = new Contact(req.body);
            if(!req.body.message){
                res.status(400);
                return res.send("Message is required")
            }
           contact.save();
             res.status(201)
            return res.json(contact);
    }
    function get(req, res) {
        const query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        
        Contact.find(query, (err, foundContacts) => {
            if (err) {
                return res.send(`You have an error ${err}`);
            }
            const returnContacts =foundContacts.map((Contact)=>{
                let newContact = Contact.toJSON();
                newContact.links = {};
                newContact.links.self = `http://${req.headers.host}/api/contact/${Contact._id}`
                return newContact;
            });
            return res.json(returnContacts)
        })
    }
    return {post,get}
}
module.exports = ContactController;