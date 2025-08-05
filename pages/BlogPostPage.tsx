
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { BLOG_POSTS } from '../constants';
import NotFoundPage from './NotFoundPage';
import { WhatsAppIcon } from '../components/Icons';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }
  
  const shareOnWhatsApp = () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out this article from WakilBhai: ${post.title[language]}`);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      <img className="w-full h-64 md:h-80 object-cover" src={post.imageUrl} alt={post.title[language]} />
      <div className="p-6 md:p-12">
        <p className="text-brand-gold font-semibold">{post.category}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4 font-display">{post.title[language]}</h1>
        <p className="text-gray-400 mb-8">By {post.author} on {post.date}</p>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            <p>{post.content[language]}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 flex justify-between items-center">
            <NavLink to="/blog" className="text-brand-gold hover:text-yellow-300 font-semibold">&larr; Back to Blog</NavLink>
            <div className="flex items-center space-x-4">
                <span className="text-gray-400">Share:</span>
                <button onClick={shareOnWhatsApp} className="text-green-500 hover:text-green-400">
                    <WhatsAppIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;