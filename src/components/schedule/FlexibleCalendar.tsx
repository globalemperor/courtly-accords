import { useState, useEffect } from "react";
import { addDays, format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, parseISO, isValid } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { useHearingNotifications } from "@/services/HearingNotificationService";

interface FlexibleCalendarProps {
  viewMode: "day" | "week" | "month" | "custom";
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

type CalendarView = "day" | "week" | "month" | "custom";

export const FlexibleCalendar = ({ 
  viewMode = "week", 
  selectedDate = new Date(), 
  onDateSelect 
}: FlexibleCalendarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { cases, hearings: allHearings, addHearing, updateHearing } = useData();
  const hearingNotifications = useHearingNotifications();
  
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const [view, setView] = useState<CalendarView>(viewMode);
  const [customRange, setCustomRange] = useState<{ start: string; end: string }>({
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(addDays(new Date(), 7), 'yyyy-MM-dd')
  });
  
  useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);
  
  useEffect(() => {
    setView(viewMode);
  }, [viewMode]);
  
  const filteredHearings = allHearings.filter(hearing => {
    if (!user) return false;
    
    if (user.role === 'judge') {
      const relatedCase = cases.find(c => c.id === hearing.caseId);
      return relatedCase?.judgeName === user.name || relatedCase?.judgeId === user.id;
    }
    
    if (user.role === 'lawyer') {
      const relatedCase = cases.find(c => c.id === hearing.caseId);
      return relatedCase?.lawyerId === user.id;
    }
    
    if (user.role === 'client') {
      const relatedCase = cases.find(c => c.id === hearing.caseId);
      return relatedCase?.clientId === user.id;
    }
    
    if (user.role === 'clerk') {
      return true;
    }
    
    return false;
  });
  
  useEffect(() => {
    hearingNotifications.startNotificationService(filteredHearings, user);
    
    return () => {
      hearingNotifications.stopNotificationService();
    };
  }, [filteredHearings, user]);

  const getDaysForView = () => {
    switch (view) {
      case 'day':
        return [currentDate];
      case 'week':
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        return Array.from({ length: 7 }, (_, i) => addDays(start, i));
      case 'month':
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        return eachDayOfInterval({ start: monthStart, end: monthEnd });
      case 'custom':
        try {
          const startDate = parseISO(customRange.start);
          const endDate = parseISO(customRange.end);
          
          if (!isValid(startDate) || !isValid(endDate)) {
            console.error("Invalid date in custom range", { startDate, endDate });
            return [currentDate];
          }
          
          if (startDate > endDate) {
            console.warn("Start date is after end date in custom range");
            return [currentDate];
          }
          
          return eachDayOfInterval({ start: startDate, end: endDate });
        } catch (e) {
          console.error("Error parsing custom date range", e);
          return [currentDate];
        }
      default:
        return [currentDate];
    }
  };

  const getHearingsForDay = (day: Date) => {
    return filteredHearings.filter(hearing => {
      try {
        const hearingDate = new Date(hearing.date);
        return isSameDay(hearingDate, day);
      } catch (e) {
        console.error("Error parsing hearing date", e, hearing);
        return false;
      }
    });
  };

  const handleDateClick = (day: Date) => {
    if (onDateSelect) {
      onDateSelect(day);
    }
    setCurrentDate(day);
  };

  const navigatePrevious = () => {
    switch (view) {
      case 'day':
        const prevDay = addDays(currentDate, -1);
        setCurrentDate(prevDay);
        if (onDateSelect) onDateSelect(prevDay);
        break;
      case 'week':
        const prevWeek = subWeeks(currentDate, 1);
        setCurrentDate(prevWeek);
        if (onDateSelect) onDateSelect(prevWeek);
        break;
      case 'month':
        const prevMonth = subMonths(currentDate, 1);
        setCurrentDate(prevMonth);
        if (onDateSelect) onDateSelect(prevMonth);
        break;
      case 'custom':
        break;
    }
  };

  const navigateNext = () => {
    switch (view) {
      case 'day':
        const nextDay = addDays(currentDate, 1);
        setCurrentDate(nextDay);
        if (onDateSelect) onDateSelect(nextDay);
        break;
      case 'week':
        const nextWeek = addWeeks(currentDate, 1);
        setCurrentDate(nextWeek);
        if (onDateSelect) onDateSelect(nextWeek);
        break;
      case 'month':
        const nextMonth = addMonths(currentDate, 1);
        setCurrentDate(nextMonth);
        if (onDateSelect) onDateSelect(nextMonth);
        break;
      case 'custom':
        break;
    }
  };

