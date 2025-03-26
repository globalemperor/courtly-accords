
import { User, Case } from '@/types';
import emptyUsers from '@/data/empty_users.json';
import emptyCases from '@/data/empty_cases.json';

// Function to create and save test data if needed
export const setupTestEnvironment = () => {
  // Check if data already exists in localStorage
  const clientsExist = localStorage.getItem('courtwise_users_clients');
  const lawyersExist = localStorage.getItem('courtwise_users_lawyers');
  const judgesExist = localStorage.getItem('courtwise_users_judges');
  const clerksExist = localStorage.getItem('courtwise_users_clerks');
  const casesExist = localStorage.getItem('courtwise_cases');
  
  // If any data doesn't exist, initialize with empty arrays
  if (!clientsExist) {
    console.log("Setting up empty client users storage");
    localStorage.setItem('courtwise_users_clients', JSON.stringify([]));
  }
  
  if (!lawyersExist) {
    console.log("Setting up empty lawyer users storage");
    localStorage.setItem('courtwise_users_lawyers', JSON.stringify([]));
  }
  
  if (!judgesExist) {
    console.log("Setting up empty judge users storage");
    localStorage.setItem('courtwise_users_judges', JSON.stringify([]));
  }
  
  if (!clerksExist) {
    console.log("Setting up empty clerk users storage");
    localStorage.setItem('courtwise_users_clerks', JSON.stringify([]));
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
  }
};

export default setupTestEnvironment;
