import { initializeApp } from "firebase/app";
import { getMessaging, getToken,onMessage } from "firebase/messaging";
import { toast } from 'react-toastify';

const firebaseConfig = {
    apiKey: "AIzaSyAV0balpFd_fGqbXoaw3usk-CYfjYf6kH4",
    authDomain: "push-notifications-52997.firebaseapp.com",
    projectId: "push-notifications-52997",
    storageBucket: "push-notifications-52997.appspot.com",
    messagingSenderId: "621833012207",
    appId: "1:621833012207:web:70c57197cbda780f02ec1a",
    measurementId: "G-Q7Z4X0VVYT"
  };
      
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission status:', permission);

        if (permission === "granted") {
            const vapidKey = "BJczRvX8MH4LXiHPP5HHpxKowXrYDzkIG5dRsibvn3Tn-553Y1fipvoxQRxL1zgtPF8ZbibFWWCr8e_ORMkDvq4";

            const token = await getToken(messaging, { vapidKey });
            console.log('FCM token:', token);
            return token;
        } else if (permission === "denied") {
            throw new Error("Notifications permission denied by the user.");
        } else {
            throw new Error("Notifications permission status is unknown.");
        }
    } catch (err) {
        console.error("Error getting FCM token:", err);
        throw err;
    }
};


export const onMessageListener=()=>{
   return  new Promise((resolve)=>{
    onMessage(messaging,(payload)=>{
        resolve(payload);
    })
    })
}