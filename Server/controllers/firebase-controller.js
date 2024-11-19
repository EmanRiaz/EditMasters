const NotificationService = require('../src/service/NotificationService');

const sendFirebaseNotification=async(req,res)=>{
    try{
        const {title,body,deviceToken}=req.body;
        await NotificationService.sendNotification(deviceToken,title,body);
        res.status(200).json({message:"Notification sent successfully",success:true});
    }catch(error){
        res.status(500).json({message:"Error sending notification",success:false});
    }
}







const sendMultipleFirebaseNotification=async(req,res)=>{
    try{
        const {title,body,deviceTokens}=req.body;
        await NotificationService.sendMultipleNotification(deviceTokens,title,body);
        res.status(200).json({message:"Notification sent successfully",success:true});
    }catch(error){
        res.status(500).json({message:"Error sending notification",success:false});
    }
}












async function sendEveryMinuteNotification(){
    const title="Every Minute Notification";
    const body="Hello from body ";
    const deviceToken="fENcORelcyq3JKn6L2WyUM:APA91bG5WOrT8S9M75a2WFna6QTGsJSW12fkBNR2DhRcImQanPBo0PxljIdFKWagphJwHTEUFpcglnngRLvEYfFc_fPqvwuOIS_3qZsZ9mh6u5iXy3oDBKIFVG_oBE0zi1lInCj7rLXj";
    await NotificationService.sendNotification(title,body,deviceToken);
}
module.exports={sendFirebaseNotification,sendEveryMinuteNotification, sendMultipleFirebaseNotification};