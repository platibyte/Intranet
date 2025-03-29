
import React from 'react';
import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';
import GoogleWidget from '@/components/GoogleWidget';
import RandomPhoto from '@/RandomPhoto';
import { ArrowRight, Home, Info, Network, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <section className="mb-10 text-center animate-fade-in">
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="col-span-1 lg:col-span-2 glass-panel rounded-xl p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Zufällige Fotos</h2>
            <Link to="/photos" className="flex items-center text-primary hover:underline">
              <span>Alle anzeigen</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <RandomPhoto />
        </div>
        
      </div>
      

    </Layout>
  );
};

export default Index;
