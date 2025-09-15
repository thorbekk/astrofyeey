import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { BirthDataForm } from './components/BirthDataForm';
import { CheckoutPage } from './components/CheckoutPage';
import { ThankYouPage } from './components/ThankYouPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';

// Component to handle 404s and invalid routes
function NotFoundRedirect() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Automatically redirect to home page
    navigate('/', { replace: true });
  }, [navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#EBCB8B] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[#E6EAF2]">Redirecting to AstroFye...</p>
      </div>
    </div>
  );
}

// App Wrapper component that uses React Router
function AppRouter() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Handle non-standard paths
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Redirect unrecognized paths to home
    if (!['/', '/form', '/checkout', '/thank-you', '/terms', '/privacy', '/contact'].includes(currentPath)) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={
        <LandingPage 
          onStartTest={() => navigate('/form')} 
          onNavigate={(page) => navigate(`/${page === 'landing' ? '' : page}`)}
        />
      } />
      <Route path="/form" element={
        <BirthDataForm 
          onComplete={(data) => {
            setFormData(data);
            navigate('/checkout');
          }} 
          onBack={() => navigate('/')} 
        />
      } />
      <Route path="/checkout" element={
        <CheckoutPage 
          onComplete={() => navigate('/thank-you')} 
          onBack={() => navigate('/form')} 
          formData={formData} 
        />
      } />
      <Route path="/thank-you" element={
        <ThankYouPage onNewReport={() => navigate('/')} />
      } />
      <Route path="/terms" element={
        <TermsPage onBack={() => navigate('/')} />
      } />
      <Route path="/privacy" element={
        <PrivacyPage onBack={() => navigate('/')} />
      } />
      <Route path="/contact" element={
        <ContactPage onBack={() => navigate('/')} />
      } />
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
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
          className="fixed inset-0 opacity-35 md:opacity-25 lg:opacity-20 mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1602981256888-244edc1f444f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWJ1bGElMjBzcGFjZSUyMGNvc21pYyUyMHB1cnBsZXxlbnwxfHx8fDE3NTc4ODAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Page Content */}
        <div className="relative z-10">
          <AppRouter />
        </div>
      </div>
    </Router>
  );
}