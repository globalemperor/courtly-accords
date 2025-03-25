
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import clerksData from '@/data/users_clerks.json';
import clientsData from '@/data/users_clients.json';
import lawyersData from '@/data/users_lawyers.json';
import judgesData from '@/data/users_judges.json';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get all users from localStorage with JSON fallback
const getAllUsers = () => {
  const typedClerksData = JSON.parse(localStorage.getItem('courtwise_users_clerks') || '[]').map((clerk: any) => ({
    ...clerk,
    role: clerk.role as UserRole
  }));

  const typedClientsData = JSON.parse(localStorage.getItem('courtwise_users_clients') || '[]').map((client: any) => ({
    ...client,
    role: client.role as UserRole
  }));

  const typedLawyersData = JSON.parse(localStorage.getItem('courtwise_users_lawyers') || '[]').map((lawyer: any) => ({
    ...lawyer,
    role: lawyer.role as UserRole
  }));

  const typedJudgesData = JSON.parse(localStorage.getItem('courtwise_users_judges') || '[]').map((judge: any) => ({
    ...judge,
    role: judge.role as UserRole
  }));

  return [
    ...typedClerksData, 
    ...typedClientsData, 
    ...typedLawyersData, 
    ...typedJudgesData
  ];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const storedSession = localStorage.getItem('courtwise_session');
      
      if (storedSession) {
        try {
          const session = JSON.parse(storedSession);
          const storedUserData = localStorage.getItem('courtwise_user');
          
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUser(userData);
            console.log("User restored from local storage:", userData.email);
          } else {
            const allUsers = getAllUsers();
            const userFromJson = allUsers.find(u => u.id === session.user.id);
            
            if (userFromJson) {
              setUser(userFromJson);
              localStorage.setItem('courtwise_user', JSON.stringify(userFromJson));
              console.log("User found in all users:", userFromJson.email);
            }
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('courtwise_session');
          localStorage.removeItem('courtwise_user');
        }
      } else {
        console.log("No stored session found");
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Login attempt for:", email);
      const allUsers = getAllUsers();
      console.log("All users count:", allUsers.length);
      
      const user = allUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        console.log("User not found or password incorrect");
        return { error: { message: "Invalid login credentials" } };
      }
      
      console.log("User found, creating session for:", user.email);
      const session = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        },
        access_token: `mock_token_${Date.now()}`
      };
      
      localStorage.setItem('courtwise_session', JSON.stringify(session));
      localStorage.setItem('courtwise_user', JSON.stringify(user));
      
      setUser(user);
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { error };
    }
  };

  const signup = async (email: string, password: string, userData: Partial<User>) => {
    try {
      console.log("Signup attempt for:", email, "with role:", userData.role);
      const allUsers = getAllUsers();
      const existingUser = allUsers.find(u => u.email === email);
      
      if (existingUser) {
        console.log("Email already in use");
        return { error: { message: "Email already in use" } };
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        password,
        name: userData.name || email.split('@')[0],
        role: userData.role || 'client',
        avatarUrl: userData.avatarUrl || `https://ui-avatars.com/api/?name=${userData.name || email.split('@')[0]}&background=random`,
      };
      
      // Add role-specific fields
      if (userData.role === 'lawyer') {
        const lawyerData = userData as any;
        if (lawyerData.specialization) (newUser as any).specialization = lawyerData.specialization;
        if (lawyerData.barId) (newUser as any).barId = lawyerData.barId;
        if (lawyerData.yearsOfExperience) (newUser as any).yearsOfExperience = lawyerData.yearsOfExperience;
      } else if (userData.role === 'clerk') {
        const clerkData = userData as any;
        if (clerkData.courtId) (newUser as any).courtId = clerkData.courtId;
        if (clerkData.department) (newUser as any).department = clerkData.department;
      } else if (userData.role === 'judge') {
        const judgeData = userData as any;
        if (judgeData.chamberNumber) (newUser as any).chamberNumber = judgeData.chamberNumber;
        if (judgeData.courtDistrict) (newUser as any).courtDistrict = judgeData.courtDistrict;
        if (judgeData.yearsOnBench) (newUser as any).yearsOnBench = judgeData.yearsOnBench;
      }
      
      // Save to role-specific storage
      const existingUsersKey = `courtwise_users_${newUser.role}s`;
      console.log("Saving user to:", existingUsersKey);
      const existingUsers = JSON.parse(localStorage.getItem(existingUsersKey) || '[]');
      existingUsers.push(newUser);
      localStorage.setItem(existingUsersKey, JSON.stringify(existingUsers));
      
      // Create session
      const session = {
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          name: newUser.name
        },
        access_token: `mock_token_${Date.now()}`
      };
      
      localStorage.setItem('courtwise_session', JSON.stringify(session));
      localStorage.setItem('courtwise_user', JSON.stringify(newUser));
      
      setUser(newUser);
      console.log("User successfully created:", newUser.email);
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('courtwise_session');
      localStorage.removeItem('courtwise_user');
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('courtwise_user', JSON.stringify(userData));
    
    const usersKey = `courtwise_users_${userData.role}s`;
    try {
      const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
      const updatedUsers = users.map((u: User) => 
        u.id === userData.id ? userData : u
      );
      localStorage.setItem(usersKey, JSON.stringify(updatedUsers));
      console.log("User updated in storage:", userData.email);
    } catch (error) {
      console.error(`Error updating user in ${usersKey}:`, error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateUser
      }}
    >
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
