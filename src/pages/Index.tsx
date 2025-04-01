
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info, UserCog, ChevronRight, Clock, Award, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "./motion";
import { useEffect, useState, useRef, RefObject } from "react";

// Mock stats for the platform
const platformStats = {
  clients: "5,240+",
  lawyers: "1,780+",
  judges: "420+",
  clerks: "650+",
  casesResolved: "10,500+",
};

// Main features array
const features = [
  {
    title: "User Role-Based Access",
    description: "Separate interfaces for clients, lawyers, clerks, and judges with appropriate permissions and views.",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "group-hover:bg-blue-200",
  },
  {
    title: "Case Management",
    description: "Create, view, update, and track court cases with comprehensive details and document management.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    hoverColor: "group-hover:bg-green-200",
  },
  {
    title: "Hearing Scheduling",
    description: "Schedule and manage court hearings, with notifications for all involved parties.",
    icon: Scale,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "group-hover:bg-purple-200",
  },
  {
    title: "Secure Communication",
    description: "Built-in messaging system for direct communication between clients, lawyers, clerks, and judges.",
    icon: Gavel,
    color: "bg-amber-100 text-amber-600",
    hoverColor: "group-hover:bg-amber-200",
  },
];

// Additional features for the expanded section
const additionalFeatures = [
  {
    title: "Document Management",
    description: "Store, organize, and share legal documents securely within the platform.",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Real-time Analytics",
    description: "View detailed analytics on case progress, outcomes, and performance metrics.",
    icon: BarChart4,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Secure & Compliant",
    description: "Enterprise-grade security with full compliance to legal data protection standards.",
    icon: Shield,
    color: "from-purple-500 to-indigo-400",
  },
];

// Section for benefits
const benefits = [
  {
    title: "Time Efficiency",
    description: "Reduce administrative overhead by up to 70% with automated workflows and streamlined processes.",
    icon: Clock,
  },
  {
    title: "Enhanced Accuracy",
    description: "Minimize errors with structured data entry and validation checks throughout the platform.",
    icon: CheckCircle2,
  },
  {
    title: "Professional Standards",
    description: "Maintain highest professional standards with our compliant and secure platform.",
    icon: Award,
  },
  {
    title: "Complete Documentation",
    description: "Keep all case information organized and easily accessible in one secure location.",
    icon: ScrollText,
  },
];

