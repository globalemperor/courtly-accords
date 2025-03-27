
import { User, Case } from '@/types';
import emptyUsers from '@/data/empty_users.json';
import emptyCases from '@/data/empty_cases.json';

// Function to create and save test data if needed
export const setupTestEnvironment = () => {
  // Always use our customized empty data as the base setup
  console.log("Setting up environment with basic sample data");
  
  // Store users by role in local storage
  const clientUsers = emptyUsers.filter(user => user.role === 'client');
  const lawyerUsers = emptyUsers.filter(user => user.role === 'lawyer');
  const judgeUsers = emptyUsers.filter(user => user.role === 'judge');
  const clerkUsers = emptyUsers.filter(user => user.role === 'clerk');
  
  localStorage.setItem('courtwise_users_clients', JSON.stringify(clientUsers));
  localStorage.setItem('courtwise_users_lawyers', JSON.stringify(lawyerUsers));
  localStorage.setItem('courtwise_users_judges', JSON.stringify(judgeUsers));
  localStorage.setItem('courtwise_users_clerks', JSON.stringify(clerkUsers));
  
  // Store cases - use as Case[] type to ensure TypeScript compatibility
  localStorage.setItem('courtwise_cases', JSON.stringify(emptyCases as unknown as Case[]));
};

export default setupTestEnvironment;
