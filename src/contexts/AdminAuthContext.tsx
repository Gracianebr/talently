import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated admin login
    if (email === 'contato@talently.com.br' && password === '12345678@') {
      const user: AdminUser = {
        id: 'admin-1',
        email: 'contato@talently.com.br',
        name: 'Administrador Talently',
        role: 'admin'
      };
      
      setAdminUser(user);
      localStorage.setItem('adminUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  const isAuthenticated = !!adminUser;

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};