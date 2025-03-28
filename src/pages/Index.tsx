
import { Button } from "@/components/ui/button";
import { Gavel, Scale, Users, BookOpen, ArrowRight, CheckCircle2, Briefcase, 
  BarChart4, Shield, Info, UserCog, MoveRight, MessageSquare, Calendar } from "lucide-react";
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
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Modern Design */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-court-blue/95 via-court-blue/90 to-court-blue-dark/95"></div>
        </div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float animation-delay-600"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float animation-delay-400"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-4 relative z-20">
          <div className="flex flex-col items-center">
            <div className="mb-8 animate-fadeIn">
              <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm border border-white/10 mb-4">
                The Future of Legal Case Management
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Legal Practice</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                The comprehensive platform for managing court cases with efficiency, 
                transparency, and collaboration between all legal participants.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-6 animate-fadeIn animation-delay-200">
              <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg">
                <Link to="/login">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10 transition-all px-8 py-6 text-lg">
                <a href="#features" className="flex items-center gap-2">
                  Explore Features <MoveRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn animation-delay-400">
              <div className="glass-card p-3 px-5 flex items-center justify-center">
                <p className="text-sm font-medium text-white">500+ Law Firms</p>
              </div>
              <div className="glass-card p-3 px-5 flex items-center justify-center">
                <p className="text-sm font-medium text-white">GDPR Compliant</p>
              </div>
              <div className="glass-card p-3 px-5 flex items-center justify-center">
                <p className="text-sm font-medium text-white">ISO 27001 Certified</p>
              </div>
              <div className="glass-card p-3 px-5 flex items-center justify-center">
                <p className="text-sm font-medium text-white">99.9% Uptime</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,197.3C672,203,768,181,864,154.7C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-court-blue mb-4">
              Trusted by Legal Professionals
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of clients, lawyers, judges, and court clerks who use CourtWise daily.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {Object.entries(platformStats).map(([key, value], index) => (
              <div key={key} className="card-hover-effect bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md p-6 text-center border border-gray-100">
                <p className="text-3xl md:text-4xl font-bold text-court-blue mb-2">{value}</p>
                <p className="text-gray-600 font-medium capitalize">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Role Cards - Simplified and Visually Enhanced */}
      <section className="py-20 px-4 bg-gray-50" id="login-options">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-court-blue mb-4">
              Tailored for Every Court Participant
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select your role to access a customized experience designed specifically for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Client Card */}
            <Card className="border-none rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fadeIn">
              <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Users className="h-14 w-14 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">For Clients</h3>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 group-hover:shadow-md transition-all">
                  <Link to="/login/client">Log In</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Lawyer Card */}
            <Card className="border-none rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-200">
              <div className="h-28 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Scale className="h-14 w-14 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">For Lawyers</h3>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600 group-hover:shadow-md transition-all">
                  <Link to="/login/lawyer">Log In</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Clerk Card */}
            <Card className="border-none rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-400">
              <div className="h-28 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <UserCog className="h-14 w-14 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">For Clerks</h3>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 group-hover:shadow-md transition-all">
                  <Link to="/login/clerk">Log In</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Judge Card */}
            <Card className="border-none rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fadeIn animation-delay-600">
              <div className="h-28 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Gavel className="h-14 w-14 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">For Judges</h3>
                <Button asChild className="w-full bg-red-500 hover:bg-red-600 group-hover:shadow-md transition-all">
                  <Link to="/login/judge">Log In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features Section with Visual Enhancement */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-court-blue mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools needed to manage legal cases efficiently from filing to resolution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Management Feature */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-100 shadow-md p-8 hover:shadow-lg transition-all animate-fadeIn">
              <div className="flex items-start">
                <div className="mr-6 bg-gradient-to-br from-court-blue to-blue-500 p-4 rounded-xl shadow-md">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-court-blue-dark">Case Management</h3>
                  <p className="text-gray-700 mb-4">Create, view, update, and track court cases with comprehensive details and document management.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Case creation and lifecycle tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Document storage and version control</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Real-time status updates and notifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* User Role-Based Access Feature */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl border border-purple-100 shadow-md p-8 hover:shadow-lg transition-all animation-delay-200 animate-fadeIn">
              <div className="flex items-start">
                <div className="mr-6 bg-gradient-to-br from-purple-600 to-purple-500 p-4 rounded-xl shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-800">Role-Based Access</h3>
                  <p className="text-gray-700 mb-4">Tailored interfaces for clients, lawyers, clerks, and judges with appropriate permissions.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Personalized dashboards for each role</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Customized navigation and functionality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Data visibility controls for security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Hearing Scheduling Feature */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl border border-green-100 shadow-md p-8 hover:shadow-lg transition-all animation-delay-400 animate-fadeIn">
              <div className="flex items-start">
                <div className="mr-6 bg-gradient-to-br from-green-600 to-green-500 p-4 rounded-xl shadow-md">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-green-800">Hearing Scheduling</h3>
                  <p className="text-gray-700 mb-4">Schedule and manage court hearings, with notifications for all involved parties.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Automated scheduling optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Calendar integration and reminders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Conflict detection and resolution</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Secure Communication Feature */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl border border-amber-100 shadow-md p-8 hover:shadow-lg transition-all animation-delay-600 animate-fadeIn">
              <div className="flex items-start">
                <div className="mr-6 bg-gradient-to-br from-amber-500 to-amber-400 p-4 rounded-xl shadow-md">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-amber-800">Secure Communication</h3>
                  <p className="text-gray-700 mb-4">Built-in messaging system for direct communication between all authorized parties.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">End-to-end encrypted messaging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Role-based communication controls</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-600">Searchable message history</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background with overlay gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-court-blue/95 to-court-blue-dark/95"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
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
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1 pl-4">
                  <div className="glass-card p-8 rounded-xl h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 text-3xl text-white/60">"</div>
                      <p className="text-white text-lg italic mb-6 leading-relaxed">{testimonial.quote}</p>
                      <div className="mt-auto pt-4 border-t border-white/10">
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
      
      {/* Additional Features Visual Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-court-blue">
              More Powerful Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore additional features that make CourtWise the most comprehensive court case management platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
            <Card className="bg-white border-none overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Document Management</h3>
                <p className="text-gray-600">
                  Store, organize, and share legal documents securely within the platform with version control.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white border-none overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl animation-delay-200">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <BarChart4 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-time Analytics</h3>
                <p className="text-gray-600">
                  View detailed analytics on case progress, outcomes, and performance metrics to optimize your practice.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white border-none overflow-hidden hover:shadow-lg transition-all duration-300 rounded-xl animation-delay-400">
              <div className="p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure & Compliant</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with full compliance to legal data protection standards and regulations.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Visual Enhancement */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-court-blue-dark to-court-blue"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-xl animate-float animation-delay-400"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fadeIn">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            Join thousands of legal professionals who use CourtWise to streamline their workflows and improve collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fadeIn animation-delay-400">
            <Button size="lg" asChild className="bg-white text-court-blue hover:bg-white/90 hover:shadow-lg transition-all px-8 py-6 text-lg">
              <Link to="/login">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/20 transition-all px-8 py-6 text-lg">
              <Link to="/how-it-works">See How It Works</Link>
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
