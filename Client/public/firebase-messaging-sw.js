importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAV0balpFd_fGqbXoaw3usk-CYfjYf6kH4",
  authDomain: "push-notifications-52997.firebaseapp.com",
  projectId: "push-notifications-52997",
  storageBucket: "push-notifications-52997.appspot.com",
  messagingSenderId: "621833012207",
  appId: "1:621833012207:web:70c57197cbda780f02ec1a",
  measurementId: "G-Q7Z4X0VVYT"
}; 
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);
});
