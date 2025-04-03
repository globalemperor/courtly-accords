
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, FileText, Clock, CalendarDays, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { CaseFlowVisualization } from "@/components/landing/CaseFlowVisualization";

// Mock stats for the platform
const platformStats = {
  clients: "5,240+",
  lawyers: "1,780+",
  judges: "420+",
  casesResolved: "10,500+",
};

const features = [
  {
    title: "Complete Case Management",
    description: "Manage the entire lifecycle of court cases, from filing to resolution, with comprehensive tracking and documentation.",
    icon: FileText,
  },
  {
    title: "Role-Based Access Control",
    description: "Tailored interfaces for clients, lawyers, clerks, and judges with appropriate permissions and views.",
    icon: Users,
  },
  {
    title: "Hearing Scheduling",
    description: "Efficiently schedule and manage court hearings with automatic notifications for all parties involved.",
    icon: CalendarDays,
  },
  {
    title: "Digital Evidence Management",
    description: "Securely store, organize, and share legal documents and evidence within a centralized platform.",
    icon: Gavel,
  },
];

const testimonials = [
  {
    quote: "This platform has completely transformed how our law firm manages cases. The efficiency gains are remarkable.",
    author: "Sarah Johnson",
    title: "Managing Partner, Johnson & Associates"
  },
  {
    quote: "As a judge, the streamlined case view gives me exactly what I need to prepare for hearings efficiently.",
    author: "Hon. Michael Reynolds",
    title: "District Court Judge"
  },
  {
    quote: "The transparency this system provides to clients about their case status has dramatically improved our client satisfaction.",
    author: "David Chen",
    title: "Legal Operations Director, Chen Legal Group"
  }
];

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Courtroom Image Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/3911c596-b48a-40b8-bb5a-95d26daa5dbf.png" 
            alt="Courtroom" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-court-wood-dark to-court-red-dark opacity-90"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Professional Court Case Management
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
            The comprehensive platform for legal professionals, providing efficient case management and collaboration between all court participants.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-red hover:bg-white/90 hover:text-court-red-dark transition-colors">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-colors">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Justice Statue Highlight */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-in-scale">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-court-wood-dark">
                Justice Served With Modern Technology
              </h2>
              <p className="text-lg mb-6 text-court-wood-dark/80">
                Our platform maintains the dignity and tradition of the justice system while bringing modern efficiency to the court process.
              </p>
              <ul className="space-y-3">
                {[
                  "Digital case filing and management",
                  "Secure document handling and storage",
                  "Streamlined court scheduling",
                  "Enhanced communication between all parties",
                  "Comprehensive audit trails for all case activities"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-court-red mr-2 mt-0.5" />
                    <span className="text-court-wood-dark/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 bg-court-red hover:bg-court-red-dark">
                <Link to="/features">Explore All Features</Link>
              </Button>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center animate-fade-in-rotate">
              <div className="relative">
                <img 
                  src="/lovable-uploads/66df98b9-6cf6-4a82-8fa2-4bbd9007d56a.png" 
                  alt="Lady Justice" 
                  className="max-h-96 object-contain"
                />
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-court-red/10 to-court-wood/10 -z-10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 wood-pattern text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 text-center animate-scaleIn">
            <div className="p-5 rounded-lg bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/15">
              <p className="text-2xl md:text-3xl font-bold">{platformStats.clients}</p>
              <p className="font-medium text-sm mt-1 text-white/80">Clients</p>
            </div>
            <div className="p-5 rounded-lg bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/15">
              <p className="text-2xl md:text-3xl font-bold">{platformStats.lawyers}</p>
              <p className="font-medium text-sm mt-1 text-white/80">Lawyers</p>
            </div>
            <div className="p-5 rounded-lg bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/15">
              <p className="text-2xl md:text-3xl font-bold">{platformStats.judges}</p>
              <p className="font-medium text-sm mt-1 text-white/80">Judges</p>
            </div>
            <div className="p-5 rounded-lg bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/15">
              <p className="text-2xl md:text-3xl font-bold">{platformStats.casesResolved}</p>
              <p className="font-medium text-sm mt-1 text-white/80">Cases Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Flow Visualization Section */}
      <section id="case-flow" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-court-wood-dark">
            Case Lifecycle Management
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-court-wood-dark/80">
            Our platform guides cases through each stage of the judicial process with precision and transparency
          </p>
          
          <CaseFlowVisualization />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-court-wood-dark">
            Comprehensive Legal Management Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 flex court-box-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mr-4 bg-court-red/10 p-3 rounded-lg h-fit">
                  <feature.icon className="h-6 w-6 text-court-red" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-court-wood-dark">{feature.title}</h3>
                  <p className="text-court-wood-dark/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-court-red text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">What Legal Professionals Say</h2>
          
          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === activeTestimonial 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                  <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-white/80">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeTestimonial ? 'bg-white' : 'bg-white/30'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Role Access Section */}
      <section className="py-16 px-4 bg-white" id="login-options">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-court-wood-dark">
            Access By Role
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Client Box */}
            <Card className="border border-gray-200 hover:border-court-red transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-red/15 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-court-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-court-wood-dark">For Clients</h3>
                <Button variant="outline" asChild className="w-full hover:bg-court-red hover:text-white transition-colors">
                  <Link to="/login/client">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Lawyer Box */}
            <Card className="border border-gray-200 hover:border-court-red transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-red/15 flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-court-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-court-wood-dark">For Lawyers</h3>
                <Button variant="outline" asChild className="w-full hover:bg-court-red hover:text-white transition-colors">
                  <Link to="/login/lawyer">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Clerk Box */}
            <Card className="border border-gray-200 hover:border-court-red transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-red/15 flex items-center justify-center mb-4">
                  <PenSquare className="h-8 w-8 text-court-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-court-wood-dark">For Clerks</h3>
                <Button variant="outline" asChild className="w-full hover:bg-court-red hover:text-white transition-colors">
                  <Link to="/login/clerk">Login</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Judge Box */}
            <Card className="border border-gray-200 hover:border-court-red transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-court-red/15 flex items-center justify-center mb-4">
                  <Gavel className="h-8 w-8 text-court-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-court-wood-dark">For Judges</h3>
                <Button variant="outline" asChild className="w-full hover:bg-court-red hover:text-white transition-colors">
                  <Link to="/login/judge">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 wood-pattern text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Court Case Management?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who use our platform to streamline their 
            court case workflows and improve collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-court-red hover:bg-white/90 hover:text-court-red-dark transition-colors">
              <Link to="/login">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/login/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-court-wood-dark text-white/80 py-12 px-4">
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
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.504.344-1.857.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.041-.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
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
