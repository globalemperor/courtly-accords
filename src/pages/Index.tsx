
// Update the Index.tsx file to have a better-separated footer

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const IndexPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background py-4 border-b">
        <div className="container flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">CourtWise</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/features" className={navigationMenuTriggerStyle()}>Features</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/how-it-works" className={navigationMenuTriggerStyle()}>How It Works</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/login" className={navigationMenuTriggerStyle()}>Sign In</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Streamline Your Court Case Management</h1>
              <p className="text-xl text-muted-foreground">
                CourtWise provides legal professionals and clients with a comprehensive platform to manage court cases, documents, and communications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link to="/login?tab=signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="/placeholder.svg" 
                alt="CourtWise Dashboard" 
                className="rounded-lg border shadow-lg w-full aspect-video object-cover" 
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose CourtWise?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Streamlined Workflow</h3>
                <p className="text-muted-foreground mt-2">
                  Manage all your cases, hearings, and documents in one place for maximum efficiency.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Enhanced Collaboration</h3>
                <p className="text-muted-foreground mt-2">
                  Seamlessly collaborate with clients, lawyers, and court officials in real-time.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure & Compliant</h3>
                <p className="text-muted-foreground mt-2">
                  Bank-level security and compliance with legal data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section with clear separation */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to Transform Your Court Case Management?</h2>
              <p className="text-lg opacity-90">
                Join thousands of legal professionals who use CourtWise to streamline their court case workflows and improve collaboration.
              </p>
              <div className="pt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/login?tab=signup">Get Started Today</Link>
                </Button>
                <div className="mt-2 text-sm">Create an Account</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Company info column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">CourtWise</h3>
              <p className="text-muted-foreground max-w-md">
                Simplifying court case management for legal professionals and clients worldwide.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Links columns */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                  </li>
                  <li>
                    <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/help-center" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
                  </li>
                  <li>
                    <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
                  </li>
                  <li>
                    <Link to="/user-guides" className="text-muted-foreground hover:text-foreground transition-colors">User Guides</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-muted-foreground">
              <h4 className="font-semibold">Legal</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <Link to="/gdpr-compliance" className="hover:text-foreground transition-colors">GDPR Compliance</Link>
              </div>
            </div>
            <div className="text-sm text-muted-foreground md:text-right">
              © {new Date().getFullYear()} CourtWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
