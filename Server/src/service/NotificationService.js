const admin = require("../util/firebase");

class NotificationService {
    static async sendNotification(deviceToken, title, body) {
        const message = {
            notification: {
                title: title,
                body: body,
            },
            token: deviceToken, // Make sure this token is being passed correctly
        };

        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (error) {
            throw error; // Error handling if sending fails
        }
    }
    static async sendMultipleNotification(deviceTokens, title, body) {
        const messages = deviceTokens.map(token=>({
            notification: {
                title,
                body
            },
            token:token
        })) 

           

        try {
            const response = await admin.messaging().sendEach(messages);
            return response;
        } catch (error) {
            throw error; // Error handling if sending fails
        }
    }
};

module.exports = NotificationService;
