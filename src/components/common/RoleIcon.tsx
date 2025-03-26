
import { UserRole } from "@/types";
import { Gavel, User, UserCog, Scale, PenLine } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const RoleIcon = ({ role, showDropdown = false }: { role: UserRole, showDropdown?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname.includes("signup");
  const path = isSignUp ? "/login/signup?role=" : "/login/";
  
  let Icon, color;
  
  switch (role) {
    case 'client':
      Icon = User;
      color = "text-blue-500";
      break;
    case 'lawyer':
      Icon = Scale;
      color = "text-green-500";
      break;
    case 'clerk':
      Icon = UserCog;
      color = "text-purple-500";
      break;
    case 'judge':
      Icon = Gavel;
      color = "text-red-500";
      break;
    default:
      Icon = User;
      color = "text-blue-500";
  }
  
  if (!showDropdown) {
    return <Icon className={`h-10 w-10 ${color}`} />;
  }
  
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer relative group">
                <Icon className={`h-10 w-10 ${color}`} />
                <div className="absolute -right-1 -bottom-1 bg-gray-100 rounded-full p-0.5 border border-gray-200 shadow-sm group-hover:bg-gray-200 transition-colors">
                  <PenLine className="h-3.5 w-3.5 text-gray-600" />
                </div>
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change role</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => navigate(`${path}client`)}>
          <User className="h-4 w-4 text-blue-500 mr-2" /> Client
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`${path}lawyer`)}>
          <Scale className="h-4 w-4 text-green-500 mr-2" /> Lawyer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`${path}clerk`)}>
          <UserCog className="h-4 w-4 text-purple-500 mr-2" /> Clerk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`${path}judge`)}>
          <Gavel className="h-4 w-4 text-red-500 mr-2" /> Judge
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
