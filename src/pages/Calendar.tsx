
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mb-2">
          <CalendarIcon size={14} className="mr-1" />
          Familienkalender
        </div>
        <h1 className="text-4xl font-bold">Familien-Kalender</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Verwalte persönliche und gemeinsame Termine für alle Familienmitglieder an einem zentralen Ort.
        </p>
      </div>

      <Card className="glass-panel w-full rounded-xl">
        <CardHeader>
          <CardTitle>Famanice Familienkalender</CardTitle>
          <CardDescription>
            Hier kannst du alle Termine deiner Familie einsehen und verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 h-[80vh] overflow-hidden">
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

      <div className="glass-panel rounded-xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Hinweise zum Familienkalender</h2>
        <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
          <li>Der Kalender wird über den Famanice-Service zur Verfügung gestellt</li>
          <li>Alle Termine und Einstellungen werden direkt in Famanice verwaltet</li>
          <li>Du kannst die Ansicht im Kalender nach Bedarf anpassen</li>
          <li>Bei Fragen zur Nutzung des Kalenders besuche die Famanice-Hilfeseite</li>
        </ul>
      </div>
    </Layout>
  );
};

export default CalendarPage;
