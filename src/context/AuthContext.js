import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);

  const login = (username) => {
    setUser ({ username });
  };

  const logout = () => {
    setUser (null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// LogoutButton component (move this outside of AuthProvider)
export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally, you can redirect the user after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};