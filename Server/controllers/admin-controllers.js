const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get single user by ID
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }, { password: 0 });
        
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

//user update Logic

const updateUserById=async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedUserData=req.body;
        const updateUserData=req.body;
        const updatedData=await User.updateOne(
            {_id:id},
            {
                $set:updateUserData,
            }
        );
     return res.status(200).json(updatedData);
    }catch(error){
        next (error);
    }
}











// Delete user by ID
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all contacts
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById ,updateUserById};
