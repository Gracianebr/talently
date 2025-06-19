
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  type: 'candidate' | 'company';
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados temporários para teste
const TEMP_USERS = [
  {
    email: 'cianecps@yahoo.com.br',
    password: '12345678',
    name: 'Ciane',
    type: 'candidate' as const,
    profile: {
      fullName: 'Ciane Santos',
      city: 'São Paulo',
      state: 'SP',
      linkedin: '',
      education: 'Superior Completo',
      experiences: [],
      hasCompletedDISC: false,
      hasCompletedCultural: false,
      discResults: null,
      culturalResults: null
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('talently_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = TEMP_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        email: foundUser.email,
        name: foundUser.name,
        type: foundUser.type,
        profile: foundUser.profile
      };
      
      setUser(userData);
      localStorage.setItem('talently_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('talently_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
