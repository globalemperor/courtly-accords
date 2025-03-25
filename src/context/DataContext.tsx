
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Case, CaseStatus, Evidence, Hearing, Message, ReschedulingRecord, User } from '@/types';

// Import empty data for clean start
import emptyCases from '@/data/empty_cases.json';
import { setupTestEnvironment } from '@/utils/initialSetup';

// Define the context type
export type DataContextType = {
  cases: Case[];
  users: User[];
  messages: Message[];
  hearings: Hearing[];
  evidence: Evidence[];
  getCaseById: (id: string) => Case | undefined;
  getUserById: (id: string) => User | undefined;
  getMessagesByCaseId: (caseId: string) => Message[];
  getHearingsByCaseId: (caseId: string) => Hearing[];
  getEvidenceByCaseId: (caseId: string) => Evidence[];
  updateCase: (id: string, updates: Partial<Case>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  addMessage: (message: Message) => void;
  addHearing: (hearing: Hearing) => void;
  addEvidence: (evidence: Evidence) => void;
  getClientsByLawyerId: (lawyerId: string) => User[];
  getLawyersByClientId: (clientId: string) => User[];
  sendCaseRequest: (clientId: string, lawyerId: string, caseTitle: string, description: string) => void;
  getLawyerCaseRequests: (lawyerId: string) => any[];
  acceptCaseRequest: (requestId: string) => void;
  rejectCaseRequest: (requestId: string) => void;
  addReschedulingHistory: (hearingId: string, record: ReschedulingRecord) => void;
  // Add missing functions
  getUsersByRole: (role: string) => User[];
  sendMessage: (message: Partial<Message>) => void;
  getCasesByUser: (userId: string, role: string) => Case[];
  updateHearing: (hearingId: string, updates: Partial<Hearing>) => void;
  createCase: (caseData: Partial<Case>) => Case;
  createCaseRequest: (requestData: any) => void;
};

// Create the context
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Create the provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Initialize with empty data
  const [cases, setCases] = useState<Case[]>(() => {
    const storedCases = localStorage.getItem('courtwise_cases');
    return storedCases ? JSON.parse(storedCases) : (emptyCases as unknown as Case[]);
  });
  
  const [users, setUsers] = useState<User[]>(() => {
    const clientUsers = JSON.parse(localStorage.getItem('courtwise_users_clients') || '[]');
    const lawyerUsers = JSON.parse(localStorage.getItem('courtwise_users_lawyers') || '[]');
    const judgeUsers = JSON.parse(localStorage.getItem('courtwise_users_judges') || '[]');
    const clerkUsers = JSON.parse(localStorage.getItem('courtwise_users_clerks') || '[]');
    return [...clientUsers, ...lawyerUsers, ...judgeUsers, ...clerkUsers];
  });
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem('courtwise_messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  
  const [hearings, setHearings] = useState<Hearing[]>(() => {
    const storedHearings = localStorage.getItem('courtwise_hearings');
    return storedHearings ? JSON.parse(storedHearings) : [];
  });
  
  const [evidence, setEvidence] = useState<Evidence[]>(() => {
    const storedEvidence = localStorage.getItem('courtwise_evidence');
    return storedEvidence ? JSON.parse(storedEvidence) : [];
  });
  
  const [caseRequests, setCaseRequests] = useState<any[]>(() => {
    const storedCaseRequests = localStorage.getItem('courtwise_case_requests');
    return storedCaseRequests ? JSON.parse(storedCaseRequests) : [];
  });

  // Initialize app with empty data structure if needed
  useEffect(() => {
    // Check if this is the first time loading the app
    const isFirstLoad = !localStorage.getItem('courtwise_initialized');
    
    if (isFirstLoad) {
      console.log("First time loading the app - setting up initial data structure");
      setupTestEnvironment();
      localStorage.setItem('courtwise_initialized', 'true');
      
      // Reload the data after initialization
      const clientUsers = JSON.parse(localStorage.getItem('courtwise_users_clients') || '[]');
      const lawyerUsers = JSON.parse(localStorage.getItem('courtwise_users_lawyers') || '[]');
      const judgeUsers = JSON.parse(localStorage.getItem('courtwise_users_judges') || '[]');
      const clerkUsers = JSON.parse(localStorage.getItem('courtwise_users_clerks') || '[]');
      
      setUsers([...clientUsers, ...lawyerUsers, ...judgeUsers, ...clerkUsers]);
      
      const storedCases = localStorage.getItem('courtwise_cases');
      setCases(storedCases ? JSON.parse(storedCases) : []);
    }
  }, []);

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('courtwise_cases', JSON.stringify(cases));
  }, [cases]);
  
  useEffect(() => {
    localStorage.setItem('courtwise_messages', JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    localStorage.setItem('courtwise_hearings', JSON.stringify(hearings));
  }, [hearings]);
  
  useEffect(() => {
    localStorage.setItem('courtwise_evidence', JSON.stringify(evidence));
  }, [evidence]);
  
  useEffect(() => {
    localStorage.setItem('courtwise_case_requests', JSON.stringify(caseRequests));
  }, [caseRequests]);

  // Helper functions
  const getCaseById = (id: string) => cases.find(c => c.id === id);
  
  const getUserById = (id: string) => users.find(u => u.id === id);
  
  const getMessagesByCaseId = (caseId: string) => 
    messages.filter(m => m.caseId === caseId);
  
  const getHearingsByCaseId = (caseId: string) => 
    hearings.filter(h => h.caseId === caseId);
  
  const getEvidenceByCaseId = (caseId: string) => 
    evidence.filter(e => e.caseId === caseId);
  
  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases(prevCases => 
      prevCases.map(c => 
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );
  };
  
  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => 
        u.id === id ? { ...u, ...updates } : u
      );
      
      // Also update the role-specific storage
      const role = updates.role || prevUsers.find(u => u.id === id)?.role;
      if (role) {
        const usersOfRole = updatedUsers.filter(u => u.role === role);
        localStorage.setItem(`courtwise_users_${role}s`, JSON.stringify(usersOfRole));
      }
      
      return updatedUsers;
    });
  };
  
  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };
  
  const addHearing = (hearing: Hearing) => {
    setHearings(prevHearings => [...prevHearings, hearing]);
  };
  
  const addEvidence = (evidence: Evidence) => {
    setEvidence(prevEvidence => [...prevEvidence, evidence]);
  };
  
  const getClientsByLawyerId = (lawyerId: string) => {
    // Get all cases where this lawyer is assigned
    const lawyerCases = cases.filter(c => c.lawyerId === lawyerId);
    
    // Get unique client IDs from these cases
    const clientIds = [...new Set(lawyerCases.map(c => c.clientId))];
    
    // Return client users
    return users.filter(u => clientIds.includes(u.id) && u.role === 'client');
  };
  
  const getLawyersByClientId = (clientId: string) => {
    // Get all cases for this client
    const clientCases = cases.filter(c => c.clientId === clientId);
    
    // Get unique lawyer IDs from these cases
    const lawyerIds = [...new Set(clientCases.map(c => c.lawyerId).filter(Boolean) as string[])];
    
    // Return lawyer users
    return users.filter(u => lawyerIds.includes(u.id) && u.role === 'lawyer');
  };
  
  // Case request system
  const sendCaseRequest = (clientId: string, lawyerId: string, caseTitle: string, description: string) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      clientId,
      lawyerId,
      caseTitle,
      description,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setCaseRequests(prev => [...prev, newRequest]);
  };
  
  const getLawyerCaseRequests = (lawyerId: string) => {
    return caseRequests.filter(req => req.lawyerId === lawyerId);
  };
  
  const acceptCaseRequest = (requestId: string) => {
    // Find the request
    const request = caseRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Update request status
    setCaseRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
    
    // Create a new case
    const newCase: Case = {
      id: `case-${Date.now()}`,
      title: request.caseTitle,
      description: request.description,
      caseNumber: `C-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'active',
      clientId: request.clientId,
      lawyerId: request.lawyerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filedDate: new Date().toISOString()
    };
    
    setCases(prev => [...prev, newCase]);
  };
  
  const rejectCaseRequest = (requestId: string) => {
    setCaseRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
  };

  // Add the addReschedulingHistory method
  const addReschedulingHistory = (hearingId: string, record: ReschedulingRecord) => {
    setHearings(prevHearings => 
      prevHearings.map(hearing => {
        if (hearing.id === hearingId) {
          const updatedHearing = { 
            ...hearing, 
            rescheduled: true,
            reschedulingHistory: [...(hearing.reschedulingHistory || []), record]
          };
          return updatedHearing;
        }
        return hearing;
      })
    );
  };
  
  // Add missing functions implementation
  const getUsersByRole = (role: string) => {
    return users.filter(u => u.role === role);
  };
  
  const sendMessage = (messageData: Partial<Message>) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: messageData.senderId || '',
      senderRole: messageData.senderRole || 'client',
      recipientId: messageData.recipientId || '',
      recipientRole: messageData.recipientRole || 'lawyer',
      caseId: messageData.caseId,
      content: messageData.content || '',
      read: false,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };
  
  const getCasesByUser = (userId: string, role: string) => {
    if (role === 'lawyer') {
      return cases.filter(c => c.lawyerId === userId);
    } else if (role === 'client') {
      return cases.filter(c => c.clientId === userId);
    } else if (role === 'judge') {
      // Check judgeName or judgeId
      return cases.filter(c => c.judgeName === userId || c.judgeId === userId);
    }
    return [];
  };
  
  const updateHearing = (hearingId: string, updates: Partial<Hearing>) => {
    setHearings(prevHearings =>
      prevHearings.map(h =>
        h.id === hearingId ? { ...h, ...updates } : h
      )
    );
  };
  
  const createCase = (caseData: Partial<Case>) => {
    const newCase: Case = {
      id: `case-${Date.now()}`,
      title: caseData.title || '',
      description: caseData.description || '',
      caseNumber: caseData.caseNumber || `C-${Math.floor(10000 + Math.random() * 90000)}`,
      status: caseData.status || 'pending',
      clientId: caseData.clientId || '',
      lawyerId: caseData.lawyerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filedDate: caseData.filedDate || new Date().toISOString(),
      nextHearingDate: caseData.nextHearingDate,
      courtRoom: caseData.courtRoom,
      judgeName: caseData.judgeName,
      defendantInfo: caseData.defendantInfo,
      type: caseData.type,
      judgeId: caseData.judgeId,
      parties: caseData.parties
    };
    
    setCases(prev => [...prev, newCase]);
    return newCase;
  };
  
  const createCaseRequest = (requestData: any) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setCaseRequests(prev => [...prev, newRequest]);
    return newRequest;
  };
  
  return (
    <DataContext.Provider
      value={{
        cases,
        users,
        messages,
        hearings,
        evidence,
        getCaseById,
        getUserById,
        getMessagesByCaseId,
        getHearingsByCaseId,
        getEvidenceByCaseId,
        updateCase,
        updateUser,
        addMessage,
        addHearing,
        addEvidence,
        getClientsByLawyerId,
        getLawyersByClientId,
        sendCaseRequest,
        getLawyerCaseRequests,
        acceptCaseRequest,
        rejectCaseRequest,
        addReschedulingHistory,
        // Add missing functions to context value
        getUsersByRole,
        sendMessage,
        getCasesByUser,
        updateHearing,
        createCase,
        createCaseRequest
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Create a hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
