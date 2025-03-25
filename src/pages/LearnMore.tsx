
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Video, HelpCircle, MessageSquare } from "lucide-react";

const LearnMore = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">Learn More About CourtWise</h1>
        <p className="text-gray-600 mb-8">Discover how CourtWise can transform your legal practice and case management</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started with CourtWise</h2>
            <div className="prose max-w-none">
              <p>CourtWise is designed to streamline court case management for all stakeholders in the legal system. Our platform connects clients, lawyers, court clerks, and judges in one seamless environment.</p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Creating Your Account</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Visit the CourtWise login page and click "Sign Up"</li>
                <li>Select your role (Client, Lawyer, Clerk, or Judge)</li>
                <li>Complete the registration form with your information</li>
                <li>Verify your email address</li>
                <li>Complete your profile with all required information</li>
              </ol>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Navigating the Dashboard</h3>
              <p>After logging in, you'll be taken to your personalized dashboard. The dashboard provides an overview of your cases, upcoming hearings, recent messages, and important notifications. The sidebar menu allows you to access different sections of the platform.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features for Different Users</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>For Clients</CardTitle>
                  <CardDescription>Connect with lawyers and track your cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Find and request lawyers specialized in your case type</li>
                    <li>Track case progress in real-time</li>
                    <li>Communicate directly with your legal representation</li>
                    <li>Receive notifications about upcoming hearings</li>
                    <li>Access and review case documents</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>For Lawyers</CardTitle>
                  <CardDescription>Manage cases and clients efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Manage multiple clients and cases in one dashboard</li>
                    <li>File cases electronically</li>
                    <li>Communicate with clients, clerks, and judges</li>
                    <li>Track hearing schedules and deadlines</li>
                    <li>Store and organize case documents</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>For Court Clerks</CardTitle>
                  <CardDescription>Streamline administrative processes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Process new case filings</li>
                    <li>Manage court schedules and hearing assignments</li>
                    <li>Coordinate with lawyers and judges</li>
                    <li>Maintain and organize court records</li>
                    <li>Generate reports on case statistics</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>For Judges</CardTitle>
                  <CardDescription>Efficiently manage your docket</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>View and manage your case docket</li>
                    <li>Schedule and adjust hearing dates</li>
                    <li>Review case details and evidence</li>
                    <li>Issue rulings and judgments</li>
                    <li>Communicate with court staff</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
            <p className="mb-6">Our comprehensive documentation and support team are here to help you get the most out of CourtWise.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center text-center" size="lg">
                <Link to="/resources/documentation">
                  <FileText className="h-8 w-8 mb-2" />
                  <span className="font-semibold">View Documentation</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center text-center" size="lg">
                <Link to="/resources/tutorials">
                  <Video className="h-8 w-8 mb-2" />
                  <span className="font-semibold">Video Tutorials</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center text-center" size="lg">
                <Link to="/resources/faq">
                  <HelpCircle className="h-8 w-8 mb-2" />
                  <span className="font-semibold">FAQ</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center text-center" size="lg">
                <Link to="/resources/contact">
                  <MessageSquare className="h-8 w-8 mb-2" />
                  <span className="font-semibold">Contact Support</span>
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
