import { createContext, useState, useContext } from "react";
import { loginUser, registerUser, logoutUser } from '../services/authService';
import { secureStorage } from '../utils/secureStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = secureStorage.getItem("user_data");
        
        if (storedUser) {
            try {
                // secureStorage already returns parsed data
                return storedUser;
            } catch (error) {
                console.error("Failed to load user data:", error);
                secureStorage.removeItem("user_data");
                return null;
            }
        }
        return null;
    });

    // REGISTER FUNCTION
    const register = async (formData) => {
        try {
            const data = await registerUser(formData); 
            
            const userPublicData = {
                _id: data._id, 
                name: data.name, 
                email: data.email, 
                role: data.role
            };

            if (data.token) {
                secureStorage.setItem("userToken", data.token);
            }
            
            setUser(userPublicData);
            secureStorage.setItem("user_data", userPublicData);
            
            return { success: true, user: userPublicData }; 

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed";
            return { success: false, message: errorMessage };
        }
    };

    // LOGIN FUNCTION
    const login = async (formData) => {
        try {
            const data = await loginUser(formData);

            const userPublicData = {
                _id: data._id, 
                name: data.name, 
                email: data.email, 
                role: data.role
            };

            if (data.token) {
                secureStorage.setItem("userToken", data.token);
            } else {
                console.warn("No token in login response!");
            }

            setUser(userPublicData);
            secureStorage.setItem("user_data", userPublicData);

            return { success: true, user: userPublicData }; 

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed";
            return { success: false, message: errorMessage };
        }
    };
    
    // LOGOUT FUNCTION
    const logout = async () => { 
        try {
            await logoutUser(); 
        } catch (error) {
            console.error("Logout (cookie clearing) failed:", error); 
        }

        setUser(null);
        secureStorage.removeItem("user_data");
        secureStorage.removeItem("userToken");
        secureStorage.removeItem("adminToken"); 
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); 
};

export default AuthContext;