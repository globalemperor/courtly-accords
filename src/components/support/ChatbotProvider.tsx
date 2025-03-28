
import React from "react";
import { Chatbot } from "./Chatbot";
import { useAuth } from "@/context/AuthContext";

export const ChatbotProvider = () => {
  const { isAuthenticated } = useAuth();
  
  // Only show chatbot for authenticated users
  if (!isAuthenticated) return null;
  
  return <Chatbot />;
};
