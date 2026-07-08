import React from 'react';

export type Language = 'en' | 'hi' | 'ur' | 'bn';

export interface Service {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Rent & Property' | 'Personal' | 'Business' | 'Govt. / Statutory' | 'Online & Startup Legal';
}

export interface Testimonial {
  id: number;
  name: string;
  feedback: Record<Language, string>;
  location: string;
}

export interface Lawyer {
    id: string;
    name: string;
    photoUrl: string;
    practiceAreas: string[];
    bio: Record<Language, string>;
    rating: number;
    reviews: number;
    location: string;
    languages: string[];
}

export interface Guide {
    id: string;
    question: Record<Language, string>;
    answer: Record<Language, string>;
}

export interface LegalDocument {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    downloadUrl: string;
}

export interface BlogPost {
    slug: string;
    title: Record<Language, string>;
    imageUrl: string;
    category: string;
    author: string;
    date: string;
    content: Record<Language, string>;
}
