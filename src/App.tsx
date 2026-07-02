/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Views
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ProductsView from './components/ProductsView';
import AboutView from './components/AboutView';
import ProjectsView from './components/ProjectsView';
import ContactView from './components/ContactView';
import ShopView from './components/ShopView';
import PrivacyView from './components/PrivacyView';
import TermsView from './components/TermsView';

// New Subpage Views
import ServiceDetailPage from './components/ServiceDetailPage';
import ProductCategoryPage from './components/ProductCategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import AboutStoryPage from './components/AboutStoryPage';
import AboutCommitmentPage from './components/AboutCommitmentPage';
import AboutNewsPage from './components/AboutNewsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Deep-linking parameters
  const [selectedServiceId, setSelectedServiceId] = useState<string>('greenhouse');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProductName, setSelectedProductName] = useState<string>('');

  const handleNavigate = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated deep-link routing actions
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('services');
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    handleNavigate('projects');
  };

  const handleSelectProductForEnquiry = (productName: string) => {
    setSelectedProductName(productName);
  };

  const handleClearSelectedProduct = () => {
    setSelectedProductName('');
  };

  const renderActivePage = () => {
    // Dedicated single-product pages: routes look like "product-<id>"
    // (note: category pages are "products-*" plural, so they won't match here).
    if (currentPage.startsWith('product-')) {
      return (
        <ProductDetailPage
          productId={currentPage.replace('product-', '')}
          onNavigate={handleNavigate}
          onSelectProductForEnquiry={handleSelectProductForEnquiry}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomeView 
            onNavigate={handleNavigate} 
            onSelectService={handleSelectService}
            onSelectProject={handleSelectProject}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'services':
        return (
          <ServicesView 
            onNavigate={handleNavigate}
            selectedServiceId={selectedServiceId}
            onSelectServiceId={setSelectedServiceId}
          />
        );
      case 'services-greenhouse':
        return (
          <ServiceDetailPage 
            serviceId="greenhouse"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'services-indoor-farming':
        return (
          <ServiceDetailPage 
            serviceId="indoor-farming"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'services-home-gardening':
        return (
          <ServiceDetailPage 
            serviceId="home-gardening"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'services-fresh-produce':
        return (
          <ServiceDetailPage 
            serviceId="fresh-produce"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'products':
        return (
          <ProductsView 
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'products-environmental':
        return (
          <ProductCategoryPage 
            category="environmental"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'products-resource':
        return (
          <ProductCategoryPage 
            category="resource"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'products-irrigation':
        return (
          <ProductCategoryPage 
            category="irrigation"
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'about':
        return (
          <AboutView 
            onNavigate={handleNavigate}
          />
        );
      case 'about-story':
        return (
          <AboutStoryPage 
            onNavigate={handleNavigate}
          />
        );
      case 'about-commitment':
        return (
          <AboutCommitmentPage 
            onNavigate={handleNavigate}
          />
        );
      case 'about-news':
        return (
          <AboutNewsPage 
            onNavigate={handleNavigate}
          />
        );
      case 'projects':
        return (
          <ProjectsView 
            onNavigate={handleNavigate}
            selectedProjectId={selectedProjectId}
            onSelectProjectId={setSelectedProjectId}
          />
        );
      case 'shop':
        return (
          <ShopView 
            onNavigate={handleNavigate}
            onSelectProductForEnquiry={handleSelectProductForEnquiry}
          />
        );
      case 'contact':
        return (
          <ContactView
            onNavigate={handleNavigate}
            selectedProductName={selectedProductName}
            onClearSelectedProductName={handleClearSelectedProduct}
          />
        );
      case 'privacy':
        return <PrivacyView onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsView onNavigate={handleNavigate} />;
      default:
        return (
          <HomeView 
            onNavigate={handleNavigate}
            onSelectService={handleSelectService}
            onSelectProject={handleSelectProject}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Shared Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Active Page Stage with animated page-shifts */}
      <main className={`grow ${currentPage !== 'home' ? '' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
