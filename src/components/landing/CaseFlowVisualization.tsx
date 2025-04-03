
import { useState, useEffect } from "react";
import { FileText, UserCheck, CalendarDays, Gavel, MessageSquare, FileCheck2, ScaleIcon, Scale } from "lucide-react";

// Case flow steps with their icons and descriptions
const caseSteps = [
  {
    id: "filing",
    icon: FileText,
    title: "Case Filing",
    description: "Initial case documentation is submitted to the court by the plaintiff or their attorney."
  },
  {
    id: "assignment",
    icon: UserCheck,
    title: "Court Assignment",
    description: "Case is reviewed by clerks and assigned to the appropriate court and judge."
  },
  {
    id: "scheduling",
    icon: CalendarDays,
    title: "Hearing Scheduled",
    description: "Initial hearing dates are set and all parties are notified."
  },
  {
    id: "discovery",
    icon: MessageSquare,
    title: "Discovery Phase",
    description: "Evidence and documents are exchanged between the parties."
  },
  {
    id: "hearing",
    icon: Gavel,
    title: "Court Hearings",
    description: "Formal presentations of evidence and arguments before the court."
  },
  {
    id: "deliberation",
    icon: Scale,
    title: "Deliberation",
    description: "Judge reviews evidence and arguments to reach a decision."
  },
  {
    id: "judgement",
    icon: FileCheck2,
    title: "Judgment Issued",
    description: "Final decision is rendered and officially recorded."
  }
];

export const CaseFlowVisualization = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-play animation
  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Progress through steps
  useEffect(() => {
    if (!isAnimating) return;
    
    if (activeStepIndex < caseSteps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStepIndex(prev => prev + 1);
      }, 1200); // Timing for each step
      
      return () => clearTimeout(timer);
    } else {
      // Reset animation after completion
      const timer = setTimeout(() => {
        setActiveStepIndex(-1);
        
        // Short pause before restarting
        setTimeout(() => {
          setActiveStepIndex(0);
        }, 1500);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [activeStepIndex, isAnimating]);
  
  return (
    <div className="relative py-16">
      {/* Progress line that connects all steps */}
      <div className="absolute top-24 left-0 w-full h-0.5 bg-gray-200"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {caseSteps.map((step, index) => {
          const isActive = index <= activeStepIndex;
          const isPast = index < activeStepIndex;
          const isCurrent = index === activeStepIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Animated line to previous step */}
              {index > 0 && (
                <div 
                  className={`case-flow-line ${isActive ? 'animate-progress-line' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    left: '-50%',
                    width: '100%'
                  }}
                ></div>
              )}
              
              {/* Step icon */}
              <div 
                className={`case-flow-icon ${
                  isActive ? 'animate-fade-in-scale' : ''
                } ${isPast ? 'bg-court-red text-white' : ''} ${
                  isCurrent ? 'ring-4 ring-court-red/30 bg-court-red text-white' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <step.icon size={24} />
              </div>
              
              {/* Step title and description */}
              <div 
                className={`mt-4 text-center ${
                  isActive ? 'animate-fadeIn' : 'opacity-50'
                }`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <h3 className="font-medium text-sm md:text-base text-court-wood-dark">{step.title}</h3>
                <p className="text-xs md:text-sm text-court-wood-dark/70 mt-1 hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile descriptions (shown only for active step) */}
      <div className="md:hidden mt-8 text-center">
        {activeStepIndex >= 0 && (
          <div className="animate-fadeIn">
            <p className="text-sm text-court-wood-dark/70">
              {caseSteps[activeStepIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
