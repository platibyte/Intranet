
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, User, LogIn } from 'lucide-react';

// Demo-Benutzer für das Beispiel
const demoUsers = [
  { id: 1, username: 'papa', password: 'test123', name: 'Papa' },
  { id: 2, username: 'mama', password: 'test123', name: 'Mama' },
  { id: 3, username: 'kind1', password: 'test123', name: 'Kind 1' },
  { id: 4, username: 'kind2', password: 'test123', name: 'Kind 2' },
];

// Demo-Termine für den Kalender
const demoEvents = {
  1: [
    { date: new Date(2023, 5, 10), title: 'Arbeitstermin', color: 'bg-blue-500' },
    { date: new Date(2023, 5, 15), title: 'Geburtstag von Oma', color: 'bg-red-500' },
  ],
  2: [
    { date: new Date(2023, 5, 8), title: 'Yoga-Kurs', color: 'bg-purple-500' },
    { date: new Date(2023, 5, 20), title: 'Treffen mit Freundinnen', color: 'bg-pink-500' },
  ],
  3: [
    { date: new Date(2023, 5, 12), title: 'Schwimmunterricht', color: 'bg-green-500' },
    { date: new Date(2023, 5, 18), title: 'Kindergeburtstag', color: 'bg-yellow-500' },
  ],
  4: [
    { date: new Date(2023, 5, 5), title: 'Musikstunde', color: 'bg-indigo-500' },
    { date: new Date(2023, 5, 25), title: 'Sportfest', color: 'bg-orange-500' },
  ],
};

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any[]>([]);

  const handleLogin = () => {
    const user = demoUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setEvents(demoEvents[user.id] || []);
      setError('');
    } else {
      setError('Falscher Benutzername oder Passwort');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEvents([]);
    setUsername('');
    setPassword('');
  };

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

      {!currentUser ? (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Anmeldung</CardTitle>
            <CardDescription>Melde dich mit deinen Familien-Zugangsdaten an</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Benutzername</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="Benutzername"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Passwort</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>
              <LogIn className="mr-2 h-4 w-4" /> Anmelden
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Dein Kalender, {currentUser.name}</h2>
              <Button variant="outline" onClick={handleLogout}>Abmelden</Button>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Deine Termine</h2>
            <div className="space-y-3">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className={`${event.color} w-4 h-4 rounded-full mt-1`}></div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString('de-DE', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">Keine Termine gefunden</p>
              )}
            </div>
            <div className="mt-4">
              <Button className="w-full">Termin hinzufügen</Button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel rounded-xl p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Hinweise zum Familienkalender</h2>
        <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
          <li>Jedes Familienmitglied verwendet seinen eigenen Login</li>
          <li>Persönliche Termine werden nur für das jeweilige Mitglied angezeigt</li>
          <li>Gemeinsame Termine sind für alle sichtbar</li>
          <li>Demo-Benutzer: "papa", "mama", "kind1", "kind2" (Passwort: "test123")</li>
        </ul>
      </div>
    </Layout>
  );
};

export default CalendarPage;
