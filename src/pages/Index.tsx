
import { Button } from "@/components/ui/button";
import { 
  Gavel, Scale, Users, BookOpen, 
  ArrowRight, CheckCircle2, Briefcase, 
  BarChart4, Shield, UserCog, Info, 
  MessageCircle, Calendar, Globe, Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

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
    description: "Tailored interfaces for clients, lawyers, clerks, and judges with appropriate permissions and views.",
    icon: Users,
    color: "text-blue-500 bg-blue-50",
  },
  {
    title: "Case Management",
    description: "Create, view, update, and track court cases with comprehensive details and document management.",
    icon: BookOpen,
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    title: "Hearing Scheduling",
    description: "Schedule and manage court hearings, with notifications for all involved parties.",
    icon: Calendar,
    color: "text-purple-500 bg-purple-50",
  },
  {
    title: "Secure Communication",
    description: "Built-in messaging system for direct communication between clients, lawyers, clerks, and judges.",
    icon: MessageCircle,
    color: "text-amber-500 bg-amber-50",
  },
];

// Additional features for the expanded section
const additionalFeatures = [
  {
    title: "Document Management",
    description: "Store, organize, and share legal documents securely within the platform.",
    icon: Briefcase,
    color: "text-indigo-500 bg-indigo-50",
  },
  {
    title: "Real-time Analytics",
    description: "View detailed analytics on case progress, outcomes, and performance metrics.",
    icon: BarChart4,
    color: "text-rose-500 bg-rose-50",
  },
  {
    title: "Secure & Compliant",
    description: "Enterprise-grade security with full compliance to legal data protection standards.",
    icon: Shield,
    color: "text-teal-500 bg-teal-50",
  },
];

