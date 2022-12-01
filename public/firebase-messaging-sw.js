// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCdzG9XPg685lx66h6FMJEuhp-y4VP_MyA",
    authDomain: "smmash-874ba.firebaseapp.com",
    projectId: "smmash-874ba",
    storageBucket: "smmash-874ba.appspot.com",
    messagingSenderId: "983154074192",
    appId: "1:983154074192:web:5b673fbfb7fddd399aa755",
    measurementId: "G-RMG1T2GLW7"
};


firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.info(payload)
});


self.addEventListener('notificationclick', function (event) {
    // do what you want
    //OK
    // ...
});
