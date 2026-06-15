import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Heart } from 'lucide-react';

interface GalleryProps {
  gallery?: GalleryItem[];
}

export default function Gallery({ gallery = [] }: GalleryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pilgrimage' | 'groups' | 'haram' | 'destinations'>('all');
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPhotos.includes(id)) {
      setLikedPhotos(likedPhotos.filter(item => item !== id));
    } else {
      setLikedPhotos([...likedPhotos, id]);
    }
  };

  const activeGallery = gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS;

  const filteredItems = activeGallery.filter((item) => {
    return activeTab === 'all' || item.category === activeTab;
  });

  return (
    <div id="gallery-page-container" className="pt-32 sm:pt-40 pb-20 space-y-16 bg-[#FAF8F5]">
      {/* Banner Segment */}
      <section className="bg-[#10223b] text-white py-16 px-4 sm:px-6 relative overflow-hidden islamic-pattern border-b border-amber-500/20">
        <div className="absolute inset-0 bg-linear-to-t from-[#10223b]/95 via-[#10223b]/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10 text-center">
          <span className="text-amber-400 uppercase tracking-[0.3em] text-[10px] font-bold">GENUINE ENCOUNTERS</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#FAF8F5]">Unfiltered Pilgrim Reflections</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-amber-500/30" />
            <span className="text-amber-500 text-xs">✧</span>
            <span className="h-[1px] w-6 bg-amber-500/30" />
          </div>
          <p className="text-xs text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Witness our physical cadres during tawaf, historic ziyarah structures, and premium international tours.
          </p>
        </div>
      </section>

      {/* Interactive Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex flex-wrap gap-2.5 justify-center border-b border-amber-500/10 pb-8">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'pilgrimage', label: 'Pilgrim Rites' },
            { id: 'groups', label: 'Delhi Group departures' },
            { id: 'haram', label: 'Sanctuaries (Makkah & Madinah)' },
            { id: 'destinations', label: 'Scenic Destinations' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.15em] border transition duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#10223b] border-[#10223b] text-white'
                  : 'border-amber-500/20 bg-white hover:bg-amber-100/10 text-[#10223b]/75 hover:text-[#10223b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => {
            const hasLiked = likedPhotos.includes(item.id);
            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF8F5] border border-amber-500/15 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition duration-500 luxury-box"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    referrerPolicy="no-referrer"
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-1000 transition-all filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-400" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-[#10223b]/90 border border-amber-500/30 text-[8px] text-amber-400 uppercase font-bold tracking-[0.15em] px-2.5 py-1">
                    {item.category}
                  </span>

                  {/* Operational heart like */}
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="absolute top-4 right-4 p-2 bg-[#FAF8F5]/15 hover:bg-[#FAF8F5]/30 backdrop-blur-xs text-white hover:text-rose-500 rounded-none transition cursor-pointer"
                    aria-label="Like photo"
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  </button>
                </div>

                <div className="p-5 space-y-1.5 bg-[#FAF8F5] relative z-10">
                  <h3 className="text-xs font-sans font-bold uppercase tracking-wide text-[#10223b] line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-[#10223b]/70 leading-relaxed font-sans line-clamp-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
