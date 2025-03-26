
import { User, Case } from '@/types';
import emptyUsers from '@/data/empty_users.json';
import emptyCases from '@/data/empty_cases.json';

// Test user accounts for easier testing
const testUsers = {
  client: {
    id: "test-client-1",
    email: "client@test.com",
    password: "password123", // In a real app, this would be hashed
    name: "Test Client",
    role: "client",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  lawyer: {
    id: "test-lawyer-1",
    email: "lawyer@test.com",
    password: "password123", // In a real app, this would be hashed
    name: "Test Lawyer",
    role: "lawyer",
    specialization: "Family Law",
    barNumber: "BN12345",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  judge: {
    id: "test-judge-1",
    email: "judge@test.com",
    password: "password123", // In a real app, this would be hashed
    name: "Test Judge",
    role: "judge",
    courtroom: "Courtroom A",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  clerk: {
    id: "test-clerk-1",
    email: "clerk@test.com",
    password: "password123", // In a real app, this would be hashed
    name: "Test Clerk",
    role: "clerk",
    department: "Civil Cases",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
};

// Function to create and save test data if needed
export const setupTestEnvironment = () => {
  // Check if data already exists in localStorage
  const clientsExist = localStorage.getItem('courtwise_users_clients');
  const lawyersExist = localStorage.getItem('courtwise_users_lawyers');
  const judgesExist = localStorage.getItem('courtwise_users_judges');
  const clerksExist = localStorage.getItem('courtwise_users_clerks');
  const casesExist = localStorage.getItem('courtwise_cases');
  
  // If any data doesn't exist, initialize with empty arrays and add test users
  if (!clientsExist) {
    console.log("Setting up client users storage with test account");
    localStorage.setItem('courtwise_users_clients', JSON.stringify([testUsers.client]));
  }
  
  if (!lawyersExist) {
    console.log("Setting up lawyer users storage with test account");
    localStorage.setItem('courtwise_users_lawyers', JSON.stringify([testUsers.lawyer]));
  }
  
  if (!judgesExist) {
    console.log("Setting up judge users storage with test account");
    localStorage.setItem('courtwise_users_judges', JSON.stringify([testUsers.judge]));
  }
  
  if (!clerksExist) {
    console.log("Setting up clerk users storage with test account");
    localStorage.setItem('courtwise_users_clerks', JSON.stringify([testUsers.clerk]));
  }
  
  if (!casesExist) {
    console.log("Setting up empty cases storage");
    localStorage.setItem('courtwise_cases', JSON.stringify([]));
  }
  
  // Initialize other collections if they don't exist
  if (!localStorage.getItem('courtwise_messages')) {
    localStorage.setItem('courtwise_messages', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('courtwise_hearings')) {
    localStorage.setItem('courtwise_hearings', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('courtwise_evidence')) {
    localStorage.setItem('courtwise_evidence', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('courtwise_case_requests')) {
    localStorage.setItem('courtwise_case_requests', JSON.stringify([]));
  }
  
  // Set initialized flag
  if (!localStorage.getItem('courtwise_initialized')) {
    localStorage.setItem('courtwise_initialized', 'true');
    
    // Log test account information for the user
    console.log("Test accounts have been created for testing:");
    console.log("- Client: client@test.com / password123");
    console.log("- Lawyer: lawyer@test.com / password123");
    console.log("- Judge: judge@test.com / password123");
    console.log("- Clerk: clerk@test.com / password123");
  }
};

export default setupTestEnvironment;
