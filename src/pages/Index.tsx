
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info, UserCog, BookText, Scroll, Award } from "lucide-react";
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
      {/* Hero Section with Lady Justice Symbol */}
      <section className="bg-gradient-to-r from-court-blue to-court-blue-dark py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 hidden md:block">
          <img 
            src="/lovable-uploads/83985883-a691-4db4-8569-b9d0622fb27a.png" 
            alt="Lady Justice Statue" 
            className="h-full object-contain animate-fade-in" 
          />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 rounded-full bg-white/10 p-4 animate-pulse-subtle">
              <img 
                src="/lovable-uploads/7333ddb3-a459-4ae8-87e9-af4137dc559e.png" 
                alt="Lady Justice Symbol" 
                className="h-full w-full" 
              />
            </div>
          </div>
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
              <a href="#features" className="text-court-blue-light">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Icons Banner - Updated with subtle fade effect instead of bouncing */}
      <section className="py-6 bg-court-gray-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center gap-8 overflow-x-auto py-4">
            <img 
              src="/lovable-uploads/3fd9b358-1e18-4c0e-ad08-21eaa4fc7662.png" 
              alt="Legal Symbols" 
              className="h-16 md:h-20 animate-fade-in" 
            />
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with hover effects */}
      <section className="py-12 bg-court-gray-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center animate-scaleIn">
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-blue-50">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.clients}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Clients</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-50">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.lawyers}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Lawyers</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-yellow-50">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.judges}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Judges</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-purple-50">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.clerks}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Clerks</p>
            </div>
            <div className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-red-50">
              <p className="text-2xl md:text-3xl font-bold text-court-blue">{platformStats.casesResolved}</p>
              <p className="text-court-blue-dark font-medium text-sm mt-1">Cases Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Features Section - Enhanced with interactive animations */}
      <section className="py-16 px-4 bg-white" id="login-options">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-court-blue-light after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
              Login by Role
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Client Box */}
            <Card className="hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <Users className="h-8 w-8 text-blue-500 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-blue-600 transition-colors">For Clients</h3>
                <Button variant="outline" asChild className="w-full hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <Link to="/login/client">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Lawyer Box */}
            <Card className="hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <Scale className="h-8 w-8 text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-green-600 transition-colors">For Lawyers</h3>
                <Button variant="outline" asChild className="w-full hover:bg-green-500 hover:text-white transition-all duration-300">
                  <Link to="/login/lawyer">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Clerk Box */}
            <Card className="hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <UserCog className="h-8 w-8 text-purple-500 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-purple-600 transition-colors">For Clerks</h3>
                <Button variant="outline" asChild className="w-full hover:bg-purple-500 hover:text-white transition-all duration-300">
                  <Link to="/login/clerk">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Judge Box */}
            <Card className="hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <Gavel className="h-8 w-8 text-red-500 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center group-hover:text-red-600 transition-colors">For Judges</h3>
                <Button variant="outline" asChild className="w-full hover:bg-red-500 hover:text-white transition-all duration-300">
                  <Link to="/login/judge">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with hover animations */}
      <section id="features" className="py-16 px-4 bg-court-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-court-blue-light after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
              Powerful Features for Court Case Management
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 flex hover:shadow-lg transition-all duration-300 hover:scale-[1.03] group"
              >
                <div className="mr-4 bg-court-blue/10 p-3 rounded-lg h-fit group-hover:bg-court-blue/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-court-blue group-hover:text-court-blue-dark group-hover:scale-110 transition-all" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-court-blue transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced with staggered animations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 relative">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-court-blue-light after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
              Why Choose Our Platform?
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-court-gray rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-fadeIn group`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-court-blue-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-court-blue transition-colors">{feature.title}</h3>
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
                <li key={i} className="flex items-center animate-slideInFromRight" style={{ animationDelay: `${i * 150}ms` }}>
                  <CheckCircle2 className="h-5 w-5 text-court-blue mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Legal Icons Section - Enhanced with hover effects */}
      <section className="py-8 px-4 bg-court-gray-dark">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
              <Gavel className="w-10 h-10 text-court-blue" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
              <Scale className="w-10 h-10 text-green-600" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
              <BookText className="w-10 h-10 text-red-600" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
              <Scroll className="w-10 h-10 text-purple-600" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-4 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300">
              <Award className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section - Enhanced with animations and hover effects */}
      <section id="how-it-works" className="py-12 px-4 bg-court-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 relative">
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-court-blue-light after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
              Getting Started with CourtWise
            </span>
          </h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow duration-300">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-blue-700">
                  <span className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-blue-700 text-sm">1</span>
                  Create Your Account
                </h3>
                <p className="text-sm">Sign up with your details as a client, lawyer, or court official. Each role has a tailored experience.</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-green-700">
                  <span className="bg-green-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-green-700 text-sm">2</span>
                  Set Up Your Profile
                </h3>
                <p className="text-sm">Complete your profile with all necessary details and credentials to make the most of the platform.</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-purple-700">
                  <span className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-purple-700 text-sm">3</span>
                  Start Using Features
                </h3>
                <p className="text-sm">Explore the dashboard, connect with other users, and utilize the features specific to your role.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
              <Info className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Our support team is available to help you get the most out of CourtWise.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="text-xs hover:bg-blue-50 transition-colors">
                  <Link to="/documentation">Documentation</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs hover:bg-blue-50 transition-colors">
                  <Link to="/guides">Tutorials</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs hover:bg-blue-50 transition-colors">
                  <Link to="/faq">FAQ</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs hover:bg-blue-50 transition-colors">
                  <Link to="/help">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild className="bg-court-blue hover:bg-court-blue-dark hover:scale-105 transition-transform duration-300">
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Improved with gradient animation */}
      <section className="bg-gradient-to-r from-court-blue-dark to-court-blue py-12 px-4 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">
            Ready to Transform Your Court Case Management?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Join thousands of legal professionals who use CourtWise to streamline their 
            court case workflows and improve collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-all duration-300">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-colors duration-300">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Year is already updated to 2025 */}
      <footer className="bg-court-blue-dark text-white/80 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">CourtWise</h3>
              <p className="mb-4">
                Simplifying court case management for legal professionals and clients worldwide.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.504.344-1.857.182-.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">How It Works</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">User Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white/50 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">GDPR Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p>© 2025 CourtWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