// Custom hook for scroll-triggered animations
const useScrollAnimation = (): [RefObject<HTMLElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Index = () => {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [benefitsRef, benefitsVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Justice Statue Background */}
      <section ref={heroRef} className="hero-justice min-h-[90vh] flex items-center relative py-16 md:py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-court-blue-dark/80 to-court-blue/60 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Streamline Your Court Case Management
          </motion.h1>
          <motion.p 
            className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The comprehensive platform for managing court cases with efficiency, 
            transparency, and collaboration between clients, lawyers, clerks, and judges.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" asChild className="button-glow bg-white text-court-blue hover:bg-white/90 transition-transform">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-colors">
              <a href="#features" className="flex items-center">
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div 
            className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-white rounded-full"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              {/* Empty div for animation */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-court-gray-dark">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={statsVisible ? "visible" : "hidden"}
          >
            {Object.entries(platformStats).map(([key, value], index) => (
              <motion.div 
                key={key}
                variants={fadeInUp}
                className="p-6 rounded-lg bg-white shadow-md hover-lift card-hover-effect"
              >
                <p className="text-2xl md:text-3xl font-bold text-court-blue">{value}</p>
                <p className="text-court-blue-dark font-medium text-sm mt-1 capitalize">
                  {key === "casesResolved" ? "Cases Resolved" : key}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Features Section - Simplified with just role cards */}
      <section className="py-16 px-4 bg-white" id="login-options">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Login by Role
          </motion.h2>
          
          <motion.p 
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Access your personalized dashboard tailored to your specific role in the legal process
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Client Box */}
            <motion.div variants={fadeInUp}>
              <Card className="hover-lift overflow-hidden border-b-4 border-blue-500">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="feature-icon-container bg-blue-100">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">For Clients</h3>
                  <Button variant="outline" asChild className="w-full hover:bg-blue-500 hover:text-white transition-colors">
                    <Link to="/login/client">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Lawyer Box */}
            <motion.div variants={fadeInUp}>
              <Card className="hover-lift overflow-hidden border-b-4 border-green-500">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="feature-icon-container bg-green-100">
                    <Scale className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">For Lawyers</h3>
                  <Button variant="outline" asChild className="w-full hover:bg-green-500 hover:text-white transition-colors">
                    <Link to="/login/lawyer">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Clerk Box */}
            <motion.div variants={fadeInUp}>
              <Card className="hover-lift overflow-hidden border-b-4 border-purple-500">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="feature-icon-container bg-purple-100">
                    <UserCog className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">For Clerks</h3>
                  <Button variant="outline" asChild className="w-full hover:bg-purple-500 hover:text-white transition-colors">
                    <Link to="/login/clerk">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Judge Box */}
            <motion.div variants={fadeInUp}>
              <Card className="hover-lift overflow-hidden border-b-4 border-red-500">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="feature-icon-container bg-red-100">
                    <Gavel className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">For Judges</h3>
                  <Button variant="outline" asChild className="w-full hover:bg-red-500 hover:text-white transition-colors">
                    <Link to="/login/judge">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-16 px-4 bg-court-gray relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Powerful Features for Court Case Management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers comprehensive tools designed to streamline the entire legal process
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresVisible ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-lg shadow-md p-6 flex hover-lift overflow-hidden"
              >
                <div className={`mr-4 ${feature.color} p-3 rounded-lg h-fit transition-colors ${feature.hoverColor}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Benefits Section with new design */}
      <section ref={benefitsRef} className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={benefitsVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the advantages that make our solution the preferred choice for legal professionals
            </p>
          </motion.div>
          
          {/* Benefits Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsVisible ? "visible" : "hidden"}
          >
            {additionalFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="card-hover-effect rounded-lg overflow-hidden shadow-md"
              >
                <div className={`bg-gradient-to-r ${feature.color} p-6 h-32 flex items-center justify-center`}>
                  <feature.icon className="h-16 w-16 text-white" />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Benefits Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsVisible ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="bg-court-blue/10 p-3 rounded-full mr-4">
                  <benefit.icon className="h-6 w-6 text-court-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 p-6 bg-court-gray rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={benefitsVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Additional Platform Benefits</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Intuitive user interface",
                "24/7 technical support",
                "Regular feature updates",
                "Custom workflow options",
                "Data export capabilities",
                "Advanced search functionality"
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-court-blue mr-2 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Learn More Section */}
      <section id="how-it-works" className="py-16 px-4 bg-court-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Getting Started with CourtWise
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="grid md:grid-cols-3 gap-0">
              <motion.div 
                className="bg-blue-50 p-6 border-b md:border-b-0 md:border-r border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">1</span>
                <h3 className="font-semibold text-lg mb-3 text-blue-700">Create Your Account</h3>
                <p className="text-blue-800/70">Sign up with your details as a client, lawyer, or court official. Each role has a tailored experience.</p>
              </motion.div>
              
              <motion.div 
                className="bg-green-50 p-6 border-b md:border-b-0 md:border-r border-green-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold text-lg mb-4">2</span>
                <h3 className="font-semibold text-lg mb-3 text-green-700">Set Up Your Profile</h3>
                <p className="text-green-800/70">Complete your profile with all necessary details and credentials to make the most of the platform.</p>
              </motion.div>
              
              <motion.div 
                className="bg-purple-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-4">3</span>
                <h3 className="font-semibold text-lg mb-3 text-purple-700">Start Using Features</h3>
                <p className="text-purple-800/70">Explore the dashboard, connect with other users, and utilize the features specific to your role.</p>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 flex items-start"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
              <Info className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Our support team is available to help you get the most out of CourtWise.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link to="/documentation">Documentation</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link to="/guides">Tutorials</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link to="/faq">FAQ</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link to="/help">Contact Support</Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <Button size="lg" asChild className="button-glow bg-court-blue hover:bg-court-blue-dark">
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="cta-gradient py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Court Case Management?
          </motion.h2>
          <motion.p 
            className="text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={ctaVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of legal professionals who use CourtWise to streamline their 
            court case workflows and improve collaboration.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" asChild className="button-glow bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-transform">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </motion.div>
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
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors">User Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors">GDPR Compliance</Link></li>
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
