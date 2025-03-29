
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle, X, Send, Minimize, Maximize, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your CourtWise assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Greeting responses
  const greetingResponses = [
    "Hi there! How can I assist you with CourtWise today?",
    "Hello! What can I help you with?",
    "Hey! I'm here to help with any questions about CourtWise.",
    "Hi! How can I make your CourtWise experience better today?"
  ];

  // Questions about the assistant
  const aboutBotResponses = [
    "I'm the CourtWise AI assistant, here to help with any questions you have about using the platform.",
    "I'm an AI designed to help CourtWise users navigate the platform and answer common questions."
  ];

  // Thank you responses
  const thankYouResponses = [
    "You're welcome! Is there anything else I can help with?",
    "Happy to help! Let me know if you need anything else.",
    "My pleasure! Do you have any other questions about CourtWise?"
  ];

  // Predefined answers based on keywords
  const predefinedAnswers: Record<string, string[]> = {
    "create account": [
      "To create an account, click on the 'Get Started' or 'Sign Up' button on the homepage. Select your user role (client, lawyer, clerk, or judge), provide your email address, create a password, and fill in your personal/professional information. You'll need to verify your email address to complete the registration process.",
      "Creating an account is simple! Go to our homepage and click 'Sign Up'. Choose your role, enter your details, and verify your email. Need more help with a specific part of the process?"
    ],
    "password": [
      "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password. For security reasons, passwords must be at least 8 characters long and include a combination of letters, numbers, and symbols.",
      "Password issues? Click 'Forgot Password' on the login screen to reset it. Make sure your new password is at least 8 characters with letters, numbers, and symbols for security."
    ],
    "login issues": [
      "If you're having trouble logging in, first ensure you're using the correct email address and password. Check if Caps Lock is enabled. You can use the 'Forgot Password' link on the login page to reset your password. If you continue to experience issues, clear your browser cache and cookies, or try using a different browser.",
      "Login problems can be frustrating. First, verify your email and password are correct and check your Caps Lock. The 'Forgot Password' link can help you reset. Still having trouble? Try clearing your browser cache or using a different browser."
    ],
    "security": [
      "CourtWise takes data security very seriously. We implement enterprise-grade encryption, secure authentication protocols, and regular security audits. All data is encrypted both in transit and at rest, and we comply with legal data protection standards including GDPR and other relevant regulations.",
      "Your data security is our top priority! We use enterprise-grade encryption, maintain strict access controls, and comply with all relevant data protection regulations. All communications and stored information are fully encrypted."
    ],
    "contact": [
      "For urgent support, you can contact our team directly at support@courtwise.com or call our support line at (555) 123-4567 during business hours (9 AM - 5 PM EST, Monday to Friday).",
      "Need to reach our team directly? Email us at support@courtwise.com or call (555) 123-4567 between 9 AM and 5 PM EST, Monday through Friday."
    ],
    "document upload": [
      "To upload documents, navigate to the relevant case in your dashboard, then click the 'Documents' tab. You can drag and drop files or click 'Upload Documents' to browse your files. We support PDF, DOCX, JPG, and PNG formats with a maximum file size of 25MB per document.",
      "For document uploads, go to your case page, select the 'Documents' tab, and use the upload button or drag-and-drop. We support PDF, DOCX, JPG, and PNG files up to 25MB each."
    ],
    "hearing": [
      "Court hearing schedules can be viewed in the 'Hearings' section of your dashboard. You can filter by upcoming hearings, past hearings, or search for specific dates. Calendar invitations can be downloaded and notifications can be configured in your profile settings.",
      "Find all your hearing information in the 'Hearings' tab on your dashboard. You can filter, search, and set up notifications for upcoming events. Need to add a hearing to your calendar? Just click the download button next to any hearing."
    ],
  };

  // Random response picker
  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    // Focus input when chat opens
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const generateResponse = (message: string) => {
    setIsTyping(true);
    
    // Convert input to lowercase for better matching
    const messageLower = message.toLowerCase();
    
    // Simulate a delay for a more natural conversation flow
    setTimeout(() => {
      let response = "I don't have specific information about that yet. Would you like me to connect you with a support agent for more help?";
      
      // Check for greetings
      if (/^(hi|hello|hey|greetings|howdy|hi there)/i.test(messageLower)) {
        response = getRandomResponse(greetingResponses);
      }
      // Check for questions about the bot
      else if (/who (are|r) you|what (are|r) you|tell me about you/i.test(messageLower)) {
        response = getRandomResponse(aboutBotResponses);
      }
      // Check for thank you messages
      else if (/thank you|thanks|thx|ty/i.test(messageLower)) {
        response = getRandomResponse(thankYouResponses);
      }
      // Check for keyword matches
      else {
        for (const [keyword, answers] of Object.entries(predefinedAnswers)) {
          if (messageLower.includes(keyword.toLowerCase())) {
            response = getRandomResponse(answers);
            break;
          }
        }
      }
      
      // Add bot response to messages
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          content: response,
          sender: "bot",
          timestamp: new Date(),
        }
      ]);
      
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Generate response
    generateResponse(inputValue);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-court-blue hover:bg-court-blue-dark shadow-lg flex items-center justify-center"
          aria-label="Open support chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className={cn(
          "w-80 md:w-96 shadow-xl transition-all duration-300 transform",
          isMinimized ? "h-14" : "h-[500px]"
        )}>
          <CardHeader className="p-3 bg-court-blue text-white flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm font-medium">CourtWise Assistant</CardTitle>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-court-blue-dark rounded-full"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-white hover:bg-court-blue-dark rounded-full"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-3 h-[390px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-lg p-3",
                        message.sender === "user"
                          ? "bg-court-blue text-white ml-auto"
                          : "bg-gray-100 text-gray-900"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex space-x-1 bg-gray-100 text-gray-900 max-w-[80%] rounded-lg p-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isTyping || !inputValue.trim()}
                    className="bg-court-blue hover:bg-court-blue-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};
