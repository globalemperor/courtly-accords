
import { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { FlexibleCalendar } from "@/components/schedule/FlexibleCalendar";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Schedule = () => {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "custom">("week");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Format the selected date to display
  const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">Manage your hearings and upcoming appointments</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Card className="flex items-center p-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm">{formattedDate}</span>
          </Card>
          
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-[400px]">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <FlexibleCalendar viewMode={viewMode} selectedDate={selectedDate} onDateSelect={setSelectedDate} />
    </div>
  );
};

export default Schedule;
