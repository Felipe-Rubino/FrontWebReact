import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../Services/api";
export const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorLogin, setErrorLogin] = useState(null)

    useEffect(() => {
        const recoverToken = async () => {
          try {
            const loggedUser = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            const loggedUserId = localStorage.getItem("loggedUserId");
    
            if (loggedUser && token) {
              setUser({ ...loggedUser, loggedUserId });
              api.defaults.headers.Authorization = `Bearer ${token}`;
            }
    
            setLoading(false);
          } catch (error) {
            console.error("Error recovering token:", error);
            setLoading(false);
          }
        };
    
        recoverToken();
      }, []);

      useEffect(() => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }, [user]);

      const login = async (email, password) => {
        try {
          const response = await createSession(email, password);
          const token = response.data.accessToken;
          console.log(token)
          const loggedUser = {
            email: response.data.email,
            accessToken: token,
            loggedUserId: response.data.loggedUserId
          };
    
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("loggedUserId", response.data.loggedUserId);
    
          api.defaults.headers.Authorization = `Bearer ${token}`;
          setUser(loggedUser);
          navigate("/home");
          setErrorLogin("");
        } catch (error) {
          const errorMessage = tratarErroLogin(error);
          setErrorLogin(errorMessage);
        }
      };
    
      const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUserId");
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/");
      };
      return (
        <AuthContext.Provider
          value={{
            authenticated: !!user,
            user,
            loading,
            errorLogin,
            login,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}

