
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';
import { Camera } from 'lucide-react';

const Photos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in">
        
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-secondary rounded-lg border border-border">
            <option>Alle Fotos</option>
          </select>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-12 animate-scale-in">
        <PhotoGallery currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </Layout>
  );
};

export default Photos;
