const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
require('dotenv').config();

//No need of model for login part
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Secure the password with bcrypt by using pre method
userSchema.pre('save', async function (next) {
    const user = this;
    
    if (!user.isModified("password")) {
      return next();
    }
    
    try {
      // Hash the password
      const saltRound = 10;
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
      next();
    } catch (error) {
      next(error);
    }
  });
  //compare the password
  userSchema.methods.comparePassword=async function (password){
    return bcrypt.compare(password,this.password);
  }
  //jsonweb token 
  userSchema.methods.generateToken=async function(){  //instance method 
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },process.env.JWT_SECRET_KEY,{
            expiresIn:"3d",
        }
    );
    }catch(error){
        console.error(error);
    }
  };



// define the model or the collection name
 const User = new mongoose.model("User", userSchema);
module.exports=User;