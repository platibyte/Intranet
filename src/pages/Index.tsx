
import React from 'react';
import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';
import GoogleWidget from '@/components/GoogleWidget';
import { ArrowRight, Home, Info, Network, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <section className="mb-10 text-center animate-fade-in">
        <h1 className="text-5xl font-bold mb-4">Willkommen im Heim-Intranet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dein zentraler Zugang zu Informationen, Fotos und nützlichen Tools in deinem Heimnetzwerk.
        </p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="col-span-1 lg:col-span-2 glass-panel rounded-xl p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Aktuelle Fotos</h2>
            <Link to="/photos" className="flex items-center text-primary hover:underline">
              <span>Alle anzeigen</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <PhotoGallery limit={6} compact />
        </div>
        
        <div className="glass-panel rounded-xl p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold mb-4">Netzwerk-Status</h2>
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mr-4">
                <Wifi className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Internet</h3>
                <p className="text-sm text-muted-foreground">Verbunden (1 Gbps)</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mr-4">
                <Network className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Lokales Netzwerk</h3>
                <p className="text-sm text-muted-foreground">8 aktive Geräte</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full mr-4">
                <Home className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-medium">Smart Home</h3>
                <p className="text-sm text-muted-foreground">12 Geräte verbunden</p>
              </div>
            </div>
            
            <Link to="/info" className="block mt-4 text-center">
              <button className="bg-primary text-white hover:bg-primary/90 w-full py-2 rounded-lg transition">
                Details anzeigen
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-semibold mb-4">Google-Integration</h2>
        <GoogleWidget type="search" height="300px" />
      </div>
      
      <div className="glass-panel rounded-xl p-6 animate-blur-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center mb-4">
          <Info size={24} className="text-amber-500 mr-2" />
          <h2 className="text-2xl font-semibold">Wichtige Informationen</h2>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm">
            Dies ist dein persönliches Heimnetzwerk-Portal. Hier kannst du wichtige Informationen, Fotos und Ressourcen für dein Zuhause speichern und abrufen. 
            Das Dashboard zeigt den aktuellen Status und bietet direkten Zugriff auf alle wichtigen Funktionen.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
