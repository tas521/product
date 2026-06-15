import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { Search, BookOpen, Clock, User, ArrowLeft, ArrowRight, Share2, HelpCircle } from 'lucide-react';

interface BlogProps {
  blogs?: BlogPost[];
}

export default function Blog({ blogs = [] }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Spiritual Guide', 'Preparation', 'Visa Guide', 'Travel Tips'];

  const activeBlogs = blogs && blogs.length > 0 ? blogs : BLOG_POSTS;

  const filteredPosts = activeBlogs.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-page-container" className="pt-32 sm:pt-40 pb-12 space-y-12">
      {/* Editorial Header */}
      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-3 relative z-10 text-center">
          <span className="text-amber-400 uppercase tracking-widest text-xs font-semibold">Liturgical Guidance</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">The Al Safar Chronicle</h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Weekly deep-dives overseen by our chief Islamic scholars. Master your travel checklist, visa guidelines, and physical fitness goals.
          </p>
        </div>
      </section>

      {selectedPost ? (
        /* INDIVIDUAL POST READER MODE */
        <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 animate-fadeIn">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles Feed
          </button>

          {/* Cover image */}
          <div className="h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <img
              referrerPolicy="no-referrer"
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Header */}
          <div className="space-y-4 border-b border-slate-150 pb-6">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {selectedPost.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-sans items-center">
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <User className="w-3.5 h-3.5 text-amber-600" />
                By {selectedPost.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
              <span>•</span>
              <span>Published {selectedPost.publishedDate}</span>
            </div>
          </div>

          {/* Core Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
            {selectedPost.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          {/* Share Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center text-xs">
            <span className="text-slate-500">Need this file offline?</span>
            <button
              onClick={() => alert("Copied link to clipboard. You can now share this spiritual preparation booklet with your flight companions.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 rounded-lg text-slate-700 font-semibold transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-600" />
              Copy Article Link
            </button>
          </div>
        </article>
      ) : (
        /* DISCOVERY FEED */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          {/* Filters Deck */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 border-slate-950 text-amber-400'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Guides' : cat}
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-72">
              <span className="absolute left-3 top-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((blog) => (
              <article
                key={blog.id}
                className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-slate-50">
                    <img
                      referrerPolicy="no-referrer"
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-slate-950/90 text-amber-400 font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                      <span>{blog.publishedDate}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold font-serif text-slate-950 leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans mt-1">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center text-xs">
                  <span className="text-slate-400 italic">By {blog.author.split(' ')[0]}</span>
                  <button
                    onClick={() => { setSelectedPost(blog); window.scrollTo(0,0); }}
                    className="text-xs text-amber-700 hover:text-amber-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    Read Lesson
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </section>
      )}
    </div>
  );
}
