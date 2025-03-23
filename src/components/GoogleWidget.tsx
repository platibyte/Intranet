
import React, { useEffect, useRef, useState } from 'react';

interface GoogleWidgetProps {
  type: 'search' | 'calendar' | 'translate';
  width?: string;
  height?: string;
}

const GoogleWidget: React.FC<GoogleWidgetProps> = ({ type, width = '100%', height = '400px' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  
  let src = '';
  let title = '';
  
  switch(type) {
    case 'search':
      src = 'https://cse.google.com/cse?cx=partner-pub-0000000000000000:0000000000';
      title = 'Google Suche';
      break;
    case 'calendar':
      src = 'https://calendar.google.com/calendar/embed?showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0&height=600&wkst=2&bgcolor=%23ffffff';
      title = 'Google Kalender';
      break;
    case 'translate':
      src = 'https://translate.google.com/?hl=de&sl=de&tl=en&op=translate';
      title = 'Google Übersetzer';
      break;
    default:
      src = 'https://www.google.com';
      title = 'Google';
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="rounded-xl glass-panel overflow-hidden relative" ref={containerRef}>
      <div className={`w-full ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} style={{ height }}>
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          style={{ border: 0, borderRadius: '0.75rem' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-muted-foreground">Widget wird geladen...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleWidget;