const roleCards = [
  {
    title: "For Clients",
    description: "Track your cases, communicate with your lawyer, and stay informed on all proceedings.",
    icon: Users,
    path: "/login/client",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
    iconColor: "text-blue-100",
    iconBg: "bg-blue-500/20",
  },
  {
    title: "For Lawyers",
    description: "Manage your cases, communicate with clients and court officials, and track hearings.",
    icon: Scale,
    path: "/login/lawyer",
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
    iconColor: "text-emerald-100",
    iconBg: "bg-emerald-500/20",
  },
  {
    title: "For Clerks",
    description: "Process case filings, manage court schedules, and assist judges and lawyers.",
    icon: UserCog,
    path: "/login/clerk",
    color: "from-violet-500 to-violet-600",
    hoverColor: "hover:from-violet-600 hover:to-violet-700",
    iconColor: "text-violet-100",
    iconBg: "bg-violet-500/20",
  },
  {
    title: "For Judges",
    description: "Review cases, manage your docket, and issue rulings and judgments.",
    icon: Gavel,
    path: "/login/judge",
    color: "from-rose-500 to-rose-600",
    hoverColor: "hover:from-rose-600 hover:to-rose-700",
    iconColor: "text-rose-100",
    iconBg: "bg-rose-500/20",
  },
];

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    stats: false,
    features: false,
    roles: false,
    benefits: false,
  });

  // Animation logic for scroll-based animations
  useEffect(() => {
    const checkVisibility = () => {
      const sections = ['hero', 'stats', 'features', 'roles', 'benefits'];
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el && window.scrollY + window.innerHeight > el.offsetTop) {
          setIsVisible(prev => ({ ...prev, [section]: true }));
        }
      });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check on load
    
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  // Auto-rotate feature highlight every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roleCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section 
        id="hero"
        className={`bg-gradient-to-br from-court-blue-dark via-court-blue to-indigo-900 py-20 lg:py-28 px-4 relative overflow-hidden transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-blue-300 opacity-10 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeIn">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Justice Simplified Through Technology
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto animate-fadeIn animation-delay-200 font-light">
            The comprehensive platform connecting clients, lawyers, clerks, and judges 
            for efficient court case management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 shadow-lg shadow-court-blue-dark/20 transition-all px-8 py-6 text-lg">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-colors px-8 py-6 text-lg">
              <a href="#features">Explore Features</a>
            </Button>
          </div>
          
          {/* Scrolling graphic indicator */}
          <div className="mt-16 animate-bounce hidden md:block">
            <div className="mx-auto h-10 w-6 border-2 border-white/30 rounded-full p-1">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse-subtle mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with subtle animation */}
      <section 
        id="stats" 
        className={`py-16 bg-gradient-to-r from-gray-50 to-gray-100 transition-transform duration-1000 ${isVisible.stats ? 'translate-y-0' : 'translate-y-20'}`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Trusted by Legal Professionals Nationwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {Object.entries(platformStats).map(([key, value], idx) => (
              <div 
                key={key} 
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center border border-gray-100"
              >
                <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-court-blue to-indigo-600">{value}</p>
                <p className="text-gray-600 font-medium text-sm mt-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Access Section - Card Grid with Hover Effects */}
      <section 
        id="roles" 
        className={`py-20 px-4 bg-white transition-opacity duration-1000 ${isVisible.roles ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Tailored for Every Court Participant
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers specialized interfaces and features for each role in the legal system,
              ensuring everyone has exactly what they need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roleCards.map((role, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 group ${index === activeIndex ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
              >
                <div className={`bg-gradient-to-br ${role.color} ${role.hoverColor} p-6 h-full`}>
                  <div className="flex justify-between items-start">
                    <div className={`${role.iconBg} rounded-full p-3 mb-6`}>
                      <role.icon className={`h-8 w-8 ${role.iconColor}`} />
                    </div>
                    <div className="text-white/80 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{role.title}</h3>
                  <p className="text-white/80 text-sm mb-6">{role.description}</p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-white/30 text-white hover:bg-white/20 transition-colors mt-4"
                    >
                      <Link to={role.path}>Login / Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Icon Cards */}
      <section 
        id="features" 
        className={`py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 transition-transform duration-1000 ${isVisible.features ? 'translate-y-0' : 'translate-y-20'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Powerful Features for Modern Court Case Management
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive set of tools enhances every aspect of the judicial process,
              from case filing to judgement delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`${feature.color} rounded-lg p-3 w-fit mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`${feature.color} rounded-lg p-3 w-fit mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Checklist */}
      <section 
        id="benefits" 
        className={`py-20 px-4 bg-white transition-opacity duration-1000 ${isVisible.benefits ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose CourtWise?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers unparalleled benefits for all stakeholders in the legal system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-8 mb-12">
            <div className="bg-gradient-to-br from-court-blue/5 to-indigo-500/5 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Heart className="text-rose-500 mr-3" /> For Clients & Lawyers
              </h3>
              <ul className="space-y-4">
                {["Easy case tracking and updates", 
                  "Secure document sharing and storage", 
                  "Streamlined communication with all parties",
                  "Automated reminders for important dates",
                  "Transparent fee structures and billing"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <Globe className="text-emerald-500 mr-3" /> For Courts & Judges
              </h3>
              <ul className="space-y-4">
                {["Efficient case management and scheduling", 
                  "Reduced administrative overhead",
                  "Comprehensive case history and documentation",
                  "Data-driven insights for process improvement",
                  "Integrated legal research capabilities"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* FAQ Accordion */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md">
              {[
                {
                  question: "How secure is the CourtWise platform?",
                  answer: "CourtWise employs enterprise-grade security measures including end-to-end encryption, multi-factor authentication, and regular security audits to ensure all your legal data remains secure and confidential."
                },
                {
                  question: "Can I access CourtWise on mobile devices?",
                  answer: "Yes, CourtWise is fully responsive and accessible on all devices including smartphones and tablets, allowing you to manage cases on the go."
                },
                {
                  question: "How does the role-based access system work?",
                  answer: "Each user is assigned a specific role (client, lawyer, clerk, or judge) during registration. The platform then customizes the interface, features, and access permissions based on that role, ensuring users only see what's relevant to them."
                },
                {
                  question: "Is training available for new users?",
                  answer: "Yes, we offer comprehensive onboarding resources including video tutorials, written guides, and live support to help new users get familiar with the platform quickly."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 px-4">
                  <AccordionTrigger className="text-left text-gray-900 py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
            Getting Started with CourtWise
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-md mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 text-blue-700 text-lg font-bold">1</div>
                  <h3 className="font-bold text-xl text-blue-700">Create Your Account</h3>
                </div>
                <p className="text-blue-800/70">Choose your role and sign up with your professional details. Verification may be required for legal professionals.</p>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 text-emerald-700 text-lg font-bold">2</div>
                  <h3 className="font-bold text-xl text-emerald-700">Set Up Your Profile</h3>
                </div>
                <p className="text-emerald-800/70">Complete your profile with all necessary credentials and preferences to customize your experience.</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 text-purple-700 text-lg font-bold">3</div>
                  <h3 className="font-bold text-xl text-purple-700">Start Using Features</h3>
                </div>
                <p className="text-purple-800/70">Explore the dashboard, connect with other users, and begin using the tools designed for your role.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-5 flex-shrink-0">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Need Help?</h3>
              <p className="text-gray-700 mb-6">
                Our support team is available to help you get the most out of CourtWise.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild className="bg-white">
                  <Link to="/documentation">Documentation</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="bg-white">
                  <Link to="/guides">Tutorials</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="bg-white">
                  <Link to="/faq">FAQ</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="bg-white">
                  <Link to="/help">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-court-blue-dark via-court-blue to-indigo-900 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Court Case Management?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of legal professionals who use CourtWise to streamline their 
            workflows and improve collaboration across the legal system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-all px-8 py-7 text-lg shadow-lg shadow-black/20">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 px-8 py-7 text-lg">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">CourtWise</h3>
              <p className="mb-6 text-gray-400">
                Simplifying court case management for legal professionals and clients worldwide.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.504.344-1.857.182-.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-white transition-colors block">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors block">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors block">How It Works</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors block">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/help" className="hover:text-white transition-colors block">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors block">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors block">User Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors block">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/terms" className="hover:text-white transition-colors block">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors block">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors block">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors block">GDPR Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">© 2023 CourtWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
