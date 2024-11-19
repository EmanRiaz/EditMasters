import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import axios from 'axios'; // Import axios
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

const AdminToken = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [fcmToken, setFcmToken] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handlePushNotification = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                title: title,
                body: body,
                deviceToken: fcmToken
            };
            
            const result = await axios.post("http://localhost:5000/api/firebase/send-notification", data);
            console.log(result);

            if (result.status === 200) {
                toast.success(
                    <div>
                        <div>Notification sent successfully</div>
                    </div>,
                    { position: "top-right" }
                );
            } else {
                toast.error(
                    <div>
                        <div>Failed to send Notification</div>
                    </div>,
                    { position: "top-right" }
                );
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error(
                <div>
                    <div>Failed to send Notification. Please try again.</div>
                </div>,
                { position: "top-right" }
            );
        } finally {
            setLoading(false);
        }
    };

return (
    <>
        <ToastContainer />
        <div className="admin-token-form">
            <h1>Firebase Push Notification</h1>
            <form onSubmit={handlePushNotification}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title"
                    />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input
                        type="text"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter Body"
                    />
                </div>
                <div>
                    <label htmlFor="fcmToken">FCM Token</label>
                    <input
                        type="text"
                        name="fcmToken"
                        value={fcmToken}
                        onChange={(e) => setFcmToken(e.target.value)}
                        placeholder="Enter FCM Token"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    </>
);
}
export default AdminToken;