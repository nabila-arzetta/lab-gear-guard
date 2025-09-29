import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, dummyUsers } from '@/data/dummy';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  getUserLab: () => number | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // For demo purposes, start with user logged in to show lab selection
  const [user, setUser] = useState<User | null>(dummyUsers[4]);

  const login = (email: string, password: string): boolean => {
    // Simple demo login - find user by email
    const foundUser = dummyUsers.find(u => u.email === email);
    if (foundUser && foundUser.status === 'aktif') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const getUserLab = (): number | undefined => {
    return user?.lab_id;
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    getUserLab,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};