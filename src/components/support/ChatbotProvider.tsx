
import React from "react";
import { Chatbot } from "./Chatbot";
import { useAuth } from "@/context/AuthContext";

// Define the knowledge base for law-related questions
export const legalKnowledgeBase = {
  // General legal questions
  legalSystem: {
    question: ["legal system", "how does court work", "court system"],
    answer: [
      "The legal system typically works in these steps:",
      "• Case filing - Submit required documents to initiate legal proceedings",
      "• Case assignment - Court assigns judge and schedules initial hearing",
      "• Discovery phase - Both parties exchange evidence and information",
      "• Pre-trial motions - Legal arguments made before the trial begins",
      "• Trial - Formal presentation of evidence and arguments",
      "• Judgment - Court decision on the case",
      "• Appeals - Option to challenge the decision in a higher court"
    ]
  },
  legalTerms: {
    question: ["legal terms", "court terms", "law terminology"],
    answer: [
      "Here are common legal terms you might encounter:",
      "• Plaintiff - The person/entity filing the lawsuit",
      "• Defendant - The person/entity being sued",
      "• Litigation - The process of taking legal action",
      "• Discovery - Evidence gathering process",
      "• Deposition - Sworn testimony given before trial",
      "• Motion - Formal request for a court to make a decision",
      "• Verdict - Final decision in a trial",
      "• Settlement - Resolution reached without a trial",
      "• Jurisdiction - Court's authority to hear a case"
    ]
  },
  evidenceTypes: {
    question: ["evidence types", "what is evidence", "types of evidence", "proof", "legal evidence"],
    answer: [
      "Evidence in court cases can be categorized as:",
      "• Documentary evidence - Written documents, contracts, records",
      "• Testimonial evidence - Statements from witnesses",
      "• Physical evidence - Tangible objects related to the case",
      "• Digital evidence - Emails, text messages, social media posts",
      "• Demonstrative evidence - Charts, maps, models that illustrate points",
      "• Character evidence - Information about a person's reputation",
      "• Hearsay evidence - Second-hand information (often inadmissible)",
      "• Expert testimony - Opinions from qualified specialists"
    ]
  },
  witnessTypes: {
    question: ["witness types", "types of witnesses", "who can be witness"],
    answer: [
      "Different types of witnesses in legal proceedings include:",
      "• Eyewitnesses - People who directly observed relevant events",
      "• Expert witnesses - Specialists providing professional opinions",
      "• Character witnesses - People testifying about someone's reputation",
      "• Lay witnesses - Ordinary people with relevant knowledge",
      "• Hostile witnesses - Unwilling or adversarial witnesses",
      "• Fact witnesses - People testifying about facts they know"
    ]
  },
  filingCase: {
    question: ["how to file case", "filing a lawsuit", "start legal proceedings"],
    answer: [
      "To file a case through our platform:",
      "• Create an account or log in as a client",
      "• Navigate to the 'File Case' section",
      "• Complete the case information form with all required details",
      "• Add defendant information and case specifics",
      "• Upload any relevant documents or evidence",
      "• Add witness information if applicable",
      "• Submit your case for review",
      "• Pay any applicable filing fees",
      "• Wait for case assignment and scheduling information"
    ]
  },
  courtEtiquette: {
    question: ["court etiquette", "how to behave in court", "court rules"],
    answer: [
      "Important court etiquette to follow:",
      "• Dress formally and conservatively",
      "• Arrive early to your hearings",
      "• Stand when the judge enters or leaves",
      "• Address the judge as 'Your Honor'",
      "• Speak clearly and avoid interrupting others",
      "• Turn off electronic devices",
      "• Demonstrate respect for all court officials",
      "• Avoid emotional outbursts or inappropriate language",
      "• Follow your attorney's guidance"
    ]
  }
};

export const ChatbotProvider = () => {
  const { isAuthenticated } = useAuth();
  
  // Only show chatbot for authenticated users
  if (!isAuthenticated) return null;
  
  return <Chatbot knowledgeBase={legalKnowledgeBase} />;
};
