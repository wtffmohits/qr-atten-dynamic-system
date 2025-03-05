
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-auto bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dynamic QR Attendance</h3>
            <p className="text-sm text-muted-foreground">
              A modern solution for tracking attendance using dynamic QR codes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/student" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/teacher" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link to="/qr-generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  QR Generator
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Email: support@dynamicqr.example.com</p>
              <p>Phone: +1 234 567 890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dynamic QR Attendance System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
