
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, BarChart4, Shield, Info, UserCog, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

// Testimonials data
const testimonials = [
  {
    quote: "CourtWise has completely transformed how we manage cases. The efficiency gains are remarkable.",
    author: "Sarah Johnson",
    role: "Senior Partner, Johnson & Associates"
  },
  {
    quote: "As a judge, I appreciate how CourtWise helps me stay organized with my docket and case reviews.",
    author: "Hon. Michael Reynolds",
    role: "District Court Judge"
  },
  {
    quote: "The client portal makes it easy to stay informed about my case status and communicate with my lawyer.",
    author: "David Martinez",
    role: "Client"
  },
  {
    quote: "Court administration has never been this streamlined. Our clerks love the intuitive interface.",
    author: "Patricia Wong",
    role: "Court Administrator"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background and Animated Elements */}
      <section className="hero-pattern relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-court-blue-dark/90 via-court-blue/95 to-court-blue-dark/90 z-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float animation-delay-600"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-4 relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            <span className="inline-block">Transform Your</span> <span className="inline-block gradient-text bg-gradient-to-r from-white to-blue-200">Legal Practice</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-fadeIn animation-delay-200 leading-relaxed">
            The comprehensive platform for managing court cases with efficiency, 
            transparency, and collaboration between all legal participants.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fadeIn animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-all shadow-lg text-lg px-8 py-6">
              <Link to="/login">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-all text-lg px-8 py-6">
              <a href="#features" className="flex items-center gap-2">
                Explore Features <MoveRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white/90">
              <p className="text-sm font-medium">Trusted by 500+ Law Firms</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white/90">
              <p className="text-sm font-medium">GDPR Compliant</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white/90">
              <p className="text-sm font-medium">ISO 27001 Certified</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white/90">
              <p className="text-sm font-medium">99.9% Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Improved Visual Design */}
      <section className="py-16 bg-gradient-to-b from-court-gray to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 text-center">
            <div className="p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-court-gray-dark/10">
              <p className="text-3xl md:text-4xl font-bold text-court-blue">{platformStats.clients}</p>
              <p className="text-court-blue-dark font-medium mt-1">Clients</p>
            </div>
            <div className="p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-court-gray-dark/10">
              <p className="text-3xl md:text-4xl font-bold text-court-blue">{platformStats.lawyers}</p>
              <p className="text-court-blue-dark font-medium mt-1">Lawyers</p>
            </div>
            <div className="p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-court-gray-dark/10">
              <p className="text-3xl md:text-4xl font-bold text-court-blue">{platformStats.judges}</p>
              <p className="text-court-blue-dark font-medium mt-1">Judges</p>
            </div>
            <div className="p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-court-gray-dark/10">
              <p className="text-3xl md:text-4xl font-bold text-court-blue">{platformStats.clerks}</p>
              <p className="text-court-blue-dark font-medium mt-1">Clerks</p>
            </div>
            <div className="p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-court-gray-dark/10">
              <p className="text-3xl md:text-4xl font-bold text-court-blue">{platformStats.casesResolved}</p>
              <p className="text-court-blue-dark font-medium mt-1">Cases Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Features Section with Enhanced Cards */}
      <section className="py-20 px-4 bg-white" id="login-options">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-court-blue mb-4">
              Tailored for Every Court Participant
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select your role to access a customized experience designed specifically for your needs in the legal process.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Client Box */}
            <Card className="overflow-hidden border-none shadow-lg group">
              <div className="h-24 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-4 text-center">For Clients</h3>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 group-hover:scale-105 transition-all">
                  <Link to="/login/client">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Lawyer Box */}
            <Card className="overflow-hidden border-none shadow-lg group">
              <div className="h-24 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <Scale className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-4 text-center">For Lawyers</h3>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600 group-hover:scale-105 transition-all">
                  <Link to="/login/lawyer">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Clerk Box */}
            <Card className="overflow-hidden border-none shadow-lg group">
              <div className="h-24 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <UserCog className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-4 text-center">For Clerks</h3>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 group-hover:scale-105 transition-all">
                  <Link to="/login/clerk">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Judge Box */}
            <Card className="overflow-hidden border-none shadow-lg group">
              <div className="h-24 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                <Gavel className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-4 text-center">For Judges</h3>
                <Button asChild className="w-full bg-red-500 hover:bg-red-600 group-hover:scale-105 transition-all">
                  <Link to="/login/judge">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Visual Appeal */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-court-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-court-blue">
              Powerful Features for Court Case Management
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools needed to manage legal cases efficiently from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 flex hover:shadow-xl transition-all hover:scale-[1.02] border border-court-gray-dark/10"
              >
                <div className="mr-6 bg-gradient-to-br from-court-blue to-court-blue-light p-4 rounded-lg h-fit">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-court-blue-dark">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New Addition */}
      <section className="py-20 px-4 bg-court-blue">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Our Users Say
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Hear from legal professionals who have transformed their practice with CourtWise.
            </p>
          </div>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 text-2xl text-white">"</div>
                      <p className="text-white/90 text-lg italic mb-6">{testimonial.quote}</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-white">{testimonial.author}</p>
                        <p className="text-white/70 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="left-0 bg-white/20 hover:bg-white/30 border-white/40" />
              <CarouselNext className="right-0 bg-white/20 hover:bg-white/30 border-white/40" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Benefits Section with Improved Visual Design */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-court-blue">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              CourtWise offers unparalleled advantages that set it apart from traditional case management solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-court-gray/30 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-court-gray-dark/10"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-court-blue to-court-blue-light flex items-center justify-center">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-court-blue-dark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-court-gray/30 rounded-xl p-8 shadow-lg border border-court-gray-dark/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-court-blue-dark">Additional Benefits</h3>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-12">
              {[
                "Intuitive user interface",
                "24/7 technical support",
                "Regular feature updates",
                "Custom workflow options",
                "Data export capabilities",
                "Advanced search functionality",
                "Mobile accessibility",
                "Multi-language support",
                "Customizable dashboards"
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section with Enhanced Visual Design */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-court-gray to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-court-blue">
              Getting Started with CourtWise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Begin your journey to more efficient court case management in just a few simple steps.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-court-gray-dark/10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-blue-700 text-xl font-bold">1</div>
                <h3 className="font-semibold text-xl mb-3 text-blue-700">Create Your Account</h3>
                <p className="text-blue-900/70">Sign up with your details as a client, lawyer, or court official. Each role has a tailored experience.</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-green-700 text-xl font-bold">2</div>
                <h3 className="font-semibold text-xl mb-3 text-green-700">Set Up Your Profile</h3>
                <p className="text-green-900/70">Complete your profile with all necessary details and credentials to make the most of the platform.</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="bg-purple-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-purple-700 text-xl font-bold">3</div>
                <h3 className="font-semibold text-xl mb-3 text-purple-700">Start Using Features</h3>
                <p className="text-purple-900/70">Explore the dashboard, connect with other users, and utilize the features specific to your role.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-court-blue/5 rounded-xl shadow-lg p-8 flex items-start border border-court-blue/10">
            <div className="bg-court-blue/10 p-3 rounded-full mr-6 flex-shrink-0">
              <Info className="h-8 w-8 text-court-blue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-court-blue-dark">Need Help?</h3>
              <p className="text-gray-700 mb-6">
                Our support team is available to help you get the most out of CourtWise. Explore our resources or reach out directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild className="border-court-blue/20 hover:border-court-blue/50 hover:bg-court-blue/5">
                  <Link to="/documentation">Documentation</Link>
                </Button>
                <Button variant="outline" asChild className="border-court-blue/20 hover:border-court-blue/50 hover:bg-court-blue/5">
                  <Link to="/guides">Tutorials</Link>
                </Button>
                <Button variant="outline" asChild className="border-court-blue/20 hover:border-court-blue/50 hover:bg-court-blue/5">
                  <Link to="/faq">FAQ</Link>
                </Button>
                <Button variant="outline" asChild className="border-court-blue/20 hover:border-court-blue/50 hover:bg-court-blue/5">
                  <Link to="/help">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-court-blue hover:bg-court-blue-dark px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Visual Design */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-court-blue-dark to-court-blue z-0"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl animate-float animation-delay-400"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Court Case Management?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of legal professionals who use CourtWise to streamline their 
            court case workflows and improve collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:scale-105 transition-all shadow-lg text-lg px-8 py-6">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-all text-lg px-8 py-6">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-court-blue-dark text-white/80 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">CourtWise</h3>
              <p className="mb-6 leading-relaxed">
                Simplifying court case management for legal professionals and clients worldwide.
              </p>
              <div className="flex gap-4">
                <Link to="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link to="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.504.344-1.857.182-.467.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Resources</h3>
              <ul className="space-y-4">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-white transition-colors">User Guides</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white transition-colors">GDPR Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>© 2023 CourtWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
