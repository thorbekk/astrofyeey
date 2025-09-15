import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { BirthDataForm } from './components/BirthDataForm';
import { CheckoutPage } from './components/CheckoutPage';
import { ThankYouPage } from './components/ThankYouPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';

type PageType = 'landing' | 'form' | 'checkout' | 'thank-you' | 'terms' | 'privacy' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [formData, setFormData] = useState({});

  // Simple hash-based routing that works on any server
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      switch (hash) {
        case 'form':
          setCurrentPage('form');
          break;
        case 'checkout':
          setCurrentPage('checkout');
          break;
        case 'thank-you':
          setCurrentPage('thank-you');
          break;
        case 'terms':
          setCurrentPage('terms');
          break;
        case 'privacy':
          setCurrentPage('privacy');
          break;
        case 'contact':
          setCurrentPage('contact');
          break;
        default:
          setCurrentPage('landing');
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageType) => {
    const route = page === 'landing' ? '' : page;
    window.location.hash = route;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'form':
        return <BirthDataForm onComplete={(data) => {
          setFormData(data);
          navigateToPage('checkout');
        }} onBack={() => navigateToPage('landing')} />;
      case 'checkout':
        return <CheckoutPage onComplete={() => navigateToPage('thank-you')} onBack={() => navigateToPage('form')} formData={formData} />;
      case 'thank-you':
        return <ThankYouPage onNewReport={() => navigateToPage('landing')} />;
      case 'terms':
        return <TermsPage onBack={() => navigateToPage('landing')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => navigateToPage('landing')} />;
      case 'contact':
        return <ContactPage onBack={() => navigateToPage('landing')} />;
      default:
        return <LandingPage 
          onStartTest={() => navigateToPage('form')} 
          onNavigate={(page) => navigateToPage(page as PageType)}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E1A] text-[#E6EAF2] relative overflow-x-hidden">
      {/* Starfield Background */}
      <div className="starfield">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Cosmic Background Overlay */}
      <div 
        className="fixed inset-0 opacity-20 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1602981256888-244edc1f444f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWJ1bGElMjBzcGFjZSUyMGNvc21pYyUyMHB1cnBsZXxlbnwxfHx8fDE3NTc4ODAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Page Content */}
      <div className="relative z-10">
        {renderPage()}
      </div>
    </div>
  );
}