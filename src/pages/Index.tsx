
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info, UserCog, ChevronRight, Sparkles, BookText, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

// Testimonials
const testimonials = [
  {
    quote: "CourtWise has revolutionized how our firm manages cases. The efficiency gains are remarkable.",
    author: "Sarah Johnson",
    role: "Senior Partner, Johnson & Associates"
  },
  {
    quote: "As a judge, I appreciate the streamlined workflow and clear case presentations. It makes my job easier.",
    author: "Hon. Michael Chen",
    role: "Circuit Court Judge"
  },
  {
    quote: "The platform has made legal proceedings much more transparent and accessible for me as a client.",
    author: "Robert Patel",
    role: "Client"
  }
];

// Case studies
const caseStudies = [
  {
    title: "70% Reduction in Administrative Time",
    description: "Hoffman & Partners saw a dramatic decrease in time spent on paperwork after implementing CourtWise.",
    icon: FileText
  },
  {
    title: "25% Faster Case Resolution",
    description: "Henderson County Court System reported significantly improved case throughput using our platform.",
    icon: Sparkles
  },
  {
    title: "99.9% Document Security",
    description: "Zero data breaches or security incidents since implementation across all our client firms.",
    icon: Shield
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Testimonial rotation
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const parallaxOffset = scrollY * 0.2;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-court-blue-dark via-court-blue to-court-blue-light overflow-hidden">
        {/* Animated floating scales, gavels, and books in the background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute opacity-10"
              initial={{ 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 + "%",
                rotate: Math.random() * 360,
                scale: 0.5 + Math.random() * 1.5
              }}
              animate={{ 
                y: ["0%", "100%"], 
                rotate: [0, 360],
              }}
              transition={{ 
                y: { 
                  duration: 20 + Math.random() * 40, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 40 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }
              }}
              style={{
                left: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 && <Scale className="text-white h-16 w-16" />}
              {i % 3 === 1 && <Gavel className="text-white h-16 w-16" />}
              {i % 3 === 2 && <BookText className="text-white h-16 w-16" />}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Justice. Streamlined.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              The comprehensive platform revolutionizing court case management with
              efficiency, transparency, and collaboration.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-court-blue hover:bg-white/90 group relative overflow-hidden"
              >
                <Link to="/login">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-court-blue-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="text-white border-white hover:bg-white/10 group"
              >
                <a href="#features">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f5f7f9" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,144C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section - Animated counters */}
      <section className="py-24 bg-court-gray-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center">
            {Object.entries(platformStats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <p className="text-2xl md:text-3xl font-bold text-court-blue">{value}</p>
                <p className="text-court-blue-dark font-medium text-sm mt-1 capitalize">{key}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Features Section - with animated cards */}
      <section className="py-24 px-4 bg-white" id="login-options">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
            Tailored for Every Legal Professional
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Whether you're a judge, lawyer, clerk, or client, CourtWise has personalized features designed specifically for your role.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Client Box */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="overflow-hidden border-t-4 border-blue-500 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">For Clients</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Track your case progress and communicate with your lawyer in one place.
                  </p>
                  <Button variant="outline" asChild className="w-full hover:bg-blue-500 hover:text-white transition-colors mt-auto">
                    <Link to="/login/client">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Lawyer Box */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="overflow-hidden border-t-4 border-green-500 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Scale className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">For Lawyers</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Manage multiple cases, clients, and court appearances efficiently.
                  </p>
                  <Button variant="outline" asChild className="w-full hover:bg-green-500 hover:text-white transition-colors mt-auto">
                    <Link to="/login/lawyer">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Clerk Box */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="overflow-hidden border-t-4 border-purple-500 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <UserCog className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">For Clerks</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Process cases, manage dockets, and facilitate court operations.
                  </p>
                  <Button variant="outline" asChild className="w-full hover:bg-purple-500 hover:text-white transition-colors mt-auto">
                    <Link to="/login/clerk">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Judge Box */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="overflow-hidden border-t-4 border-red-500 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <Gavel className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">For Judges</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Review cases, schedule hearings, and deliver judgments with ease.
                  </p>
                  <Button variant="outline" asChild className="w-full hover:bg-red-500 hover:text-white transition-colors mt-auto">
                    <Link to="/login/judge">Login</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section with animations */}
      <section id="features" className="py-24 px-4 bg-court-gray relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Powerful Features for Court Case Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CourtWise delivers everything needed for efficient legal proceedings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md p-6 flex hover:shadow-lg transition-all border-l-4 border-court-blue"
              >
                <div className="mr-4 bg-court-blue/10 p-3 rounded-lg h-fit">
                  <feature.icon className="h-6 w-6 text-court-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background decor - floating law symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute text-court-blue"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`], 
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 30 + Math.random() * 20, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              {i % 2 === 0 ? 
                <Scale className="h-16 w-16" /> : 
                <Gavel className="h-16 w-16" />
              }
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the professionals who use CourtWise every day
            </p>
          </motion.div>

          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="absolute w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 50,
                  zIndex: activeTestimonial === index ? 10 : 0
                }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-court-gray rounded-lg p-8 relative">
                  <svg className="h-12 w-12 text-court-blue opacity-20 absolute top-4 left-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.5H2.5C2.10218 18.5 1.72064 18.342 1.43934 18.0607C1.15804 17.7794 1 17.3978 1 17V11.5C1 11.1022 1.15804 10.7206 1.43934 10.4393C1.72064 10.158 2.10218 10 2.5 10H6.5C6.89782 10 7.27936 10.158 7.56066 10.4393C7.84196 10.7206 8 11.1022 8 11.5V14M9.5 18.5C9.5 19.163 9.76339 19.7989 10.2322 20.2678C10.7011 20.7366 11.337 21 12 21H15M9.5 18.5V10.5C9.5 9.83696 9.76339 9.20107 10.2322 8.73223C10.7011 8.26339 11.337 8 12 8H15M15 8V4.5C15 3.83696 15.2634 3.20107 15.7322 2.73223C16.2011 2.26339 16.837 2 17.5 2H18.5C19.163 2 19.7989 2.26339 20.2678 2.73223C20.7366 3.20107 21 3.83696 21 4.5V11.5C21 11.1022 20.842 10.7206 20.5607 10.4393C20.2794 10.158 19.8978 10 19.5 10H17.5C17.1022 10 16.7206 10.158 16.4393 10.4393C16.158 10.7206 16 11.1022 16 11.5V14M15 8H16M15 21C15 19.8954 15.8954 19 17 19C18.1046 19 19 19.8954 19 21C19 22.1046 18.1046 23 17 23C15.8954 23 15 22.1046 15 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                  <div className="relative z-10">
                    <p className="text-lg mb-6 italic text-gray-700">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all ${
                  activeTestimonial === index ? "bg-court-blue w-6" : "bg-gray-300"
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 px-4 bg-court-gray-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from organizations using CourtWise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-md p-6 border-t-4 border-court-blue"
              >
                <div className="h-14 w-14 rounded-full bg-court-blue-light/10 flex items-center justify-center mb-4 mx-auto">
                  <study.icon className="h-6 w-6 text-court-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{study.title}</h3>
                <p className="text-gray-600 text-center">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with interactive cards */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CourtWise delivers powerful benefits for all legal professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {additionalFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-court-gray rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-court-blue to-court-blue-light flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Additional Benefits</h3>
            <motion.ul 
              className="inline-grid sm:grid-cols-2 gap-x-12 gap-y-4 text-left mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                "Intuitive user interface",
                "24/7 technical support",
                "Regular feature updates",
                "Custom workflow options",
                "Data export capabilities",
                "Advanced search functionality"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 className="h-5 w-5 text-court-blue mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-court-blue-dark to-court-blue z-0"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            transform: `translateY(${parallaxOffset}px)`
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Court Case Management?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals who use CourtWise to streamline their 
              court case workflows and improve collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 transition-all">
                  <Link to="/login">Get Started Today</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
                  <Link to="/login/signup">Create an Account</Link>
                </Button>
              </motion.div>
            </div>
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
            <p>© 2023 CourtWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
