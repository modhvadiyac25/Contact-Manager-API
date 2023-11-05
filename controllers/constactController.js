const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    console.log("[debug] : getContacts ");
    const contact = await Contact.find({ user_id: req.user.id});
    console.log("[debug] : getContacts " + contact);
    if(!contact){
        res.status(404); 
        throw new Error("No Contact Found");
    }
    res.status(200).json(contact);
});

//@desc Create contacts
//@route POST api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    // const body = req.body;
    // console.log("body : " + JSON.stringify(req.body) );
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(200).json(contact);
});

//@desc Get contact
//@route GET api/contacts/id
//@access private
const getContact = asyncHandler(async (req, res) => {
    
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(req.user.id !== contact.user_id.toString()){
        res.status(403);
        throw new Error("User don't have permission to read the contact");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT api/contacts/id
//@access private
const putContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(req.user.id !== contact.user_id.toString()){
        res.status(403);
        throw new Error("User don't have permission to update the contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact);
});

//@desc Detele contact
//@route DELETE api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
   
    if(req.user.id !== contact.user_id.toString()){
        res.status(403);
        throw new Error("User don't have permission to delete the contact");
    }

    await Contact.deleteOne({ "_id" : req.params.id });
    res.status(200).json(contact);
});
module.exports = { getContacts, getContact, createContact, getContact, putContact, deleteContact };  