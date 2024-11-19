import { useEffect, useState } from "react";
import { requestFCMToken, onMessageListener } from "../utils/firebaseUtils";
import { ToastContainer } from "react-bootstrap";
import { toast} from "react-toastify";
function UserToken() {
    const [fcmToken, setFcmToken] = useState(null);
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        const fetchFCMToken = async () => {
            try {
                const token = await requestFCMToken();
                setFcmToken(token);
                console.log('Token set:', token);
            } catch (err) {
                console.error("Error getting FCM token", err);
            } finally {
                setLoading(false);  // Ensure loading state is set to false after token retrieval
            }
        };

        fetchFCMToken();
    }, []);  // The empty dependency array ensures this effect runs only once when the component mounts
    onMessageListener().then(payload=>{
        toast(
            <div>
                <strong>{payload.notification.title}</strong>
                <strong>{payload.notification.body}</strong>

            </div>,{position:"top-right"}
        );
        console.log("Received foreground message",payload);
    }).catch(err=> console.error("error: ",err));
    
    return (
        <>        
        <ToastContainer/>
        <div className="container firebase-form p-4">
            <div className="row">
                {fcmToken && (
                    <div className="col-md-12 mb-4">
                        <strong>FCM Token:</strong> {fcmToken}
                    </div>
                )}
                {!fcmToken && !loading && (
                    <div className="col-md-12 mb-4">
                        <p>No token available.</p>
                    </div>
                )}
                {loading && (
                    <div className="col-md-12 mb-4">
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default UserToken;
