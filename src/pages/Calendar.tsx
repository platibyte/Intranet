
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold">Familien-Kalender</h1>
      </div>

      <Card className="glass-panel w-full rounded-xl">
        <CardContent className="p-0 h-[130vh] overflow-auto">
          <iframe 
            src="https://app.famanice.de/html/1/6148670ec810c4e7081bc265" 
            title="Famanice Familienkalender" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen
            loading="lazy"
            className="rounded-b-xl"
          />
        </CardContent>
      </Card>

    </Layout>
  );
};

export default CalendarPage;
