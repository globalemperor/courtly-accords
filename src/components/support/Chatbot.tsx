
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

interface KnowledgeBaseItem {
  question: string[];
  answer: string[];
}

interface KnowledgeBase {
  [key: string]: KnowledgeBaseItem;
}

interface ChatbotProps {
  knowledgeBase?: KnowledgeBase;
}

export const Chatbot: React.FC<ChatbotProps> = ({ knowledgeBase = {} }) => {
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

  // Comprehensive knowledge base
  const defaultKnowledgeBase: Record<string, string[]> = {
    // General platform information
    "what is courtwise": [
      "CourtWise is a comprehensive digital platform designed to streamline the court case management process. It connects clients, lawyers, court clerks, and judges in a secure environment, allowing for efficient case filing, document management, communication, and scheduling.",
      "CourtWise is an all-in-one legal case management platform that digitizes court processes. It provides different interfaces for clients, lawyers, clerks, and judges, creating a seamless workflow for case management from filing to resolution."
    ],
    "how courtwise works": [
      "CourtWise works by connecting all parties involved in legal proceedings in a digital environment. Clients can find lawyers and track their cases; lawyers can manage cases and communicate with clients and court officials; clerks can process filings and schedule hearings; and judges can review cases and issue orders—all through a single, secure platform.",
      "The platform provides role-specific dashboards for clients, lawyers, clerks, and judges. Each role has access to different features tailored to their needs, creating an efficient workflow for case management while maintaining appropriate access controls."
    ],
    "benefits": [
      "CourtWise offers numerous benefits: reduced paperwork, faster case processing, improved communication between parties, better organization of case documents, simplified scheduling, transparent case tracking, secure access from anywhere, decreased administrative burden, and overall cost savings for all parties involved.",
      "Using CourtWise streamlines legal processes by digitizing paperwork, enabling instant secure communications, providing a centralized document repository, offering automated scheduling, and giving real-time case status updates—saving time and money while improving the experience for everyone."
    ],
   
    // Account management
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
    "account verification": [
      "After signing up, you'll receive a verification email at the address you provided. Click the verification link in that email to activate your account. If you haven't received the verification email, check your spam folder and add support@courtwise.com to your contacts. You can request a new verification email from the login page.",
      "Account verification happens via email. After signing up, check your inbox for our verification link (including spam folders). Click the link to activate your account, or request a new verification email from the login page if needed."
    ],
    "delete account": [
      "To delete your account, go to 'Account Settings' > 'Privacy' > 'Delete Account'. You'll need to enter your password to confirm. Note that account deletion is permanent and will remove all your personal information from our system, though some case records may be retained for legal compliance purposes.",
      "Account deletion can be done in your Account Settings under the Privacy section. This will permanently remove your personal information, though some case data may be retained for legal compliance reasons."
    ],
    
    // Security
    "security": [
      "CourtWise takes data security very seriously. We implement enterprise-grade encryption, secure authentication protocols, and regular security audits. All data is encrypted both in transit and at rest, and we comply with legal data protection standards including GDPR and other relevant regulations.",
      "Your data security is our top priority! We use enterprise-grade encryption, maintain strict access controls, and comply with all relevant data protection regulations. All communications and stored information are fully encrypted."
    ],
    "data protection": [
      "We protect your data through multiple layers of security, including end-to-end encryption, secure data centers, regular security audits, and strict access controls. We're compliant with industry standards and legal requirements for data protection. Your case information is only accessible to authorized users involved in your specific cases.",
      "CourtWise employs comprehensive data protection measures: end-to-end encryption, secure cloud storage, regular penetration testing, strict access controls, and compliance with relevant regulations. We never share your data with third parties without your explicit consent or legal requirement."
    ],
    "privacy policy": [
      "Our privacy policy outlines how we collect, use, and protect your personal information. We only collect necessary information to provide our services and never sell your data to third parties. You can review our full privacy policy at courtwise.com/privacy or access it through the footer of any page on our website.",
      "Our privacy policy details our data handling practices and your rights regarding your information. View the complete policy on our website under the Privacy link in the footer."
    ],
    
    // Client-specific
    "find lawyer": [
      "To find a lawyer, navigate to the 'Find Lawyer' section from your dashboard. You can filter lawyers by specialization, experience, location, and ratings. Browse through profiles, check their success rates, and view client testimonials. Once you find a suitable lawyer, you can request a consultation directly through the platform.",
      "Looking for legal representation? Visit the 'Find Lawyer' page from your dashboard where you can filter by specialty, experience, and location. Review lawyer profiles and success rates, then request a consultation with your preferred counsel."
    ],
    "file case": [
      "To file a new case as a client, go to your dashboard and click on the 'File New Case' button. Fill out the case details form including case type, description, and relevant parties. You can then upload any necessary documents to support your case. Once submitted, you'll be matched with appropriate legal counsel or your case will be assigned to the appropriate court depending on your jurisdiction.",
      "Filing a case is easy! From your client dashboard, click 'File New Case', complete the case details form, attach supporting documents, and submit. Our system will then help connect you with the right legal assistance."
    ],
    "track case": [
      "You can track your case progress through your dashboard. The 'My Cases' section provides an overview of all your cases with their current status. Clicking on a specific case will show you detailed information, including documents, hearing dates, and updates from your lawyer. You'll also receive notifications for important case events.",
      "Case tracking is available right from your dashboard. The 'My Cases' section shows real-time status updates, and clicking on any case provides detailed information, documents, and a timeline of events. We also send notifications for important updates."
    ],
    "legal fees": [
      "Legal fees vary depending on the type of case and the lawyer you choose. When you file a case or select a lawyer, they will provide their fee structure, which may be hourly, flat-fee, or contingency-based. All fee information is transparently displayed before you commit to working with a lawyer, and you can compare different options.",
      "Transparent fee information is available when browsing lawyers or before accepting a case match. Fees vary by lawyer and case type, with different structures available (hourly, flat, or contingency). You can review and compare before making any commitments."
    ],
    "consultation": [
      "To schedule a consultation with a lawyer, go to their profile and click 'Request Consultation'. You can select from available time slots and include details about your legal issue. Once requested, you'll receive a confirmation, and the lawyer will be notified. Consultations can take place via video call, phone, or text chat within our secure platform.",
      "Consultations can be scheduled directly through a lawyer's profile page. Just select an available time slot, provide some basic information about your legal needs, and choose your preferred consultation method. Most initial consultations are 30 minutes."
    ],
    
    // Lawyer-specific
    "manage cases": [
      "As a lawyer, you can manage your cases through the 'Cases' section of your dashboard. This provides an overview of all active and past cases, with filters for status, urgency, and upcoming deadlines. Clicking on any case gives you access to all related documents, communications, schedules, and client information in one place.",
      "The lawyer dashboard gives you comprehensive case management tools. View and filter all your cases, access complete case files, track deadlines, manage documents, communicate with clients and court officials, and update case status—all from a centralized interface."
    ],
    "client communication": [
      "You can communicate with clients through our secure messaging system. Access client communications from either your case details page or the 'Messages' section of your dashboard. All communications are encrypted, timestamped, and automatically saved to the relevant case file, creating a complete record of all interactions.",
      "Our platform offers secure, encrypted communication channels with your clients. Messages are organized by case, include read receipts, allow for document sharing, and maintain a complete auditable history of all interactions for your records."
    ],
    "court filing": [
      "To submit court filings, go to the relevant case in your dashboard and select 'New Filing'. Complete the required information, upload supporting documents in accepted formats (PDF, DOCX), and submit. The system will verify document formats and completeness before sending to the appropriate court clerk for processing.",
      "Court filings can be submitted electronically through the case management interface. Select the filing type, complete the required forms, attach supporting documents, review for accuracy, and submit to the court. You'll receive confirmation and can track the status of your filing."
    ],
    "billing clients": [
      "You can bill clients through the 'Billing' section of your dashboard. Create new invoices by selecting the client and case, adding billable hours or services, and setting payment terms. Clients receive notifications when new invoices are available, and can make payments directly through the platform. You can also set up recurring billing or payment plans.",
      "Our billing system allows for detailed time tracking, automatic invoice generation, online payment processing, and financial reporting. You can customize billing rates by case type or client, and clients can view their billing history and make payments through their dashboard."
    ],
    "calendar management": [
      "Manage your schedule through the integrated calendar in your dashboard. This calendar displays all your hearings, client appointments, filing deadlines, and personal events in one view. You can sync with external calendars (Google, Outlook), set up reminders, and receive notifications for upcoming events.",
      "The CourtWise calendar offers comprehensive scheduling tools—view and filter by event type, sync with external calendars, set up automated reminders, schedule recurring events, and receive conflict warnings when scheduling new appointments."
    ],
    
    // Clerk-specific
    "process filings": [
      "As a court clerk, you can process new filings through the 'New Filings' queue on your dashboard. Review each filing for completeness and proper format, assign to the appropriate judge or division, and update the status. You can request additional information or corrections from the submitting lawyer if needed before acceptance.",
      "The filing review process is streamlined through our digital intake system. Verify document completeness, assign to the appropriate court division, set initial hearing dates, generate case numbers, notify involved parties, and maintain the court docket—all through an intuitive interface."
    ],
    "schedule hearings": [
      "To schedule court hearings, navigate to the case and select 'Schedule Hearing'. Choose the hearing type, select an available time slot based on courtroom and judge availability, set the duration, and add any special instructions. The system will automatically notify all involved parties and update their calendars.",
      "Hearing scheduling takes into account courtroom availability, judge calendars, and case priority. Select the hearing type, duration, and participants; choose from available time slots; and send automated notifications to all parties. The system also helps prevent scheduling conflicts."
    ],
    "manage court records": [
      "Court records are managed through the 'Records' section of your dashboard. You can organize records by case, date, or document type. Upload new documents, update existing ones, and control access permissions. All documents are securely stored and accessible only to authorized users based on their role and case involvement.",
      "The digital records management system allows for categorized document storage, full-text search capabilities, version control, access logs, and permission-based viewing. You can also generate standardized court documents using templates and case data."
    ],
    "jury management": [
      "The jury management tools allow you to maintain jury pools, randomly select potential jurors based on case requirements, send automated summons, track responses, manage juror schedules, and record attendance. You can also generate stipends and create reports on jury demographics and participation rates.",
      "Comprehensive jury management features include juror pool maintenance, automated selection and summons, response tracking, schedule management, payment processing, and detailed reporting capabilities."
    ],
    
    // Judge-specific
    "review cases": [
      "As a judge, you can review assigned cases through your 'Docket' dashboard. Cases are organized by type, priority, and hearing date. Each case view provides complete access to all filings, evidence, previous orders, and relevant case law. You can make notes, set follow-up reminders, and prepare for hearings efficiently.",
      "The judicial interface provides a comprehensive case review system. Access complete case histories, review all documents and evidence, see related case precedents, track case progress, and prepare for hearings—all through a streamlined digital workflow."
    ],
    "issue orders": [
      "To issue a court order, go to the relevant case and select 'New Order'. You can create orders using customizable templates or draft from scratch. Once finalized, digitally sign and publish the order, which automatically notifies all involved parties and becomes part of the official case record.",
      "Orders can be created using standard templates or custom drafting tools. Preview, revise, digitally sign, and issue orders directly from the case interface. All orders are timestamped, securely stored, and immediately distributed to relevant parties."
    ],
    "hearing management": [
      "Manage hearings through your judicial calendar. You can view upcoming hearings, access all related case materials in preparation, make notes during proceedings, record outcomes, and issue follow-up orders—all from a single interface. Audio recordings of hearings can also be securely stored and linked to the case.",
      "The hearing management system provides a comprehensive toolset for preparing, conducting, and documenting court proceedings. Access case materials, record notes and decisions, dictate follow-up actions, and maintain a complete record of all proceedings."
    ],
    "recusal": [
      "If you need to recuse yourself from a case, access the case details and select the 'Recusal' option. Provide the reason for recusal, which will be documented in the case record. The system will automatically reassign the case to another judge based on court rules and judge availability.",
      "The recusal process is handled digitally through the case management system. Document your reason for recusal, submit the formal request, and the system will handle case reassignment according to your jurisdiction's rules while maintaining a complete audit trail."
    ],
    
    // Document management
    "upload documents": [
      "To upload documents, navigate to the relevant case in your dashboard, then click the 'Documents' tab. You can drag and drop files or click 'Upload Documents' to browse your files. We support PDF, DOCX, JPG, and PNG formats with a maximum file size of 25MB per document.",
      "For document uploads, go to your case page, select the 'Documents' tab, and use the upload button or drag-and-drop. We support PDF, DOCX, JPG, and PNG files up to 25MB each."
    ],
    "document types": [
      "CourtWise supports various document types commonly used in legal proceedings, including pleadings, motions, affidavits, evidence exhibits, court orders, transcripts, and correspondence. All documents should be uploaded in PDF, DOCX, JPG, or PNG format for maximum compatibility and preservation of formatting.",
      "The platform accepts all standard legal document formats, particularly PDF and DOCX for text documents and JPG/PNG for images or exhibits. For best results, convert all text-based documents to PDF before uploading to maintain consistent formatting."
    ],
    "document security": [
      "All documents on CourtWise are securely stored with encryption. Access is strictly controlled based on user roles and case involvement. You can set additional permissions for sensitive documents, and all document access is logged for audit purposes. Documents cannot be permanently deleted from closed cases to maintain legal records.",
      "Document security includes encryption at rest and in transit, role-based access controls, detailed access logs, watermarking options for sensitive documents, and secure sharing capabilities that maintain the chain of custody."
    ],
    "e-signatures": [
      "CourtWise supports electronic signatures that are legally binding. To sign a document, open it in the document viewer, click 'Add Signature', and choose to type, draw, or upload your signature. You can also request signatures from other parties, which are verified through email and account authentication.",
      "Our e-signature features comply with legal requirements for electronic signatures. You can sign documents yourself, request signatures from others, verify signature authenticity, and maintain a complete audit trail of all signature activities."
    ],
    
    // Communications
    "messaging": [
      "The secure messaging system allows communication between authorized parties in a case. Access messages through the 'Messages' section of your dashboard or from within a specific case. All messages are encrypted, permanently stored, and become part of the official case record. You can attach documents and set priority levels for urgent communications.",
      "Our messaging system provides secure, case-organized communication channels. Send text messages, attach documents, set message priority, receive read receipts, and maintain a searchable history of all communications related to your cases."
    ],
    "notifications": [
      "Manage your notification preferences in 'Account Settings' > 'Notifications'. You can choose to receive alerts via email, SMS, or in-app notifications for different types of updates such as case status changes, new messages, document uploads, and hearing reminders. You can also set quiet hours when you won't receive notifications.",
      "Customize how you receive updates by adjusting your notification settings in your account. Choose your preferred channels (email, SMS, app) and specify which events trigger alerts. Don't want to be disturbed at certain times? Set your quiet hours too."
    ],
    "communication rules": [
      "CourtWise enforces ethical boundaries in legal communications. Clients can only message their own lawyers; lawyers can message their clients, court clerks, and other lawyers on shared cases; clerks can communicate with all parties; and judges can only communicate with clerks. This ensures proper legal protocol while facilitating necessary communication.",
      "The platform maintains appropriate communication boundaries between parties. Communication permissions are automatically set based on user roles and case relationships, preventing improper ex parte communications while enabling necessary case-related discussions."
    ],
    
    // Hearings and scheduling
    "hearing": [
      "Court hearing schedules can be viewed in the 'Hearings' section of your dashboard. You can filter by upcoming hearings, past hearings, or search for specific dates. Calendar invitations can be downloaded and notifications can be configured in your profile settings.",
      "Find all your hearing information in the 'Hearings' tab on your dashboard. You can filter, search, and set up notifications for upcoming events. Need to add a hearing to your calendar? Just click the download button next to any hearing."
    ],
    "schedule changes": [
      "If you need to request a hearing rescheduling, navigate to the hearing in your calendar and select 'Request Reschedule'. Provide the reason and your availability for alternative dates. All parties will be notified of the request, and the clerk or judge will make the final decision on the new date.",
      "Rescheduling requests can be submitted through the hearing details page. Provide your reason for rescheduling, suggest alternative dates, and submit for approval. All parties will be notified of both the request and the decision."
    ],
    "virtual hearings": [
      "CourtWise supports virtual court hearings through our integrated video conferencing system. For eligible hearings, you'll see a 'Join Virtually' option on the hearing details page. You can test your audio/video setup in advance, and the system automatically records the session and adds it to the case record.",
      "Virtual hearings are conducted through our secure, integrated video platform. Join from any device with a camera and microphone, share documents during proceedings, access breakout rooms for private consultations, and review the automatically generated transcript afterward."
    ],
    "calendar integration": [
      "You can synchronize your CourtWise calendar with external calendars like Google Calendar, Outlook, or Apple Calendar. Go to 'Account Settings' > 'Calendar Preferences' and select 'Connect External Calendar'. Follow the authentication steps to establish the connection. Events will then sync automatically in both directions.",
      "Calendar integration allows you to view all your CourtWise events in your preferred calendar application. Connect your Google, Outlook, or Apple calendar for two-way synchronization, ensuring you never miss an important court date or deadline."
    ],
    
    // Case management
    "case status": [
      "To check your case status, go to your dashboard and select the case from your active cases list. The case details page shows the current status, upcoming hearings, recent activities, and all related documents. You'll receive notifications for any updates to your case, and you can also enable email or SMS alerts for important developments.",
      "You can always check your case status on the case details page, accessible from your dashboard. It provides real-time updates on the current stage of your case, scheduled hearings, and recent activities."
    ],
    "case types": [
      "CourtWise supports various case types including civil litigation, family law, criminal defense, immigration, bankruptcy, personal injury, intellectual property, real estate, employment, and estate planning. Each case type has customized workflows and document templates designed for that specific legal area.",
      "The platform handles a wide range of legal matters across different practice areas. Each case type has a specialized interface with relevant forms, workflows, and required document types based on legal requirements for that area of law."
    ],
    "case transfer": [
      "To transfer a case to another lawyer within your firm, go to the case details and select 'Transfer Case'. Choose the receiving lawyer, add any transition notes, and submit the request. The client will be notified and asked to approve the transfer. All case materials will then be accessible to the new lawyer.",
      "Case transfers are handled through a structured process to ensure continuity of representation. Specify the new attorney, provide handover notes, obtain client approval, and transfer all case materials while maintaining a complete record of the transition."
    ],
    "close case": [
      "When a case reaches resolution, you can close it by accessing the case details and selecting 'Close Case'. You'll need to provide the outcome, final disposition, and any closing notes. Closed cases remain accessible in your archive but are moved from your active cases list.",
      "Case closure requires documenting the final outcome, archiving all relevant documents, sending final notifications to all parties, generating a case summary, and moving the case to archived status where it remains accessible for future reference."
    ],
    
    // Billing and payments
    "billing": [
      "For billing inquiries, go to the 'Billing' section in your account settings. You can view your current plan, payment history, download invoices, and update your payment method. If you're a client, you can also view the breakdown of legal fees for each case. For any specific billing questions, you can contact our support team.",
      "All billing information is available in the 'Billing' section of your account settings. There you can manage payments, view invoices, and update your payment details. Need more help? Our support team is ready to assist with any billing concerns."
    ],
    "payment": [
      "CourtWise supports various payment methods including credit/debit cards, bank transfers, and digital wallets like PayPal. To add or update your payment method, go to 'Account Settings' > 'Billing' > 'Payment Methods'. All transactions are secured with industry-standard encryption and we never store your complete payment information.",
      "We offer flexible payment options including cards, bank transfers, and PayPal. Manage your payment methods in the Billing section of your account settings. All transactions are secure and protected by advanced encryption."
    ],
    "subscription plans": [
      "CourtWise offers different subscription plans based on user role and usage needs. Basic plans provide essential features, while premium plans include advanced analytics, unlimited document storage, priority support, and additional integrations. You can view plan details and upgrade at any time through 'Account Settings' > 'Billing' > 'Subscription'.",
      "Our subscription options range from basic to premium tiers, with pricing based on your role and feature requirements. Compare plan features and upgrade or downgrade at any time through your account billing settings."
    ],
    "refunds": [
      "Our refund policy depends on your subscription type. Monthly subscriptions can be canceled anytime, stopping future payments. Annual subscriptions may be eligible for partial refunds if canceled early. For detailed information or to request a refund, please contact our billing department at billing@courtwise.com.",
      "For refund requests or questions about our refund policy, please review the terms in your subscription agreement or contact our billing team directly through the 'Help' section of your account settings."
    ],
    
    // Technical
    "browser support": [
      "CourtWise is compatible with the latest versions of Chrome, Firefox, Safari, and Edge browsers. For the best experience, we recommend keeping your browser updated to the latest version. Internet Explorer is not supported due to security limitations. Our mobile apps provide optimized experiences for iOS and Android devices.",
      "For optimal performance, use an up-to-date version of Chrome, Firefox, Safari, or Edge. We regularly test and update our platform to ensure compatibility with these major browsers. The mobile experience is best through our dedicated iOS and Android apps."
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
    ],
    
    // Additional common legal questions
    "legal advice": [
      "CourtWise is a platform for managing legal cases and connecting with legal professionals, but we do not provide legal advice directly. For legal advice specific to your situation, please consult with a qualified attorney. You can use our 'Find Lawyer' feature to connect with appropriate legal counsel for your needs.",
      "We provide the technology to connect you with legal professionals, but we don't offer legal advice ourselves. For guidance on your specific legal matters, we recommend consulting with a qualified attorney through our platform."
    ],
    "confidentiality": [
      "All information shared on CourtWise is subject to attorney-client privilege when communicated between clients and their lawyers. Our platform maintains this legal protection through advanced security measures, role-based access controls, and encrypted communications. Court documents follow public/private access rules based on applicable laws.",
      "We maintain the confidentiality of your legal matters through strict access controls, encryption, and compliance with attorney-client privilege requirements. Only authorized parties can access case information, and our security measures exceed industry standards for legal information systems."
    ],
    "evidence submission": [
      "To submit evidence for your case, go to the case details page and select the 'Evidence' tab. Use the upload function to add files, making sure to include a descriptive title and any relevant details for each item. You can organize evidence into categories and control who can access each item. All evidence submissions are timestamped and securely stored.",
      "Evidence can be submitted through the case management interface. Upload files in supported formats, add metadata and descriptions, organize into logical categories, and specify access permissions. The system maintains a chain of custody log for all evidence items."
    ],
    "court rules": [
      "CourtWise is configured to follow the specific rules and procedures of each jurisdiction. When filing documents or scheduling hearings, the system will guide you through the requirements specific to your court. For detailed information about local rules, you can access our jurisdiction guides through the 'Resources' section.",
      "Our platform is customized for each jurisdiction's specific court rules and filing requirements. The system will automatically apply the correct formats, deadlines, and procedures based on the court where your case is filed."
    ],
    "legal research": [
      "CourtWise includes basic legal research tools through the 'Research' tab in your dashboard. You can search relevant statutes, regulations, and case law based on your jurisdiction and case type. For more comprehensive research, we offer integration with major legal research platforms like LexisNexis and Westlaw through our premium plans.",
      "Access legal research tools directly through the platform, including a jurisdiction-specific database of statutes, regulations, and case precedents. Premium integrations with specialized legal research services are also available for more complex research needs."
    ]
  };

  // Combine provided knowledge base with default knowledge base
  const combinedKnowledgeBase: Record<string, string[]> = { ...defaultKnowledgeBase };
  
  // Add provided knowledge base items if they exist
  Object.entries(knowledgeBase).forEach(([key, item]) => {
    if (item.answer && item.answer.length > 0) {
      combinedKnowledgeBase[key] = item.answer;
    }
  });

  // More advanced pattern matching for specific query types
  const queryPatterns = [
    { pattern: /how do I (create|make|get) an account/i, key: "create account" },
    { pattern: /how (can|do) I (find|get|contact|hire) a lawyer/i, key: "find lawyer" },
    { pattern: /how (can|do) I (submit|file|start|initiate) a( new)? case/i, key: "file case" },
    { pattern: /(what|how) about (security|data protection)/i, key: "security" },
    { pattern: /how (do|can) I (reset|change|update|forgot) (my )?password/i, key: "password" },
    { pattern: /how (do|can) I (check|see|view|track) (my )?case status/i, key: "case status" },
    { pattern: /how (do|can) I (upload|submit|add) documents/i, key: "upload documents" },
    { pattern: /how (does|do|can) I (schedule|book|arrange|set up) a (consultation|meeting)/i, key: "consultation" },
    { pattern: /(what|how) about (billing|payment|fees|cost)/i, key: "billing" },
    { pattern: /having (technical|login) (issues|problems|difficulties)/i, key: "technical issues" },
    { pattern: /how (do|does|can) courtwise work/i, key: "how courtwise works" },
    { pattern: /what (is|are) the benefits/i, key: "benefits" },
    { pattern: /(hearing|court date) (schedule|information|details)/i, key: "hearing" },
    { pattern: /how (do|does) (confidentiality|privilege) work/i, key: "confidentiality" },
    { pattern: /how to (submit|provide|upload) evidence/i, key: "evidence submission" },
    { pattern: /(mobile|phone|app) (access|version)/i, key: "mobile app" }
  ];

  // Random response picker
  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Format answer as bullet points
  const formatAsPoints = (answer: string) => {
    if (answer.includes("•")) return answer; // Already in point format
    
    // Split the answer into sentences and format as bullet points
    const sentences = answer.split(/\.\s+/).filter(s => s.trim() !== "");
    if (sentences.length <= 1) return answer;
    
    return sentences.map(s => `• ${s.trim()}`).join("\n");
  };
  
  // Process user query to find a response
  const processQuery = (query: string): string => {
    // Normalize query to lowercase
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings|what's up).{0,10}$/i.test(normalizedQuery)) {
      return getRandomResponse(greetingResponses);
    }
    
    // Check for questions about the bot
    if (/who are you|what are you|tell me about yourself|what is your name/i.test(normalizedQuery)) {
      return getRandomResponse(aboutBotResponses);
    }
    
    // Check for thank you messages
    if (/thank you|thanks|appreciate it|thank/i.test(normalizedQuery)) {
      return getRandomResponse(thankYouResponses);
    }
    
    // Try pattern matching first
    for (const { pattern, key } of queryPatterns) {
      if (pattern.test(normalizedQuery)) {
        const answers = combinedKnowledgeBase[key];
        if (answers && answers.length > 0) {
          const answer = getRandomResponse(answers);
          return formatAsPoints(answer);
        }
      }
    }
    
    // Try direct keyword matching
    for (const [key, answers] of Object.entries(combinedKnowledgeBase)) {
      if (
        normalizedQuery.includes(key) || 
        key.split(" ").every(word => normalizedQuery.includes(word))
      ) {
        const answer = getRandomResponse(answers);
        return formatAsPoints(answer);
      }
    }
    
    // Try matching individual words if the query is complex
    if (normalizedQuery.split(" ").length > 2) {
      const queryWords = normalizedQuery.split(" ");
      for (const [key, answers] of Object.entries(combinedKnowledgeBase)) {
        const keyWords = key.split(" ");
        const matchCount = keyWords.filter(word => queryWords.includes(word)).length;
        
        // If more than half the words match, consider it a potential match
        if (matchCount >= Math.min(2, Math.floor(keyWords.length / 2))) {
          const answer = getRandomResponse(answers);
          return formatAsPoints(answer);
        }
      }
    }
    
    // If provided knowledgeBase has specific question arrays, check those
    for (const [_, item] of Object.entries(knowledgeBase)) {
      if (item.question && item.question.length > 0) {
        for (const q of item.question) {
          if (normalizedQuery.includes(q) || 
              q.split(" ").every(word => normalizedQuery.includes(word))) {
            const answer = getRandomResponse(item.answer);
            return formatAsPoints(answer);
          }
        }
      }
    }
    
    // No match found
    return "I don't have specific information about that. Could you rephrase your question or ask about another topic related to CourtWise or legal processes?";
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chatbot is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
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
    setIsTyping(true);
    
    // Simulate typing delay for bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: processQuery(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const toggleChatbot = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
  };

  const maximizeChatbot = () => {
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot toggle button */}
      {!isOpen && (
        <Button
          onClick={toggleChatbot}
          className="rounded-full w-12 h-12 bg-primary shadow-md hover:shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      
      {/* Chatbot interface */}
      {isOpen && (
        <Card 
          className={cn(
            "flex flex-col w-80 md:w-96 shadow-lg transition-all duration-300 ease-in-out",
            isMinimized ? "h-14" : "h-[450px]"
          )}
        >
          {/* Header */}
          <CardHeader className="p-3 flex flex-row items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <CardTitle className="text-sm font-medium">CourtWise Assistant</CardTitle>
            </div>
            <div className="flex space-x-1">
              {isMinimized ? (
                <Button variant="ghost" size="icon" onClick={maximizeChatbot} className="h-7 w-7">
                  <Maximize className="h-4 w-4 text-primary-foreground" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={minimizeChatbot} className="h-7 w-7">
                  <Minimize className="h-4 w-4 text-primary-foreground" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={toggleChatbot} className="h-7 w-7">
                <X className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Messages */}
          {!isMinimized && (
            <CardContent className="flex-grow overflow-y-auto p-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-lg p-3",
                      message.sender === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div
                      className={cn(
                        "text-xs mt-1",
                        message.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          )}
          
          {/* Input */}
          {!isMinimized && (
            <CardFooter className="p-3 border-t">
              <div className="flex w-full space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend} 
                  size="icon" 
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
};
