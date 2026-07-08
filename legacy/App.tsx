import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import TalkToLawyerPage from './pages/AskQuestionPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import ServiceRequestPage from './pages/ServiceRequestPage';
import LawyerDirectoryPage from './pages/LawyerDirectoryPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import HelpGuidesPage from './pages/HelpGuidesPage';
import LegalDocumentsPage from './pages/LegalDocumentsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import WhyWakilBhaiPage from './pages/WhyWakilBhaiPage';
import BookVisitPage from './pages/BookVisitPage';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/talk-to-a-lawyer" element={<TalkToLawyerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request-service" element={<ServiceRequestPage />} />
            <Route path="/lawyers" element={<LawyerDirectoryPage />} />
            <Route path="/lawyers/:id" element={<LawyerProfilePage />} />
            <Route path="/help-guides" element={<HelpGuidesPage />} />
            <Route path="/documents" element={<LegalDocumentsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/why-wakilbhai" element={<WhyWakilBhaiPage />} />
            <Route path="/book-visit" element={<BookVisitPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
