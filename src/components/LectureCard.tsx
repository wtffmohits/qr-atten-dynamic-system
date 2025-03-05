
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LectureProps {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
  attendanceCode?: string;
  onAttendanceClick?: () => void;
  className?: string;
}

const LectureCard: React.FC<LectureProps> = ({
  id,
  title,
  subject,
  teacher,
  startTime,
  endTime,
  date,
  status,
  attendanceCode,
  onAttendanceClick,
  className,
}) => {
  const isAttendanceActive = status === 'active';

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {attendanceCode && (
            <div className="text-xs font-medium text-muted-foreground">
              Code: {attendanceCode}
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">{subject}</div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{teacher}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {startTime} - {endTime}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={onAttendanceClick}
          disabled={!isAttendanceActive}
          className={cn(
            "w-full transition-all",
            isAttendanceActive
              ? "bg-primary hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isAttendanceActive ? "Mark Attendance" : "Attendance Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LectureCard;
