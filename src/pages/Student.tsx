
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LectureCard, { LectureProps } from '@/components/LectureCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import QRCode from '@/components/QRCode';

const Student = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('upcoming');
  const [scannedCode, setScannedCode] = useState('');

  // Mock student data
  const studentInfo = {
    name: 'John Doe',
    rollNumber: 'STU123',
    course: 'Computer Science',
    semester: '4th',
    department: 'Engineering',
    macAddress: '00:1A:2B:3C:4D:5E',
  };

  // Mock lectures data
  const lectures: LectureProps[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      subject: 'Computer Science 101',
      teacher: 'Dr. Smith',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      date: '2023-10-15',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Data Structures',
      subject: 'Computer Science 201',
      teacher: 'Prof. Johnson',
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
      teacher: 'Dr. Williams',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      date: '2023-10-16',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Database Management',
      subject: 'Computer Science 401',
      teacher: 'Prof. Davis',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      date: '2023-10-14',
      status: 'completed',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials against a backend
    if (rollNumber && password) {
      setIsAuthenticated(true);
      toast({
        title: 'Login Successful',
        description: `Welcome, Student ${rollNumber}`,
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Please enter valid credentials',
        variant: 'destructive',
      });
    }
  };

  const handleAttendanceClick = (lecture: LectureProps) => {
    setShowQRScanner(true);
  };

  const handleQRCodeScanned = () => {
    // In a real app, this would validate the QR code and MAC address
    const isValidMAC = true; // Simulating MAC address validation
    
    if (scannedCode && isValidMAC) {
      setShowQRScanner(false);
      toast({
        title: 'Attendance Marked',
        description: 'Your attendance has been successfully recorded.',
      });
    } else {
      toast({
        title: 'Attendance Failed',
        description: 'MAC address verification failed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const filterLectures = (status: 'upcoming' | 'active' | 'completed') => {
    return lectures.filter(lecture => lecture.status === status);
  };

  if (!isAuthenticated) {
    return (
      <Layout className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Student Login</CardTitle>
            <CardDescription className="text-center">
              Enter your roll number and password to access your lectures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter your roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {studentInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-center">{studentInfo.name}</h3>
                  <p className="text-muted-foreground text-center">{studentInfo.rollNumber}</p>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span>{studentInfo.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Semester:</span>
                    <span>{studentInfo.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{studentInfo.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Device ID:</span>
                    <span className="font-mono text-xs">{studentInfo.macAddress}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" onValueChange={(value) => setActiveTabKey(value as any)}>
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
                      <LectureCard
                        key={lecture.id}
                        {...lecture}
                        onAttendanceClick={() => handleAttendanceClick(lecture)}
                      />
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
                      <LectureCard key={lecture.id} {...lecture} />
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
                      <LectureCard key={lecture.id} {...lecture} />
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
      
      <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code for Attendance</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="mockup-qr-scanner p-4 bg-gray-100 rounded-lg border">
              <div className="w-64 h-64 flex items-center justify-center bg-white">
                <p className="text-center text-muted-foreground">
                  QR Scanner Simulation
                  <br /><br />
                  In a real app, this would be a camera view for scanning.
                </p>
              </div>
            </div>
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qrcode">Enter QR Code Value (for simulation)</Label>
                <Input
                  id="qrcode"
                  placeholder="Enter QR code value"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                />
              </div>
              <Button onClick={handleQRCodeScanned} className="w-full">
                Submit Attendance
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Student;
