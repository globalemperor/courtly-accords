
import { FlexibleCalendar } from "@/components/schedule/FlexibleCalendar";

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <p className="text-muted-foreground">Manage your hearings and upcoming appointments</p>
      </div>

      <FlexibleCalendar />
    </div>
  );
};

export default Schedule;
