import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock stats for the platform
const platformStats = {
  clients: "5,240+",
  lawyers: "1,780+",
  judges: "420+",
  clerks: "650+",
  casesResolved: "10,500+",
};

// User role features organized by category
const roleFeatures = {
  clients: [
    "Request legal representation by browsing available lawyers",
    "Track case progress through your personalized dashboard",
    "Communicate with your lawyer through the secure messaging system",
    "Receive notifications about upcoming hearings and case updates",
    "Access and review all case documents in one place"
  ],
  lawyers: [
    "Manage client requests and accept new cases",
    "File and track cases through the entire legal process",
    "Communicate with clients, clerks, and judges securely",
    "Organize your schedule with the integrated calendar",
    "Store and access case documents with advanced search capabilities"
  ],
  officials: [
    "Manage court schedules and hearing assignments efficiently",
    "Process case filings and maintain court records",
    "Communicate with relevant parties through role-specific channels",
    "Track case progress and generate reports",
    "Access comprehensive case histories and documentation"
  ]
};

const features = [
  {
    title: "User Role-Based Access",
    description: "Separate interfaces for clients, lawyers, clerks, and judges with appropriate permissions and views.",
    icon: Users,
  },
  {
    title: "Case Management",
    description: "Create, view, update, and track court cases with comprehensive details and document management.",
    icon: BookOpen,
  },
  {
    title: "Hearing Scheduling",
    description: "Schedule and manage court hearings, with notifications for all involved parties.",
    icon: Scale,
  },
  {
    title: "Secure Communication",
    description: "Built-in messaging system for direct communication between clients, lawyers, clerks, and judges.",
    icon: Gavel,
  },
];

