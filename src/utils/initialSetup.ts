
import { User, Case } from '@/types';
import emptyUsers from '@/data/empty_users.json';
import emptyCases from '@/data/empty_cases.json';

// Function to create and save test data if needed
export const setupTestEnvironment = () => {
  // Always use our customized empty data as the base setup
  console.log("Setting up environment with empty data structure");
  
  // Store users by role in local storage
  const clientUsers: User[] = [];
  const lawyerUsers: User[] = [];
  const judgeUsers: User[] = [];
  const clerkUsers: User[] = [];
  
  localStorage.setItem('courtwise_users_clients', JSON.stringify(clientUsers));
  localStorage.setItem('courtwise_users_lawyers', JSON.stringify(lawyerUsers));
  localStorage.setItem('courtwise_users_judges', JSON.stringify(judgeUsers));
  localStorage.setItem('courtwise_users_clerks', JSON.stringify(clerkUsers));
  
  // Store empty cases
  localStorage.setItem('courtwise_cases', JSON.stringify(emptyCases as unknown as Case[]));
  
  // Set up other empty data collections
  localStorage.setItem('courtwise_messages', JSON.stringify([]));
  localStorage.setItem('courtwise_hearings', JSON.stringify([]));
  localStorage.setItem('courtwise_evidence', JSON.stringify([]));
  localStorage.setItem('courtwise_case_requests', JSON.stringify([]));
};

export default setupTestEnvironment;
