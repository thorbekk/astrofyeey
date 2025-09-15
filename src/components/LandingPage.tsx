import { useState } from 'react';
import { Star, Play, Check, ChevronDown, Menu, X, Calendar, FileText, Heart, Share2, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface LandingPageProps {
  onStartTest: () => void;
  onNavigate: (page: 'terms' | 'privacy' | 'contact') => void;
}

export function LandingPage({ onStartTest, onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-50 px-4 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EBCB8B] to-[#F3D27A] flex items-center justify-center">
              <Star className="w-5 h-5 text-[#0B0E1A]" />
            </div>
            <span className="text-xl font-serif font-medium text-[#EBCB8B]">AstroFye</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">How it works</a>
            <a href="#pricing" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">Pricing</a>
            <a href="#faq" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">FAQ</a>
            <Button 
              onClick={onStartTest}
              className="bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] transition-all duration-300 px-6"
            >
              Get your report
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#E6EAF2]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass rounded-lg mx-4 mt-2 p-6 border border-[#EBCB8B]/20">
            <div className="flex flex-col space-y-4 items-center text-center">
              <a href="#how-it-works" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">How it works</a>
              <a href="#pricing" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">Pricing</a>
              <a href="#faq" className="text-[#E6EAF2] hover:text-[#EBCB8B] transition-colors">FAQ</a>
              <Button 
                onClick={onStartTest}
                className="bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] w-full max-w-xs"
              >
                Get your report
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-serif leading-tight text-center lg:text-left">
                  Your personal astro testimonial — crafted with{' '}
                  <span className="text-[#EBCB8B]">precision</span>
                </h1>
                <p className="text-lg text-[#E6EAF2]/80 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  Love compatibility, past life readings & full astrological reports. 
                  Your cosmic blueprint awaits.
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button 
                  onClick={onStartTest}
                  size="lg"
                  className="bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] px-8 py-3 text-lg astro-glow"
                >
                  Get your report
                </Button>
              </div>
            </div>

            {/* Subtle Cosmic Visualization */}
            <div className="relative">
              <div className="glass rounded-2xl p-8 glass-hover relative overflow-hidden">
                {/* Gentle Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1440]/40 via-[#2A1A5A]/20 to-[#10162A]/30 rounded-2xl"></div>
                
                {/* Subtle Floating Particles */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className="absolute w-0.5 h-0.5 bg-[#EBCB8B] rounded-full opacity-20"
                      style={{
                        left: `${25 + (i * 15)}%`,
                        top: `${25 + (i * 10)}%`,
                        animation: `gentleFloat ${10 + (i * 2)}s ease-in-out infinite`,
                        animationDelay: `${i * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="aspect-square relative z-10">
                  {/* Minimalist Constellation SVG */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Subtle cosmic glow */}
                    <defs>
                      <radialGradient id="subtleGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#EBCB8B" stopOpacity="0.1"/>
                        <stop offset="70%" stopColor="#F3D27A" stopOpacity="0.05"/>
                        <stop offset="100%" stopColor="#1A1440" stopOpacity="0"/>
                      </radialGradient>
                      <radialGradient id="softStarGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#EBCB8B" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#F3D27A" stopOpacity="0"/>
                      </radialGradient>
                    </defs>

                    {/* Static orbiting ring */}
                    <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(235, 203, 139, 0.08)" strokeWidth="1" strokeDasharray="8,8" />

                    {/* Gentle central glow */}
                    <circle cx="200" cy="200" r="50" fill="url(#subtleGlow)" />

                    {/* Simplified constellation - Birth Chart inspired */}
                    <path d="M150,150 L200,120 L250,150 L280,200 L250,250 L200,280 L150,250 L120,200 Z" 
                          stroke="rgba(235, 203, 139, 0.25)" 
                          strokeWidth="1" 
                          fill="none"
                    />

                    {/* Gentle cross lines */}
                    <path d="M200,120 L200,280 M120,200 L280,200" 
                          stroke="rgba(235, 203, 139, 0.15)" 
                          strokeWidth="1"
                    />

                    {/* Soft stars at key positions */}
                    {[
                      { x: 200, y: 120, size: 3, type: 'major' },   // North
                      { x: 280, y: 200, size: 3, type: 'major' },   // East
                      { x: 200, y: 280, size: 3, type: 'major' },   // South
                      { x: 120, y: 200, size: 3, type: 'major' },   // West
                      { x: 200, y: 200, size: 4, type: 'central' }, // Center
                    ].map((star, i) => (
                      <g key={`star-${i}`}>
                        <circle
                          cx={star.x}
                          cy={star.y}
                          r={star.size + 2}
                          fill="url(#softStarGlow)"
                          opacity="0.2"
                        />
                        <circle
                          cx={star.x}
                          cy={star.y}
                          r={star.size}
                          fill="#EBCB8B"
                          opacity="0.4"
                        />
                        {star.type === 'central' && (
                          <circle
                            cx={star.x}
                            cy={star.y}
                            r="1"
                            fill="#F3D27A"
                            opacity="0.6"
                          />
                        )}
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Subtle text overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-center z-10">
                  <p className="text-[#EBCB8B]/60 text-sm font-medium">Your Cosmic Blueprint</p>
                  <p className="text-[#E6EAF2]/40 text-xs mt-1">Personalized astrological analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="px-4 lg:px-20 py-8 border-t border-[#EBCB8B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center text-center">
            <div className="text-sm text-[#E6EAF2]/50">
              For entertainment only; not medical/financial advice
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">How it works</h2>
            <p className="text-lg text-[#E6EAF2]/70 max-w-2xl mx-auto">
              Three simple steps to unlock your cosmic insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Calendar className="w-8 h-8" />,
                title: "Enter birth data",
                description: "Provide your name, birth date, time, and location for accurate calculations"
              },
              {
                step: "2",
                icon: <Star className="w-8 h-8" />,
                title: "We calculate chart & transits",
                description: "Our system creates your personalized astrological chart and current planetary influences"
              },
              {
                step: "3",
                icon: <FileText className="w-8 h-8" />,
                title: "Receive your testimonial",
                description: "Get your detailed PDF report with personalized insights and predictions"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="glass rounded-2xl p-8 glass-hover h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EBCB8B] to-[#F3D27A] flex items-center justify-center mx-auto mb-6 text-[#0B0E1A]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                  <p className="text-[#E6EAF2]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-4 lg:px-20 py-16 lg:py-24 bg-gradient-to-r from-[#10162A]/50 to-[#1A1440]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">What you get</h2>
            <p className="text-lg text-[#E6EAF2]/70 max-w-2xl mx-auto">
              Comprehensive insights delivered in multiple formats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Personal PDF report",
                description: "Detailed report with charts, interpretations, and predictions"
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "3 power dates in next 30 days",
                description: "Specific dates for important decisions and opportunities"
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Love compatibility analysis",
                description: "Deep insights into your relationships and romantic connections"
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Past life reading",
                description: "Discover your soul's journey through previous incarnations"
              },
              {
                icon: <Share2 className="w-6 h-6" />,
                title: "Shareable story cards",
                description: "Beautiful graphics perfect for social media sharing"
              }
            ].map((benefit, i) => (
              <Card key={i} className="glass p-6 glass-hover border-[#EBCB8B]/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EBCB8B]/20 flex items-center justify-center text-[#EBCB8B] flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#E6EAF2]/70">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing */}
      <section id="pricing" className="px-4 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">Choose your experience</h2>
            <p className="text-lg text-[#E6EAF2]/70">
              Start free, upgrade anytime
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Mini",
                price: "$19",
                description: "Perfect for first-timers",
                features: ["PDF report testimonial", "1 key insight", "Love compatibility"],
                cta: "Get mini report",
                popular: false
              },
              {
                name: "Full Report",
                price: "$29",
                description: "Complete astrological analysis",
                features: ["Detailed PDF report", "3 power dates", "Love compatibility", "Past life reading", "Birth chart analysis", "Transit predictions", "Shareable story cards"],
                cta: "Get full report",
                popular: true
              }
            ].map((plan, i) => (
              <Card 
                key={i} 
                className={`p-6 glass glass-hover border-[#EBCB8B]/20 relative ${plan.popular ? 'ring-2 ring-[#EBCB8B]/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#EBCB8B] text-[#0B0E1A] px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="text-3xl font-serif text-[#EBCB8B] mb-2">{plan.price}</div>
                  <p className="text-sm text-[#E6EAF2]/70">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-[#EBCB8B] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={onStartTest}
                  className={`w-full ${plan.popular 
                    ? 'bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A]' 
                    : 'bg-[#10162A] text-[#EBCB8B] border border-[#EBCB8B]/30 hover:bg-[#EBCB8B]/10'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section id="faq" className="px-4 lg:px-20 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif mb-4">Frequently asked questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "How long does delivery take?",
                answer: "Mini reports are instant. Full reports take 2-4 hours and are delivered directly to your email."
              },
              {
                question: "How accurate are the predictions?",
                answer: "Our algorithms use traditional astrological methods combined with modern astronomical data. Results are for entertainment and self-insight purposes."
              },
              {
                question: "Can I get a refund?",
                answer: "We offer corrections for any technical errors free of charge. Due to the digital nature, refunds are only available before delivery."
              },
              {
                question: "How do you handle my data?",
                answer: "We're fully GDPR compliant. Your birth data is used only for generating your report and is securely stored. You can request deletion anytime."
              },
              {
                question: "What if I don't know my exact birth time?",
                answer: "You can still get accurate results! Check 'not sure about time' and we'll provide insights based on your birth date and location."
              },
              {
                question: "Do you handle international time zones?",
                answer: "Yes! Our system automatically detects your time zone based on your birth location for accurate calculations."
              },
              {
                question: "Are there additional taxes for EU customers?",
                answer: "VAT is automatically calculated and included in the final price based on your location."
              },
              {
                question: "Can I share my results?",
                answer: "Absolutely! Your report includes shareable story cards designed for social media, plus you can share your PDF report."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass rounded-lg px-6 border-[#EBCB8B]/20">
                <AccordionTrigger className="text-left hover:text-[#EBCB8B] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#E6EAF2]/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-20 py-12 border-t border-[#EBCB8B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EBCB8B] to-[#F3D27A] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#0B0E1A]" />
                </div>
                <span className="text-xl font-serif font-medium text-[#EBCB8B]">AstroFye</span>
              </div>
              <p className="text-[#E6EAF2]/70 text-sm mb-4 max-w-md">
                Personal astrology reports for entertainment and self-insight. 
                Not medical or financial advice.
              </p>

            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <div className="space-y-2 text-sm text-[#E6EAF2]/70">
                <button onClick={() => onNavigate('terms')} className="hover:text-[#EBCB8B] transition-colors block text-left">Terms of Service</button>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#EBCB8B] transition-colors block text-left">Privacy Policy</button>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#EBCB8B] transition-colors block text-left">Contact</button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Language</h3>
              <select className="bg-[#10162A] border border-[#EBCB8B]/30 rounded-lg px-3 py-2 text-sm text-[#E6EAF2] focus:border-[#EBCB8B] focus:outline-none">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#EBCB8B]/20 text-center text-sm text-[#E6EAF2]/50">
            © 2025 AstroFye. For entertainment and self-insight only. Not medical or financial advice.
          </div>
        </div>
      </footer>
    </div>
  );
}