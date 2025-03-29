
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle, X, Send, Minimize, Maximize, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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
    "file case": [
      "To file a new case as a client, go to your dashboard and click on the 'File New Case' button. Fill out the case details form including case type, description, and relevant parties. You can then upload any necessary documents to support your case. Once submitted, you'll be matched with appropriate legal counsel or your case will be assigned to the appropriate court depending on your jurisdiction.",
      "Filing a case is easy! From your client dashboard, click 'File New Case', complete the case details form, attach supporting documents, and submit. Our system will then help connect you with the right legal assistance."
    ],
    "find lawyer": [
      "To find a lawyer, navigate to the 'Find Lawyer' section from your dashboard. You can filter lawyers by specialization, experience, location, and ratings. Browse through profiles, check their success rates, and view client testimonials. Once you find a suitable lawyer, you can request a consultation directly through the platform.",
      "Looking for legal representation? Visit the 'Find Lawyer' page from your dashboard where you can filter by specialty, experience, and location. Review lawyer profiles and success rates, then request a consultation with your preferred counsel."
    ],
    "case status": [
      "To check your case status, go to your dashboard and select the case from your active cases list. The case details page shows the current status, upcoming hearings, recent activities, and all related documents. You'll receive notifications for any updates to your case, and you can also enable email or SMS alerts for important developments.",
      "You can always check your case status on the case details page, accessible from your dashboard. It provides real-time updates on the current stage of your case, scheduled hearings, and recent activities."
    ],
    "billing": [
      "For billing inquiries, go to the 'Billing' section in your account settings. You can view your current plan, payment history, download invoices, and update your payment method. If you're a client, you can also view the breakdown of legal fees for each case. For any specific billing questions, you can contact our support team.",
      "All billing information is available in the 'Billing' section of your account settings. There you can manage payments, view invoices, and update your payment details. Need more help? Our support team is ready to assist with any billing concerns."
    ],
    "payment": [
      "CourtWise supports various payment methods including credit/debit cards, bank transfers, and digital wallets like PayPal. To add or update your payment method, go to 'Account Settings' > 'Billing' > 'Payment Methods'. All transactions are secured with industry-standard encryption and we never store your complete payment information.",
      "We offer flexible payment options including cards, bank transfers, and PayPal. Manage your payment methods in the Billing section of your account settings. All transactions are secure and protected by advanced encryption."
    ],
    "schedule consultation": [
      "To schedule a consultation with a lawyer, first navigate to their profile either from your case page or through the 'Find Lawyer' section. Click on 'Schedule Consultation' and select an available time slot from their calendar. You can add notes about what you'd like to discuss. Once scheduled, both you and the lawyer will receive a confirmation and a calendar invitation.",
      "Need to speak with a lawyer? Visit their profile and click 'Schedule Consultation'. Choose a convenient time from their availability calendar, add any relevant notes, and confirm your booking. You'll receive an immediate confirmation with all the details."
    ],
    "case documents": [
      "All case documents are securely stored in the 'Documents' section of your case page. You can organize them into folders, add labels for easy reference, and control access permissions. The platform maintains a version history of all documents, so you can track changes over time. Documents can be previewed directly in the browser or downloaded as needed.",
      "Access all your case documents from the 'Documents' tab on your case page. You can organize, label, and manage permissions for each document. Need to find something specific? Use the search and filter options to quickly locate any file."
    ],
    "notification settings": [
      "Manage your notification preferences in 'Account Settings' > 'Notifications'. You can choose to receive alerts via email, SMS, or in-app notifications for different types of updates such as case status changes, new messages, document uploads, and hearing reminders. You can also set quiet hours when you won't receive notifications.",
      "Customize how you receive updates by adjusting your notification settings in your account. Choose your preferred channels (email, SMS, app) and specify which events trigger alerts. Don't want to be disturbed at certain times? Set your quiet hours too."
    ],
    "technical issues": [
      "If you're experiencing technical issues, first try refreshing the page or clearing your browser cache. Make sure you're using a supported browser (Chrome, Firefox, Safari, or Edge) and that it's updated to the latest version. If problems persist, check our system status page for any ongoing maintenance. For further assistance, contact our technical support team with details about the issue and any error messages you've encountered.",
      "Having technical problems? Start with a page refresh or clearing your browser cache. Ensure you're using an updated, supported browser. If the issue continues, our technical support team is ready to help - just provide them with specific details about what you're experiencing."
    ],
    "data export": [
      "You can export your case data by going to 'Account Settings' > 'Data Management' > 'Export Data'. Select the types of data you wish to export (case details, messages, documents, etc.) and choose your preferred format (PDF, CSV, or ZIP archive). For document exports, you can select specific documents or export all at once. The export will be prepared and you'll receive a download link when it's ready.",
      "Need to export your data? Visit the Data Management section in your account settings. Choose what you want to export and your preferred format, and we'll prepare everything for you to download. Large exports may take some time to process."
    ],
    "mobile app": [
      "Yes, CourtWise offers mobile apps for both iOS and Android devices. Download them from the App Store or Google Play Store. The mobile app provides most of the same functionality as the web version, allowing you to manage cases, view documents, communicate with other parties, and receive notifications on the go. You can log in using the same credentials as the web platform.",
      "Our mobile apps give you access to CourtWise wherever you are. Available for both iOS and Android, they let you manage cases, view documents, and stay in touch with all parties involved in your legal matters. Download them today from your device's app store."
    ]
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
        let matched = false;
        for (const [keyword, answers] of Object.entries(predefinedAnswers)) {
          if (messageLower.includes(keyword.toLowerCase())) {
            response = getRandomResponse(answers);
            matched = true;
            break;
          }
        }

        // Advanced pattern matching for complex questions
        if (!matched) {
          if (/how.*(file|submit|start|create|begin).*case/i.test(messageLower)) {
            response = predefinedAnswers["file case"][0];
          } else if (/how.*(find|get|hire|contact).*lawyer/i.test(messageLower)) {
            response = predefinedAnswers["find lawyer"][0];
          } else if (/how.*(check|view|see).*status/i.test(messageLower)) {
            response = predefinedAnswers["case status"][0];
          } else if (/how.*(pay|billing|invoice|fee)/i.test(messageLower)) {
            response = predefinedAnswers["billing"][0];
          } else if (/how.*(schedule|book|arrange).*consultation/i.test(messageLower)) {
            response = predefinedAnswers["schedule consultation"][0];
          } else if (/where.*(document|file|upload)/i.test(messageLower)) {
            response = predefinedAnswers["case documents"][0];
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
    }, 800);
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
    
    if (!isOpen) {
      toast({
        title: "Support Chat Opened",
        description: "Our AI assistant is ready to help you.",
        duration: 3000,
      });
    }
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
          className="h-14 w-14 rounded-full bg-court-blue hover:bg-court-blue-dark shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Open support chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className={cn(
          "w-80 md:w-96 shadow-xl transition-all duration-300 transform",
          isMinimized ? "h-14" : isMobile ? "h-[450px]" : "h-[500px]"
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
              <CardContent className={cn("p-3 overflow-y-auto", isMobile ? "h-[340px]" : "h-[390px]")}>
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
