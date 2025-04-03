
import { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FlexibleCalendar } from "@/components/schedule/FlexibleCalendar";

const Schedule = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "custom">("week");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">Manage your hearings and upcoming appointments</p>
        </div>
        
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-[400px]">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <FlexibleCalendar viewMode={viewMode} />
    </div>
  );
};

export default Schedule;
