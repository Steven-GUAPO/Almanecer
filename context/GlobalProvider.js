import React, { createContext, useContext, useEffect, useState } from "react";

import { getFromSecureStore } from "../backend/secureCache";
import {CACHE_ID_KEY} from "@env"
import { ssoLoginById } from "../backend/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await getFromSecureStore(CACHE_ID_KEY); // Get stored user ID
        if (userId) {
          const userData = await ssoLoginById(userId); // Fetch user object
          if (userData) {
            setIsLogged(true);
            setUser(userData);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
