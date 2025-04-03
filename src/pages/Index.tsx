
import React from 'react';
import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';
import RandomPhoto from '@/RandomPhoto';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Index page component - serves as the homepage of the application
 * Displays a Google search widget and a random photo gallery
 */
const Index = () => {
  return (
    <Layout>
      {/* Header section with animation */}
      <section className="mb-10 text-center animate-fade-in">
      </section>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Google Search Widget */}
        <div className="col-span-3 glass-panel rounded-xl p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold mb-4">Google Suche</h2>
          {/* Simple Google search form that redirects to Google search results */}
          <form action="https://www.google.com/search" method="GET" className="flex gap-2">
            <input 
              type="text" 
              name="q" 
              placeholder="Suche mit Google"
              className="p-2 border rounded-md w-full"
            />
            <input 
              type="submit" 
              value="Suchen" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
            />
          </form>
        </div>

        {/* Random Photos Section */}
        <div className="col-span-1 lg:col-span-3 glass-panel rounded-xl p-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Zufällige Fotos</h2>
            {/* Link to Photos page for full gallery view */}
            <Link to="/photos" className="flex items-center text-primary hover:underline">
              <span>Alle anzeigen</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          {/* RandomPhoto component displays a grid of random photos */}
          <RandomPhoto />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
