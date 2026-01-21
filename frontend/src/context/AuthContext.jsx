import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage when app refreshes
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Login function
    const loginUser = (data) => {
        const loggedUser = {
            id: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token
        };

        setUser(loggedUser);

        // Save full user object
        localStorage.setItem("user", JSON.stringify(loggedUser));

        // Save raw token for API calls
        localStorage.setItem("token", data.token);
    };


    // Logout function
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };


    return ( <
        AuthContext.Provider value = {
            { user, loginUser, logoutUser }
        } > { children } <
        /AuthContext.Provider>
    );
};