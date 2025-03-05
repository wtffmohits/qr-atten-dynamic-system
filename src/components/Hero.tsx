
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-background to-secondary py-16 md:py-24">
      <div className="absolute inset-0 z-0 bg-grid-foreground/5"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Smart Attendance System
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Dynamic QR Code Attendance System
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A modern, secure, and efficient way to track attendance using dynamic QR codes. 
              Perfect for educational institutions and organizations.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/student">
                <Button size="lg" className="transition-all hover:shadow-lg">
                  Student Login
                </Button>
              </Link>
              <Link to="/teacher">
                <Button size="lg" variant="outline" className="transition-all hover:shadow-lg">
                  Teacher Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center lg:order-last">
            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-8 shadow-lg">
              <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-background shadow">
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 h-32 w-32 rounded-lg bg-secondary p-2">
                    <div className="flex h-full items-center justify-center rounded bg-primary/10">
                      <div className="text-4xl font-bold text-primary">QR</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Scan to Mark Attendance</h3>
                    <p className="text-sm text-muted-foreground">
                      Simple, quick, and secure attendance tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
