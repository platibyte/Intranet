
import React from 'react';
import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';
import { Camera } from 'lucide-react';

const Photos = () => {
  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-2">
            <Camera size={14} className="mr-1" />
            Fotogalerie
          </div>
          <h1 className="text-4xl font-bold">Heimnetzwerk-Fotos</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Sammlung von Fotos aus deinem Zuhause und persönliche Erinnerungen. Klicke auf ein Bild, um es zu vergrößern.
          </p>
        </div>
        
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-secondary rounded-lg border border-border">
            <option>Alle Fotos</option>
            <option>Wohnzimmer</option>
            <option>Küche</option>
            <option>Garten</option>
          </select>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            Neue Fotos hinzufügen
          </button>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-12 animate-scale-in">
        <PhotoGallery />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Foto-Tipps</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
              <span>Verwende gute Beleuchtung für bessere Fotoqualität</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
              <span>Speichere Fotos im JPG-Format für optimale Kompatibilität</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
              <span>Vermeide zu große Dateien, max. 5MB pro Bild empfohlen</span>
            </li>
          </ul>
        </div>
        
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Statistiken</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Fotos gesamt</p>
              <p className="text-3xl font-semibold">24</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Kategorien</p>
              <p className="text-3xl font-semibold">4</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Speicherplatz</p>
              <p className="text-3xl font-semibold">128<span className="text-lg">MB</span></p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Neuestes Foto</p>
              <p className="text-base font-medium">Heute</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Photos;
