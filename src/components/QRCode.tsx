
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  data: string;
  size?: number;
  className?: string;
  refreshInterval?: number; // In seconds
}

const QRCode: React.FC<QRCodeProps> = ({ 
  data, 
  size = 200, 
  className,
  refreshInterval
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchQRCode = async () => {
      setIsLoading(true);
      try {
        // Using Google Charts API to generate QR code
        const url = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(data + '|' + counter)}&chld=H|1`;
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode();

    // Set up interval for refreshing if specified
    let intervalId: number | undefined;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = window.setInterval(() => {
        setCounter(prev => prev + 1);
      }, refreshInterval * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [data, size, refreshInterval, counter]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {isLoading ? (
        <div className="animate-pulse flex items-center justify-center bg-muted rounded-lg" style={{ width: size, height: size }}>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            width={size} 
            height={size} 
            className="rounded-lg bg-white p-2 shadow-sm transition-all"
          />
          {refreshInterval && (
            <div className="absolute bottom-2 right-2 rounded-full bg-primary/80 text-primary-foreground text-xs px-2 py-1">
              Auto-refresh: {refreshInterval}s
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCode;
