// *----------------------
//* Controllers
// *----------------------

//? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

// *-------------------
// Home Logic
// *-------------------

const User=require("../models/user-model")

const bcrypt=require("bcrypt")
const axios = require('axios');
const jwt = require('jsonwebtoken');
const home=async(req,res)=>{
    try{
        res.status(200)
        .send("using controllers");
    }catch(error){
        console.log(error);
    }
};

//register logic
const register=async(req,res,next)=>{
    try{
        console.log(req.body);
       const{username,email,phone,password}=req.body; 
       const userExist=await User.findOne({email:email});  //when use findOne method always use await
       if(userExist){
        return res.status(400).json({message:"email already exists"})
       }
       const userCreated=await User.create({username,email,phone,password});
        res.status(201)
        .json({msg:"registration successful",token:await userCreated.generateToken(),
            userId:userCreated._id.toString(),
        });
        /*
        in most cases,converting id to a string is agood practice 
        bcz it ensures consistency and compatibility across 
        different jwt libraries and systems.It aligns with the 
        expectation that claims in a jwt are represented as 
        strings.*/
        
    }catch(error){ 
       res.status(500).json("internal server error");
      next(error);
    }
};



//login logic
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      console.log(userExist);
      if (!userExist) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      //const user = await bcrypt.compare(password, userExist.password);
      const user=await userExist.comparePassword(password);
      if (user) {
        res.status(200).json({
          msg: "Login successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };
  
  //in contact to send user data-user Logic
  const user=async(req,res)=>{
    try{
      const userData=req.user;
      console.log(userData);
      return res.status(200).json({userData});
     
    }catch(error){
      console.log('error from the user route ${error}');
    }
  };

module.exports={home,register,login,user};







