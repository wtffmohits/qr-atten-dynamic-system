
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LectureCard, { LectureProps } from '@/components/LectureCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Teacher = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('active');
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Form states for new lecture
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [isAttendanceEnabled, setIsAttendanceEnabled] = useState(false);

  // Mock teacher data
  const teacherInfo = {
    name: 'Dr. Emily Johnson',
    id: 'TCH456',
    department: 'Computer Science',
    email: 'emily.johnson@example.edu',
    phone: '+1 234 567 890',
  };

  // Mock lectures data
  const lectures: LectureProps[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      subject: 'Computer Science 101',
      teacher: 'Dr. Emily Johnson',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      date: '2023-10-15',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Data Structures',
      subject: 'Computer Science 201',
      teacher: 'Dr. Emily Johnson',
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      date: '2023-10-15',
      status: 'active',
      attendanceCode: 'CS201-15102023',
    },
    {
      id: '3',
      title: 'Web Development',
      subject: 'Computer Science 301',
      teacher: 'Dr. Emily Johnson',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      date: '2023-10-16',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Database Management',
      subject: 'Computer Science 401',
      teacher: 'Dr. Emily Johnson',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      date: '2023-10-14',
      status: 'completed',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    if (teacherId && password) {
      setIsAuthenticated(true);
      toast({
        title: 'Login Successful',
        description: `Welcome, ${teacherInfo.name}`,
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Please enter valid credentials',
        variant: 'destructive',
      });
    }
  };

  const handleScheduleLecture = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    if (title && subject && date && startTime && endTime) {
      setShowScheduleDialog(false);
      toast({
        title: 'Lecture Scheduled',
        description: `${title} has been scheduled for ${format(date, 'PP')}`,
      });
      
      // Reset form
      setTitle('');
      setSubject('');
      setStartTime('09:00');
      setEndTime('10:30');
      setIsAttendanceEnabled(false);
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
    }
  };

  const handleAttendanceToggle = (lectureId: string) => {
    // In a real app, this would update the lecture status in the backend
    toast({
      title: 'Attendance Status Updated',
      description: `Attendance for lecture ${lectureId} has been toggled.`,
    });
  };

  const generateAttendanceCode = (lectureId: string) => {
    // In a real app, this would generate a unique code in the backend
    const code = `${lectureId}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Navigate to QR generator page with the generated code
    window.location.href = `/qr-generator?code=${code}`;
  };

  const filterLectures = (status: 'upcoming' | 'active' | 'completed') => {
    return lectures.filter(lecture => lecture.status === status);
  };

  if (!isAuthenticated) {
    return (
      <Layout className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Teacher Login</CardTitle>
            <CardDescription className="text-center">
              Enter your ID and password to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacherId">Teacher ID</Label>
                <Input
                  id="teacherId"
                  placeholder="Enter your teacher ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {teacherInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-center">{teacherInfo.name}</h3>
                  <p className="text-muted-foreground text-center">{teacherInfo.id}</p>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{teacherInfo.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-sm">{teacherInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{teacherInfo.phone}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setShowScheduleDialog(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Schedule New Lecture
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  View Attendance Reports
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="active" onValueChange={(value) => setActiveTabKey(value as any)}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">My Lectures</h2>
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="active" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterLectures('active').length > 0 ? (
                    filterLectures('active').map((lecture) => (
                      <Card key={lecture.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>{lecture.title}</CardTitle>
                          </div>
                          <CardDescription>{lecture.subject}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{lecture.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span>{lecture.startTime} - {lecture.endTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Attendance Code:</span>
                              <span className="font-mono">{lecture.attendanceCode || 'Not generated'}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between w-full">
                            <Label htmlFor={`attendance-${lecture.id}`}>Attendance Active</Label>
                            <Switch 
                              id={`attendance-${lecture.id}`} 
                              checked={!!lecture.attendanceCode} 
                              onCheckedChange={() => handleAttendanceToggle(lecture.id)}
                            />
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => generateAttendanceCode(lecture.id)}
                          >
                            Generate QR Code
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full p-8 text-center bg-muted rounded-lg">
                      <p className="text-muted-foreground">No active lectures at the moment.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterLectures('upcoming').length > 0 ? (
                    filterLectures('upcoming').map((lecture) => (
                      <Card key={lecture.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>{lecture.title}</CardTitle>
                          <CardDescription>{lecture.subject}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{lecture.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span>{lecture.startTime} - {lecture.endTime}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Edit Lecture
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full p-8 text-center bg-muted rounded-lg">
                      <p className="text-muted-foreground">No upcoming lectures scheduled.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterLectures('completed').length > 0 ? (
                    filterLectures('completed').map((lecture) => (
                      <Card key={lecture.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>{lecture.title}</CardTitle>
                          <CardDescription>{lecture.subject}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{lecture.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span>{lecture.startTime} - {lecture.endTime}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            View Attendance Report
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full p-8 text-center bg-muted rounded-lg">
                      <p className="text-muted-foreground">No completed lectures found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule New Lecture</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule a new lecture.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleLecture}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Lecture Title</Label>
                <Input
                  id="title"
                  placeholder="Enter lecture title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science 101">Computer Science 101</SelectItem>
                    <SelectItem value="Computer Science 201">Computer Science 201</SelectItem>
                    <SelectItem value="Computer Science 301">Computer Science 301</SelectItem>
                    <SelectItem value="Computer Science 401">Computer Science 401</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="attendance"
                  checked={isAttendanceEnabled}
                  onCheckedChange={setIsAttendanceEnabled}
                />
                <Label htmlFor="attendance">Enable attendance at start time</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Schedule Lecture</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Teacher;
