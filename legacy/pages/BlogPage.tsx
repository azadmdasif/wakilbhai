
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_POSTS } from '../constants';
import type { BlogPost } from '../types';
import { ArrowRightIcon } from '../components/Icons';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/20 group">
      <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title[language]} />
      <div className="p-6">
        <p className="text-sm text-brand-gold font-semibold mb-2">{post.category}</p>
        <h3 className="text-xl font-bold text-white mb-3 font-display h-14 overflow-hidden">{post.title[language]}</h3>
        <p className="text-sm text-gray-400 mb-4">By {post.author} on {post.date}</p>
        <NavLink to={`/blog/${post.slug}`} className="font-semibold text-brand-red hover:text-red-400 flex items-center">
          Read More <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </NavLink>
      </div>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Consumer Rights', 'Family Law', 'Property Law'];
  
  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">Our Blog</h1>
        <p className="mt-4 text-lg text-gray-300">
          Insights and updates on Indian law.
        </p>
      </section>

      <section>
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-brand-red text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => <BlogPostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;