  const navigateToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (onDateSelect) onDateSelect(today);
  };

  const renderDateCell = (day: Date) => {
    if (!isValid(day)) {
      console.error("Invalid date object in renderDateCell", day);
      return <div className="border p-2 bg-muted/30">Invalid date</div>;
    }
    
    const dayHearings = getHearingsForDay(day);
    const isCurrentMonth = view === 'month' ? isSameMonth(day, currentDate) : true;
    const isToday = isSameDay(day, new Date());
    const isSelected = isSameDay(day, selectedDate);

    return (
      <div
        key={day.toString()}
        className={`border p-2 ${
          isCurrentMonth ? '' : 'bg-muted/30 text-muted-foreground'
        } ${isToday ? 'bg-primary/10 border-primary' : ''} 
        ${isSelected ? 'bg-primary/20 border-primary' : ''} 
        cursor-pointer hover:bg-primary/5 transition-colors`}
        onClick={() => handleDateClick(day)}
      >
        <div className="text-right mb-1">
          <span className={`text-sm font-medium inline-block w-7 h-7 leading-7 text-center rounded-full
            ${isToday ? 'bg-primary text-primary-foreground' : ''}
            ${isSelected && !isToday ? 'bg-primary/70 text-primary-foreground' : ''}`}>
            {format(day, 'd')}
          </span>
        </div>
        <div className="space-y-1 max-h-36 overflow-y-auto">
          {dayHearings.length > 0 ? (
            dayHearings.map(hearing => (
              <Dialog key={hearing.id}>
                <DialogTrigger asChild>
                  <button className="w-full text-left" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs">
                      {hearing.time} - {hearing.description.substring(0, 20)}
                      {hearing.description.length > 20 ? '...' : ''}
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                  <DialogHeader>
                    <DialogTitle>Hearing Details</DialogTitle>
                    <DialogDescription>
                      {format(new Date(hearing.date), 'EEEE, MMMM d, yyyy')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid gap-2">
                      <h3 className="font-medium">{hearing.description}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{hearing.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{hearing.location}</span>
                            </div>
                            <div className="mt-2">{hearing.description}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <Badge>{hearing.status}</Badge>
                            {hearing.notes && (
                              <div className="mt-2">
                                <span className="text-muted-foreground">Notes: </span>
                                {hearing.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        toast({
                          title: "View Full Details",
                          description: "This would navigate to the full hearing details page",
                        });
                      }}
                    >
                      View Full Details
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="text-xs text-muted-foreground text-center py-1">No hearings</div>
          )}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const day = currentDate;
    
    if (!isValid(day)) {
      console.error("Invalid date object in renderDayView", day);
      return <div className="text-center py-8 text-destructive">Invalid date</div>;
    }
    
    const dayHearings = getHearingsForDay(day);

    return (
      <div className="space-y-4">
        <div className="text-center text-xl font-semibold">
          {format(day, 'EEEE, MMMM d, yyyy')}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Hearings</CardTitle>
          </CardHeader>
          <CardContent>
            {dayHearings.length > 0 ? (
              <div className="space-y-4">
                {dayHearings.map(hearing => (
                  <div key={hearing.id} className="flex border-b pb-3 last:border-0">
                    <div className="w-24 text-center">
                      <div className="font-medium">{hearing.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{hearing.description}</div>
                      <div className="text-sm text-muted-foreground">{hearing.location}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline">{hearing.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center text-muted-foreground gap-2">
                <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
                <div>No hearings scheduled for this day</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getDaysForView();
    
    if (!days.length || !days.every(isValid)) {
      console.error("Invalid days array in renderWeekView", days);
      return <div className="text-center py-8 text-destructive">Error: Invalid date range</div>;
    }

    return (
      <div className="space-y-4">
        <div className="text-center text-xl font-semibold">
          {isValid(days[0]) && isValid(days[6]) ? 
            `Week of ${format(days[0], 'MMMM d')} - ${format(days[6], 'MMMM d, yyyy')}` : 
            "Invalid date range"}
        </div>
        <div className="grid grid-cols-7 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => isValid(day) ? 
            renderDateCell(day) : 
            <div key={index} className="border p-2 bg-muted/30">Invalid date</div>
          )}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysForView();
    
    if (!days.length || !days.every(isValid)) {
      console.error("Invalid days array in renderMonthView", days);
      return <div className="text-center py-8 text-destructive">Error: Invalid date range</div>;
    }
    
    const firstDayOfMonth = startOfMonth(currentDate);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const adjustedFirstDay = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    const leadingBlanks = adjustedFirstDay - 1;
    
    const blankCells = Array(leadingBlanks).fill(null).map((_, index) => (
      <div key={`blank-${index}`} className="border p-2 bg-muted/10"></div>
    ));

    return (
      <div className="space-y-4">
        <div className="text-center text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </div>
        <div className="grid grid-cols-7 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {blankCells}
          {days.map(day => renderDateCell(day))}
        </div>
      </div>
    );
  };

  const renderCustomView = () => {
    const days = getDaysForView();
    
    if (!days.length) {
      console.error("Empty days array in renderCustomView");
      return <div className="text-center py-8 text-destructive">Error: Please select a valid date range</div>;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="space-y-1">
              <Label htmlFor="start-date">Start Date</Label>
              <Input 
                id="start-date" 
                type="date" 
                value={customRange.start}
                onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-date">End Date</Label>
              <Input 
                id="end-date" 
                type="date" 
                value={customRange.end}
                onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-auto">
          <div className="min-w-[600px]">
            <div className="grid auto-cols-fr" style={{ display: 'grid', gridTemplateColumns: `repeat(${days.length}, minmax(150px, 1fr))` }}>
              {days.map((day, index) => (
                <div key={index} className="font-medium text-center py-2">
                  {format(day, 'E, MMM d')}
                </div>
              ))}
            </div>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${days.length}, minmax(150px, 1fr))` }}>
              {days.map(day => renderDateCell(day))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={navigateToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={(value) => setView(value as CalendarView)}>
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
          {renderCustomView()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
