const express=require("express");
const {sendFirebaseNotification,sendMultipleFirebaseNotification} = require('../controllers/firebase-controller');

const router=express.Router();
router.post("/send-notification",async(req,res)=>{
    const result=await sendFirebaseNotification(req,res);
    return res.send(result);
})


router.post("/send-multiple-notifications",async(req,res)=>{
    const result=await sendMultipleFirebaseNotification(req,res);
    return res.send(result);
})
module.exports=router;