// Additional features for the expanded section
const additionalFeatures = [
  {
    title: "Document Management",
    description: "Store, organize, and share legal documents securely within the platform.",
    icon: Briefcase,
  },
  {
    title: "Real-time Analytics",
    description: "View detailed analytics on case progress, outcomes, and performance metrics.",
    icon: BarChart4,
  },
  {
    title: "Secure & Compliant",
    description: "Enterprise-grade security with full compliance to legal data protection standards.",
    icon: Shield,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-court-blue to-court-blue-dark py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Streamline Your Court Case Management
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
            The comprehensive platform for managing court cases with efficiency, 
            transparency, and collaboration between clients, lawyers, clerks, and judges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-transform">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-colors">
              <a href="#learn-more" className="text-court-blue-light">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-court-gray-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center animate-scaleIn">
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.clients}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Clients</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.lawyers}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Lawyers</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.judges}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Judges</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.clerks}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Clerks</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.casesResolved}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Cases Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Features Section - New Compact Format */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Tailored for Every Court Participant
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Client Features */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-5">
                  <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center">
                    <Users className="h-8 w-8 text-court-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Clients</h3>
                <div className="space-y-2">
                  {roleFeatures.clients.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">{idx + 1}</span>
                      </div>
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild className="w-full hover:bg-court-blue hover:text-white transition-colors">
                    <Link to="/login/client" className="flex items-center justify-center">
                      <span>Login as Client</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Lawyer Features */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-5">
                  <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center">
                    <Briefcase className="h-8 w-8 text-court-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Lawyers</h3>
                <div className="space-y-2">
                  {roleFeatures.lawyers.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">{idx + 1}</span>
                      </div>
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild className="w-full hover:bg-court-blue hover:text-white transition-colors">
                    <Link to="/login/lawyer" className="flex items-center justify-center">
                      <span>Login as Lawyer</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Court Officials Features */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-5">
                  <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center">
                    <Gavel className="h-8 w-8 text-court-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Court Officials</h3>
                <div className="space-y-2">
                  {roleFeatures.officials.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="bg-court-blue text-white rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">{idx + 1}</span>
                      </div>
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild className="hover:bg-court-blue hover:text-white transition-colors">
                    <Link to="/login/judge" className="flex items-center justify-center text-xs">
                      <span>Judge Login</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="hover:bg-court-blue hover:text-white transition-colors">
                    <Link to="/login/clerk" className="flex items-center justify-center text-xs">
                      <span>Clerk Login</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-court-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Powerful Features for Court Case Management
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 flex hover:shadow-lg transition-shadow hover:scale-[1.02] transition-transform"
              >
                <div className="mr-4 bg-court-blue/10 p-3 rounded-lg h-fit">
                  <feature.icon className="h-6 w-6 text-court-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-court-gray rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-court-blue-light flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <ul className="inline-grid sm:grid-cols-2 gap-x-12 gap-y-4 text-left mx-auto">
              {[
                "Intuitive user interface",
                "24/7 technical support",
                "Regular feature updates",
                "Custom workflow options",
                "Data export capabilities",
                "Advanced search functionality"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-court-blue mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testing Guide Section */}
      <section id="testing" className="py-16 px-4 bg-court-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Testing Guide for Application Features
          </h2>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            <AccordionItem value="client-testing">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-semibold">Testing Client Features</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3">
                  <p className="text-sm">Follow these steps to test client features:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Create a client account using the sign-up form</li>
                    <li>Browse available lawyers in the "Find Lawyer" section</li>
                    <li>Send a case request to a lawyer</li>
                    <li>Check your dashboard for case updates</li>
                    <li>Test the messaging system by sending messages to your lawyer</li>
                    <li>View upcoming hearings in the calendar</li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-md mt-3">
                    <p className="text-xs text-blue-700">Login credentials for testing: <strong>client@test.com / password123</strong></p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="lawyer-testing">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold">Testing Lawyer Features</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3">
                  <p className="text-sm">Follow these steps to test lawyer features:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Create a lawyer account with specialization details</li>
                    <li>View and accept client case requests</li>
                    <li>File a new case through the "File Case" section</li>
                    <li>Upload documents to a case file</li>
                    <li>Communicate with clients, clerks, and judges</li>
                    <li>Manage your calendar and upcoming hearings</li>
                  </ol>
                  <div className="bg-blue-50 p-3 rounded-md mt-3">
                    <p className="text-xs text-blue-700">Login credentials for testing: <strong>lawyer@test.com / password123</strong></p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="court-official-testing">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-court-blue-light/20 flex items-center justify-center mr-3">
                    <Gavel className="h-4 w-4 text-court-blue" />
                  </div>
                  <span className="font-semibold">Testing Court Official Features</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3">
                  <p className="text-sm">Follow these steps to test court official features:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Login as a judge or clerk using test credentials</li>
                    <li>Review and process new case filings</li>
                    <li>Schedule court hearings and assign courtrooms</li>
                    <li>Generate court reports and case statistics</li>
                    <li>Communicate with lawyers and clients</li>
                    <li>Access and update case records</li>
                  </ol>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-xs text-blue-700">Judge login: <strong>judge@test.com / password123</strong></p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-xs text-blue-700">Clerk login: <strong>clerk@test.com / password123</strong></p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="mongodb-integration">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <BarChart4 className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-semibold">MongoDB Integration Guide</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3">
                  <p className="text-sm">After testing the basic functionality, follow these steps to integrate MongoDB:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Set up a MongoDB Atlas account or local MongoDB instance</li>
                    <li>Create database collections for users, cases, messages, and hearings</li>
                    <li>Modify the data service functions to use MongoDB instead of localStorage</li>
                    <li>Add appropriate indexes for performance optimization</li>
                    <li>Implement proper authentication and access controls</li>
                    <li>Test data persistence across sessions</li>
                  </ol>
                  <div className="bg-amber-50 p-3 rounded-md mt-3">
                    <p className="text-xs text-amber-700">Look for <code>src/utils/initialSetup.ts</code> to understand the current data structure before migrating to MongoDB.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Learn More Section */}
      <section id="learn-more" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How to Use CourtWise
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
                <p className="text-gray-700 mb-4">
                  Our comprehensive documentation and support team are here to help you get the most out of CourtWise.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/documentation" className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">
                    View Documentation
                  </Link>
                  <Link to="/guides" className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">
                    Video Tutorials
                  </Link>
                  <Link to="/faq" className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">
                    FAQ
                  </Link>
                  <Link to="/help" className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild className="bg-court-blue hover:bg-court-blue-dark">
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-court-blue-dark to-court-blue py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Court Case Management?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who use CourtWise to streamline their 
            court case workflows and improve collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-transform">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-court-blue-dark text-white/80 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">CourtWise</h3>
              <p className="mb-4">
                Simplifying court case management for legal professionals and clients worldwide.
              </p>
              <div className="flex gap-4">
                <Link to="/social/facebook" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link to="/social/twitter" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link to="/social/instagram" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.88
