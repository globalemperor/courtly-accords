
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const resourceContent: Record<string, { title: string; content: React.ReactNode }> = {
  help: {
    title: "Help Center",
    content: (
      <div className="space-y-4">
        <p>Welcome to the CourtWise Help Center. Here you'll find resources to help you use our system effectively.</p>
        <h3 className="text-lg font-semibold">Getting Started</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create an account with your role (Client, Lawyer, Clerk, or Judge)</li>
          <li>Complete your profile with all required information</li>
          <li>Navigate through the dashboard to access different features</li>
        </ul>
        <h3 className="text-lg font-semibold">Common Tasks</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Filing a new case (Lawyers)</li>
          <li>Reviewing case details</li>
          <li>Sending and receiving messages</li>
          <li>Managing hearing schedules</li>
        </ul>
      </div>
    ),
  },
  documentation: {
    title: "Documentation",
    content: (
      <div className="space-y-4">
        <p>Complete documentation for the CourtWise platform.</p>
        <h3 className="text-lg font-semibold">System Requirements</h3>
        <p>CourtWise works best on modern browsers like Chrome, Firefox, Safari, and Edge.</p>
        <h3 className="text-lg font-semibold">User Guides</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Client Guide</li>
          <li>Lawyer Guide</li>
          <li>Court Clerk Guide</li>
          <li>Judge Guide</li>
        </ul>
        <h3 className="text-lg font-semibold">API Documentation</h3>
        <p>For developers integrating with the CourtWise platform.</p>
      </div>
    ),
  },
  guides: {
    title: "User Guides",
    content: (
      <div className="space-y-4">
        <p>Detailed guides to help you navigate through CourtWise efficiently.</p>
        <h3 className="text-lg font-semibold">For Clients</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>How to find and connect with a lawyer</li>
          <li>Tracking your case progress</li>
          <li>Communicating with your legal team</li>
          <li>Understanding case documents</li>
        </ul>
        <h3 className="text-lg font-semibold">For Lawyers</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Managing your client portfolio</li>
          <li>Filing cases through the system</li>
          <li>Preparing for court hearings</li>
          <li>Collaborating with court staff</li>
        </ul>
      </div>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">General Questions</h3>
          <div className="border-b pb-2">
            <p className="font-medium">How secure is my data on CourtWise?</p>
            <p className="text-gray-600">CourtWise uses end-to-end encryption and follows industry best practices to ensure your data remains secure and confidential.</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium">Can I use CourtWise on my mobile device?</p>
            <p className="text-gray-600">Yes, CourtWise is fully responsive and works on smartphones and tablets.</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account Questions</h3>
          <div className="border-b pb-2">
            <p className="font-medium">How do I reset my password?</p>
            <p className="text-gray-600">You can reset your password from the login page by clicking on "Forgot Password" and following the instructions sent to your email.</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium">Can I change my role after registration?</p>
            <p className="text-gray-600">User roles are fixed after registration for security reasons. If you need to change your role, please contact support.</p>
          </div>
        </div>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    content: (
      <div className="space-y-4">
        <p className="font-medium">Last Updated: March 2025</p>
        <p>Welcome to CourtWise. These Terms of Service ("Terms") govern your access to and use of the CourtWise platform.</p>
        <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
        <p>By accessing or using CourtWise, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the service.</p>
        <h3 className="text-lg font-semibold">2. Description of Service</h3>
        <p>CourtWise provides a digital platform for case management, client-lawyer communication, and court scheduling services. We do not provide legal advice or representation.</p>
        <h3 className="text-lg font-semibold">3. User Accounts</h3>
        <p>You are responsible for safeguarding your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-4">
        <p className="font-medium">Last Updated: March 2025</p>
        <p>This Privacy Policy describes how CourtWise collects, uses, and shares your personal information.</p>
        <h3 className="text-lg font-semibold">1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with other users. This may include your name, email address, professional information, and case details.</p>
        <h3 className="text-lg font-semibold">2. How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
        <h3 className="text-lg font-semibold">3. Information Sharing</h3>
        <p>We do not share your personal information with third parties except as described in this Privacy Policy or with your consent.</p>
      </div>
    ),
  },
  cookies: {
    title: "Cookie Policy",
    content: (
      <div className="space-y-4">
        <p className="font-medium">Last Updated: March 2025</p>
        <p>This Cookie Policy explains how CourtWise uses cookies and similar technologies.</p>
        <h3 className="text-lg font-semibold">1. What Are Cookies</h3>
        <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
        <h3 className="text-lg font-semibold">2. How We Use Cookies</h3>
        <p>We use cookies for various purposes, including to authenticate users, remember preferences, analyze usage patterns, and improve user experience.</p>
        <h3 className="text-lg font-semibold">3. Your Choices</h3>
        <p>Most web browsers allow you to control cookies through their settings. You can choose to accept or reject cookies or to receive a notification when a cookie is being set.</p>
      </div>
    ),
  },
  gdpr: {
    title: "GDPR Compliance",
    content: (
      <div className="space-y-4">
        <p>CourtWise is committed to compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.</p>
        <h3 className="text-lg font-semibold">1. Data Subject Rights</h3>
        <p>Under the GDPR, you have the right to access, rectify, and erase your personal data, as well as the right to restrict or object to certain processing activities.</p>
        <h3 className="text-lg font-semibold">2. Data Protection Officer</h3>
        <p>We have appointed a Data Protection Officer who can be contacted at dpo@courtwise.example.com for any queries related to data protection.</p>
        <h3 className="text-lg font-semibold">3. Data Retention</h3>
        <p>We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in our Privacy Policy, unless a longer retention period is required by law.</p>
        <h3 className="text-lg font-semibold">4. International Transfers</h3>
        <p>When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place to protect your data.</p>
      </div>
    ),
  },
  tutorials: {
    title: "Video Tutorials",
    content: (
      <div className="space-y-4">
        <p>Learn how to use CourtWise effectively with our video tutorials.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Getting Started with CourtWise</h3>
            <div className="aspect-video bg-gray-200 flex items-center justify-center mb-2">
              <p className="text-gray-600">Video Preview</p>
            </div>
            <p className="text-sm text-gray-600">Duration: 5:30</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Filing Your First Case</h3>
            <div className="aspect-video bg-gray-200 flex items-center justify-center mb-2">
              <p className="text-gray-600">Video Preview</p>
            </div>
            <p className="text-sm text-gray-600">Duration: 7:15</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Communication Features</h3>
            <div className="aspect-video bg-gray-200 flex items-center justify-center mb-2">
              <p className="text-gray-600">Video Preview</p>
            </div>
            <p className="text-sm text-gray-600">Duration: 4:45</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Calendar and Scheduling</h3>
            <div className="aspect-video bg-gray-200 flex items-center justify-center mb-2">
              <p className="text-gray-600">Video Preview</p>
            </div>
            <p className="text-sm text-gray-600">Duration: 6:20</p>
          </div>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact Support",
    content: (
      <div className="space-y-4">
        <p>Our support team is here to help you with any questions or issues you may have.</p>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Email:</span> support@courtwise.example.com
            </li>
            <li>
              <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </li>
            <li>
              <span className="font-medium">Hours:</span> Monday to Friday, 9:00 AM - 5:00 PM EST
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Send a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-2 border rounded-md" 
                placeholder="Your name" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-2 border rounded-md" 
                placeholder="Your email" 
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full p-2 border rounded-md" 
                placeholder="Subject" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full p-2 border rounded-md" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </div>
    ),
  },
};

const ResourcePage = () => {
  const { resourceType } = useParams<{ resourceType: string }>();
  
  const resource = resourceType && resourceContent[resourceType];
  
  if (!resource) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
          <p className="mb-6">The requested resource page could not be found.</p>
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">{resource.title}</h1>
        <div className="prose max-w-none">
          {resource.content}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
