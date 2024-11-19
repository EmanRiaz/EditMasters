
var admin = require("firebase-admin");

try {
    var serviceAccount = require("./firebaseAdminSDK.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
}

module.exports = admin;
