
import React, { useEffect, useRef, useState } from 'react';

/**
 * Props interface for the GoogleWidget component
 */
interface GoogleWidgetProps {
  type: 'search' | 'calendar' | 'translate'; // Type of Google widget to display
  width?: string;                           // Width of the widget (default: 100%)
  height?: string;                          // Height of the widget (default: 400px)
}

/**
 * Component that embeds various Google services as iframes
 * Supports Google Search, Calendar, and Translate
 */
const GoogleWidget: React.FC<GoogleWidgetProps> = ({ type, width = '100%', height = '400px' }) => {
  // Reference to the container div
  const containerRef = useRef<HTMLDivElement>(null);
  // State to track if the widget has loaded
  const [loaded, setLoaded] = useState(false);
  
  // Determine the source URL and title based on the widget type
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
  
  // Simulate loading delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    
    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="rounded-xl glass-panel overflow-hidden relative" ref={containerRef}>
      {/* Widget container with fade-in transition when loaded */}
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
      
      {/* Loading spinner shown while the iframe is loading */}
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
