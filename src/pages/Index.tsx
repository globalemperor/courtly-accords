
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useEffect, useRef, useState } from "react";

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

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
};

const Index = () => {
  const featuresAnimation = useScrollAnimation();
  const statsAnimation = useScrollAnimation();
  const benefitsAnimation = useScrollAnimation();
  const howItWorksAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Lady Justice Background */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-court-blue-dark/90 to-court-blue/90 z-10"></div>
        
        {/* Lady Justice Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('/lovable-uploads/1e2e46bf-d557-4b41-8afc-25969c84870f.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4) contrast(1.1)",
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Streamline Your Court Case Management
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
            The comprehensive platform for managing court cases with efficiency, 
            transparency, and collaboration between clients, lawyers, clerks, and judges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-transform"
            >
              <Link to="/login" className="relative overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-court-blue-light/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-white border-white hover:bg-white/10 transition-colors relative overflow-hidden group"
            >
              <a href="#features">
                <span className="relative z-10">Learn More</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-12 bg-court-gray-dark"
        ref={statsAnimation.ref}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center ${statsAnimation.isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
            {Object.entries(platformStats).map(([key, value], index) => (
              <div 
                key={key} 
                className="p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-2xl md:text-3xl font-bold text-court-blue">{value}</p>
                <p className="text-court-blue-dark font-medium text-sm mt-1">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Features Section - Simplified with just role cards */}
      <section className="py-16 px-4 bg-white" id="login-options">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Login by Role
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Client Box */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Clients</h3>
                <Button variant="outline" asChild className="w-full hover:bg-blue-500 hover:text-white transition-colors">
                  <Link to="/login/client">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Lawyer Box */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Scale className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Lawyers</h3>
                <Button variant="outline" asChild className="w-full hover:bg-green-500 hover:text-white transition-colors">
                  <Link to="/login/lawyer">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Clerk Box */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UserCog className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Clerks</h3>
                <Button variant="outline" asChild className="w-full hover:bg-purple-500 hover:text-white transition-colors">
                  <Link to="/login/clerk">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Judge Box */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-blue-light/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gavel className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">For Judges</h3>
                <Button variant="outline" asChild className="w-full hover:bg-red-500 hover:text-white transition-colors">
                  <Link to="/login/judge">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-16 px-4 bg-court-gray"
        ref={featuresAnimation.ref}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Powerful Features for Court Case Management
          </h2>
          <div className={`grid md:grid-cols-2 gap-8 ${featuresAnimation.isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 flex hover:shadow-lg transition-shadow hover:scale-[1.02] transition-transform"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mr-4 bg-court-blue/10 p-3 rounded-lg h-fit">
                  <feature.icon className="h-6 w-6 text-court-blue" />
                </div>
                <div>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h3 className="text-xl font-semibold mb-2 cursor-pointer">{feature.title}</h3>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-court-blue text-white border-none shadow-lg">
                      <p>{feature.description}</p>
                    </HoverCardContent>
                  </HoverCard>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        className="py-16 px-4 bg-white"
        ref={benefitsAnimation.ref}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our Platform?
          </h2>
          <div className={`grid md:grid-cols-3 gap-6 mt-12 ${benefitsAnimation.isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-court-gray rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
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

      {/* Learn More Section */}
      <section 
        id="how-it-works" 
        className="py-12 px-4 bg-court-gray"
        ref={howItWorksAnimation.ref}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Getting Started with CourtWise
          </h2>
          
          <div className={`bg-white p-6 rounded-lg shadow-md mb-8 ${howItWorksAnimation.isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-blue-700">
                  <span className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-blue-700 text-sm">1</span>
                  Create Your Account
                </h3>
                <p className="text-sm">Sign up with your details as a client, lawyer, or court official. Each role has a tailored experience.</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-green-700">
                  <span className="bg-green-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-green-700 text-sm">2</span>
                  Set Up Your Profile
                </h3>
                <p className="text-sm">Complete your profile with all necessary details and credentials to make the most of the platform.</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 transform transition-transform hover:scale-105">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-purple-700">
                  <span className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-purple-700 text-sm">3</span>
                  Start Using Features
                </h3>
                <p className="text-sm">Explore the dashboard, connect with other users, and utilize the features specific to your role.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start transform transition-all hover:shadow-lg">
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
            <Button 
              size="lg" 
              asChild 
              className="bg-court-blue hover:bg-court-blue-dark relative overflow-hidden group"
            >
              <Link to="/login">
                <span className="relative z-10 flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-court-blue-light opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with more contrast and visual appeal */}
      <section 
        ref={ctaAnimation.ref}
        className={`bg-gradient-to-r from-court-blue-dark to-court-blue py-16 px-4 text-white relative overflow-hidden ${ctaAnimation.isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20" stroke="white" strokeWidth="0.5" />
                <path d="M20 0 L20 40" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Court Case Management?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals who use CourtWise to streamline their 
              court case workflows and improve collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-transform shadow-lg"
              >
                <Link to="/login">Get Started Today</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="text-white border-white hover:bg-white/10 shadow-lg"
              >
                <Link to="/login/signup">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - With enhanced visibility for CourtWise brand section */}
      <footer className="bg-court-blue-dark text-white/80 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-court-blue p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold mb-4 text-white">CourtWise</h3>
              <p className="mb-4 text-white/90">
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
                <li><Link to="/" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">How It Works</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">User Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white/30 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">GDPR Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p>© {new Date().getFullYear()} CourtWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Promotional popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4 animate-scaleIn">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-court-blue">Special Offer!</h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-4">Sign up now and get 30 days free trial of our premium features!</p>
            <div className="flex justify-center">
              <Button 
                asChild 
                className="mr-2 bg-court-blue hover:bg-court-blue-dark"
              >
                <Link to="/login/signup">Sign Up Now</Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPopup(false)}
                className="border-court-blue text-court-blue hover:bg-court-blue/10"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
