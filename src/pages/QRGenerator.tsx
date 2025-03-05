
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import QRCode from '@/components/QRCode';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useLocation } from 'react-router-dom';

const QRGenerator = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [teacherCode, setTeacherCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [activeQRCode, setActiveQRCode] = useState('');
  const [lectureInfo, setLectureInfo] = useState<{
    title: string;
    subject: string;
    teacher: string;
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    // Check if code was passed in URL
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      setTeacherCode(code);
      validateTeacherCode(code);
    }
  }, [location.search]);

  const validateTeacherCode = (code: string) => {
    // In a real app, this would validate against a backend
    // For demo, we'll simulate validation
    if (code && code.length > 5) {
      setIsCodeValid(true);
      setActiveQRCode(code);
      
      // Mock lecture info
      setLectureInfo({
        title: 'Data Structures',
        subject: 'Computer Science 201',
        teacher: 'Dr. Emily Johnson',
        date: '2023-10-15',
        time: '11:00 AM - 12:30 PM',
      });
      
      toast({
        title: 'Code Validated',
        description: 'QR code is now being generated for attendance.',
      });
    } else {
      setIsCodeValid(false);
      setActiveQRCode('');
      setLectureInfo(null);
      
      if (code) {
        toast({
          title: 'Invalid Code',
          description: 'The provided teacher code is invalid.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateTeacherCode(teacherCode);
  };

  const handleRefreshChange = (value: string) => {
    setRefreshInterval(parseInt(value));
  };

  const handleEndSession = () => {
    setIsCodeValid(false);
    setActiveQRCode('');
    setTeacherCode('');
    setLectureInfo(null);
    
    toast({
      title: 'Session Ended',
      description: 'The attendance session has been ended.',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">QR Code Generator</h1>
          
          {!isCodeValid ? (
            <Card>
              <CardHeader>
                <CardTitle>Generate Attendance QR Code</CardTitle>
                <CardDescription>
                  Enter your teacher code to generate a QR code for student attendance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacherCode">Teacher Code</Label>
                    <Input
                      id="teacherCode"
                      placeholder="Enter your teacher code"
                      value={teacherCode}
                      onChange={(e) => setTeacherCode(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Generate QR Code
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Attendance Session</CardTitle>
                  {lectureInfo && (
                    <CardDescription>
                      {lectureInfo.title} - {lectureInfo.subject}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {lectureInfo && (
                    <div className="w-full mb-6 text-center">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div className="text-right text-muted-foreground">Teacher:</div>
                        <div className="text-left">{lectureInfo.teacher}</div>
                        <div className="text-right text-muted-foreground">Date:</div>
                        <div className="text-left">{lectureInfo.date}</div>
                        <div className="text-right text-muted-foreground">Time:</div>
                        <div className="text-left">{lectureInfo.time}</div>
                        <div className="text-right text-muted-foreground">Code:</div>
                        <div className="text-left font-mono">{activeQRCode}</div>
                      </div>
                    </div>
                  )}
                  
                  <QRCode 
                    data={activeQRCode} 
                    size={250} 
                    className="mx-auto my-4"
                    refreshInterval={isAutoRefresh ? refreshInterval : undefined}
                  />
                  
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Display this QR code to allow students to mark their attendance.
                    {isAutoRefresh && ` The code refreshes every ${refreshInterval} seconds to prevent sharing.`}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="refresh-interval">Refresh Interval</Label>
                      <Select 
                        value={refreshInterval.toString()} 
                        onValueChange={handleRefreshChange}
                        disabled={!isAutoRefresh}
                      >
                        <SelectTrigger id="refresh-interval">
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="60">1 minute</SelectItem>
                          <SelectItem value="300">5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end pb-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-refresh"
                          checked={isAutoRefresh}
                          onCheckedChange={setIsAutoRefresh}
                        />
                        <Label htmlFor="auto-refresh">Auto-refresh</Label>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleEndSession}
                  >
                    End Attendance Session
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">For Students:</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Open the student app and log in with your credentials.</li>
                      <li>Navigate to the active lecture.</li>
                      <li>Click "Mark Attendance" when the lecture is active.</li>
                      <li>Scan this QR code to mark your attendance.</li>
                      <li>Your attendance will be verified via your roll number and device MAC address.</li>
                    </ol>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">For Teachers:</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Display this QR code on a projector or large screen.</li>
                      <li>Keep the code visible for students to scan.</li>
                      <li>The QR code will automatically refresh to prevent sharing if enabled.</li>
                      <li>End the session when the attendance period is over.</li>
                      <li>View attendance reports from your teacher dashboard.</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QRGenerator;
