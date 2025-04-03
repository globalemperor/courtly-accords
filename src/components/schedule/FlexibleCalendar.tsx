
import { useState } from "react";
import { addDays, format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hearing } from "@/types";
import { useData } from "@/context/DataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CalendarView = "day" | "week" | "month" | "custom";

export const FlexibleCalendar = () => {
  const { hearings, cases } = useData();
  const [view, setView] = useState<CalendarView>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [customRange, setCustomRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Find case title by caseId
  const getCaseTitle = (caseId: string) => {
    const foundCase = cases.find((c) => c.id === caseId);
    return foundCase?.title || `Case #${caseId}`;
  };

  // Helper to group hearings by date
  const groupHearingsByDate = (hearings: Hearing[]) => {
    const grouped: Record<string, Hearing[]> = {};
    
    hearings.forEach((hearing) => {
      const date = hearing.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(hearing);
    });
    
    return grouped;
  };

  // Get hearings for the current view
  const getFilteredHearings = () => {
    if (view === "day") {
      const dateString = format(currentDate, "yyyy-MM-dd");
      return hearings.filter((h) => h.date === dateString);
    }
    
    if (view === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = addDays(weekStart, 6);
      return hearings.filter((h) => {
        const hearingDate = new Date(h.date);
        return hearingDate >= weekStart && hearingDate <= weekEnd;
      });
    }
    
    if (view === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      return hearings.filter((h) => {
        const hearingDate = new Date(h.date);
        return hearingDate >= monthStart && hearingDate <= monthEnd;
      });
    }
    
    if (view === "custom") {
      return hearings.filter((h) => {
        const hearingDate = new Date(h.date);
        return hearingDate >= customRange.from && hearingDate <= customRange.to;
      });
    }
    
    return [];
  };

  const filteredHearings = getFilteredHearings();
  const groupedHearings = groupHearingsByDate(filteredHearings);

  // Navigation handlers
  const handlePrevious = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  // Render date range title
  const renderDateRangeTitle = () => {
    if (view === "day") {
      return format(currentDate, "MMMM d, yyyy");
    } else if (view === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = addDays(weekStart, 6);
      return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
    } else if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (view === "custom") {
      return `${format(customRange.from, "MMM d")} - ${format(customRange.to, "MMM d, yyyy")}`;
    }
    return "";
  };

  // Render day cells for month view
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = addDays(startOfWeek(monthEnd, { weekStartsOn: 1 }), 34); // Ensure we have 5 weeks (35 days)
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dateString = format(day, "yyyy-MM-dd");
          const dayHearings = groupedHearings[dateString] || [];
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-24 p-1 border border-border rounded-md",
                !isCurrentMonth && "opacity-40 bg-muted/30",
                isToday && "bg-muted"
              )}
            >
              <div className="text-right text-xs font-medium p-1">
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayHearings.slice(0, 3).map((hearing) => (
                  <div
                    key={hearing.id}
                    className="bg-primary/10 text-xs p-1 rounded truncate"
                    title={getCaseTitle(hearing.caseId)}
                  >
                    {hearing.time} - {getCaseTitle(hearing.caseId).substring(0, 14)}
                    {getCaseTitle(hearing.caseId).length > 14 ? "..." : ""}
                  </div>
                ))}
                {dayHearings.length > 3 && (
                  <div className="text-xs text-center text-muted-foreground">
                    +{dayHearings.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "text-center py-2 font-medium",
                isSameDay(day, new Date()) && "bg-muted rounded-md"
              )}
            >
              <div>{format(day, "EEE")}</div>
              <div className="text-lg">{format(day, "d")}</div>
            </div>
          ))}
        </div>
        
        <ScrollArea className="h-[400px]">
          {days.map((day) => {
            const dateString = format(day, "yyyy-MM-dd");
            const dayHearings = groupedHearings[dateString] || [];
            
            return (
              <div key={day.toString()} className="mb-4">
                <h3 className="font-medium mb-2">{format(day, "EEEE, MMMM d")}</h3>
                {dayHearings.length > 0 ? (
                  <div className="space-y-2">
                    {dayHearings.map((hearing) => (
                      <Card key={hearing.id} className="overflow-hidden">
                        <CardContent className="p-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{getCaseTitle(hearing.caseId)}</div>
                              <div className="text-sm text-muted-foreground">
                                {hearing.time} • {hearing.location}
                              </div>
                            </div>
                            <Badge>{hearing.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No hearings scheduled
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const dateString = format(currentDate, "yyyy-MM-dd");
    const dayHearings = groupedHearings[dateString] || [];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>{format(currentDate, "EEEE, MMMM d, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent>
          {dayHearings.length > 0 ? (
            <div className="space-y-4">
              {dayHearings.map((hearing) => (
                <Card key={hearing.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">{getCaseTitle(hearing.caseId)}</h3>
                      <Badge>{hearing.status}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{hearing.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Gavel className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{hearing.location}</span>
                      </div>
                      <div className="mt-2">{hearing.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No hearings scheduled for today
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Render custom range view
  const renderCustomRangeView = () => {
    const daysInRange = Object.keys(groupedHearings).sort();
    
    return (
      <ScrollArea className="h-[500px]">
        <div className="space-y-6">
          {daysInRange.length > 0 ? (
            daysInRange.map((dateString) => {
              const day = new Date(dateString);
              const dayHearings = groupedHearings[dateString] || [];
              
              return (
                <div key={dateString}>
                  <h3 className="font-medium mb-2">{format(day, "EEEE, MMMM d, yyyy")}</h3>
                  <div className="space-y-2">
                    {dayHearings.map((hearing) => (
                      <Card key={hearing.id}>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{getCaseTitle(hearing.caseId)}</div>
                              <div className="text-sm text-muted-foreground">
                                {hearing.time} • {hearing.location}
                              </div>
                            </div>
                            <Badge>{hearing.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No hearings scheduled in selected date range
            </div>
          )}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Schedule</h2>
          <p className="text-muted-foreground">Manage your hearings and appointments</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-32 text-center">{renderDateRangeTitle()}</span>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
      </div>
      
      <Tabs value={view} onValueChange={(v) => setView(v as CalendarView)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="custom">Custom Range</TabsTrigger>
          </TabsList>
          
          {view === "custom" && (
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal w-[240px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customRange.from ? (
                      customRange.to ? (
                        <>
                          {format(customRange.from, "LLL dd, y")} -{" "}
                          {format(customRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(customRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: customRange.from,
                      to: customRange.to,
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setCustomRange({
                          from: range.from,
                          to: range.to,
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <TabsContent value="day" className="mt-0">
          {renderDayView()}
        </TabsContent>
        
        <TabsContent value="week" className="mt-0">
          {renderWeekView()}
        </TabsContent>
        
        <TabsContent value="month" className="mt-0">
          {renderMonthView()}
        </TabsContent>
        
        <TabsContent value="custom" className="mt-0">
          {renderCustomRangeView()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
