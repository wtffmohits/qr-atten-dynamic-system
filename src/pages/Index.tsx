
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Scan, Shield, Clock } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Scan className="h-10 w-10 text-primary" />,
      title: 'Dynamic QR Codes',
      description: 'Secure, time-sensitive QR codes that change automatically to prevent sharing and fraud.'
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'MAC Address Verification',
      description: 'Double-layered security with device-specific validation for accurate attendance.'
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: 'Time-Based Access',
      description: 'Attendance buttons are only activated during the scheduled lecture time.'
    },
    {
      icon: <Check className="h-10 w-10 text-primary" />,
      title: 'Instant Verification',
      description: 'Real-time attendance confirmation for both students and teachers.'
    }
  ];

  return (
    <Layout>
      <Hero />
      
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our attendance system combines convenience with security to create a modern solution for educational institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-secondary py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Teacher Schedules Lectures</h3>
                    <p className="text-muted-foreground">Teachers create lecture schedules with specific time slots and attendance windows.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">QR Code Generation</h3>
                    <p className="text-muted-foreground">When a lecture is active, the system generates a unique QR code for attendance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Student Attendance</h3>
                    <p className="text-muted-foreground">Students scan the QR code using their registered devices to mark attendance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Verification Process</h3>
                    <p className="text-muted-foreground">The system verifies the student's identity through roll number and device MAC address.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-xl bg-white shadow-xl overflow-hidden">
                <div className="h-12 bg-gray-100 flex items-center px-4 border-b">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="text-center mb-6">
                    <div className="text-lg font-semibold text-gray-800">Dynamic QR Attendance</div>
                    <div className="text-sm text-gray-500">Active Lecture: Introduction to Programming</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm flex justify-center">
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-2xl font-bold text-gray-400">QR Code</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Scan this QR code to mark your attendance
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full z-[-1]"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
