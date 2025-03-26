
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { Gavel, User, UserCog, Scale, PenLine, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { UserRole } from "@/types";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { RoleIcon } from "@/components/common/RoleIcon";
import { CustomSignUpForm } from "@/components/auth/CustomSignUpForm";

const getRoleTitle = (role: UserRole) => {
  switch (role) {
    case 'client': return "Client";
    case 'lawyer': return "Lawyer";
    case 'clerk': return "Clerk";
    case 'judge': return "Judge";
  }
};

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
  const location = useLocation();
  const { role } = useParams<{ role?: string }>();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") as UserRole || "client";
  
  const isSignUp = location.pathname.includes("signup");

  // Ensure role is a valid UserRole
  const validRole = (role as UserRole) || defaultRole;

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-court-gray to-court-blue/10 p-4">
      {/* Left side - branding (hidden on mobile) */}
      <div className={`hidden md:flex flex-col items-center md:items-start space-y-8 md:w-1/2 p-8 transition-all duration-700 ease-in-out ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-court-blue flex items-center justify-center">
            <Gavel className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-court-blue">CourtWise</h1>
            <p className="text-muted-foreground">Court Case Management System</p>
          </div>
        </div>
        
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-3 text-court-blue-dark">Justice Made Efficient</h2>
          <p className="text-muted-foreground mb-6">
            CourtWise helps streamline court case management, connecting clients, lawyers, 
            clerks, and judges in one seamless platform.
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-court-blue hover:underline font-medium text-sm flex items-center">
                <Info className="h-4 w-4 mr-1" /> How to use CourtWise
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Getting Started with CourtWise</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="space-y-4 mt-2 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="border-b pb-3">
                      <h3 className="text-lg font-semibold mb-2">For Clients</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Sign up or log in as a client</li>
                        <li>Browse available lawyers and send case requests</li>
                        <li>Once connected with a lawyer, track your case progress</li>
                        <li>Communicate directly with your lawyer through the messaging system</li>
                        <li>Receive notifications about upcoming hearings and case updates</li>
                      </ol>
                    </div>
                    
                    <div className="border-b pb-3">
                      <h3 className="text-lg font-semibold mb-2">For Lawyers</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Sign up or log in as a lawyer</li>
                        <li>View and accept client case requests</li>
                        <li>File cases through the system</li>
                        <li>Manage all your clients and cases from your dashboard</li>
                        <li>Communicate with clients, clerks, and indirectly with judges</li>
                      </ol>
                    </div>
                    
                    <div className="border-b pb-3">
                      <h3 className="text-lg font-semibold mb-2">For Clerks</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Sign up or log in as a court clerk</li>
                        <li>Process new case filings</li>
                        <li>Coordinate with lawyers and judges</li>
                        <li>Manage court schedules and hearing assignments</li>
                        <li>Maintain court records and documentation</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">For Judges</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Sign up or log in as a judge</li>
                        <li>View your docket of assigned cases</li>
                        <li>Schedule and reschedule hearings when necessary</li>
                        <li>Review case details and submitted evidence</li>
                        <li>Issue judgments and rulings directly through the platform</li>
                      </ol>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Got it</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {/* Right side - auth form */}
      <div className={`md:w-1/2 w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        {/* Mobile branding - visible only on small screens */}
        <div className="md:hidden flex flex-col items-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-court-blue flex items-center justify-center">
              <Gavel className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">CourtWise</h1>
          <p className="text-muted-foreground">Court Case Management System</p>
        </div>
        
        {isSignUp ? (
          <CustomSignUpForm defaultRole={validRole} />
        ) : (
          <SignInForm role={validRole} />
        )}
      </div>
    </div>
  );
};

export default Login;
