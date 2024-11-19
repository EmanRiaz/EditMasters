import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
   const[isLoading,setIsLoading]=useState(true);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedIn ", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        if (!token) {
            // If there is no token, skip fetching user data
            console.log("No token available. User is not authenticated.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            } else {
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [authorizationToken]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken,isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};