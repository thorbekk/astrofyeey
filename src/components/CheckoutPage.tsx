import { useState } from 'react';
import { ArrowLeft, Shield, Lock, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  getProduct, 
  createCheckout, 
  addCustomerToCheckout, 
  PRODUCT_HANDLES, 
  MOCK_PRODUCTS,
  formatBirthDataForShopify 
} from '../lib/shopify';
import { toast } from 'sonner@2.0.3';
const FORMSPREE_URL = "https://formspree.io/f/xblavqpq";

function sendToFormspree(formData: any) {
  fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).catch(() => {
    // Ignorer feil – vi vil ikke stoppe redirect
  });
}

interface CheckoutPageProps {
  onComplete: () => void;
  onBack: () => void;
  formData?: any; // Birth data from the form
}

export function CheckoutPage({ onComplete, onBack, formData }: CheckoutPageProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<'full' | 'mini' | null>(null);

  // Handle direct checkout for selected plan
const handleDirectCheckout = (plan: 'full' | 'mini') => {
    if (formData) {
    sendToFormspree(formData); // 👈 sender til Formspree i bakgrunnen
  }

  if (plan === 'mini') {
    window.location.href =
      "https://astrofyeey.vercel.app/api/create-checkout?variantGid=gid://shopify/ProductVariant/45314321186972&quantity=1";
  } else {
    window.location.href =
      "https://astrofyeey.vercel.app/api/create-checkout?variantGid=gid://shopify/ProductVariant/45314320957596&quantity=1";
  }
};

  const plans = {
    full: {
      name: 'Full Report',
      price: 29,
      originalPrice: 29,
      description: 'Complete astrological analysis',
      features: [
        'Detailed personalized PDF report',
        'Detailed birth chart analysis',
        '3 power dates for next 30 days',
        'Love compatibility analysis',
        'Past life reading',
        'Transit predictions',
        'Shareable story cards (1080×1920)',
        'Delivered within 24 hours'
      ]
    },
    mini: {
      name: 'Mini Report',
      price: 19,
      originalPrice: 19,
      description: 'Perfect for first-timers',
      features: [
        'PDF report testimonial',
        '1 key insight',
        'Love compatibility analysis',
        'Delivered within 24 hours'
      ]
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center text-[#EBCB8B] hover:text-[#F3D27A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to form
            </button>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-serif mb-4">Choose your cosmic experience</h1>
          <p className="text-[#E6EAF2]/70">
            Select the perfect astrology package for your journey
          </p>
        </div>

        {/* Plan Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-6 text-center">Select Your Package</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className="p-6 glass glass-hover border-2 border-[#EBCB8B]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  {key === 'full' && (
                    <Badge className="bg-[#EBCB8B] text-[#0B0E1A]">
                      Best Value
                    </Badge>
                  )}
                  {key === 'mini' && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Starter
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-serif text-[#EBCB8B]">
                    ${plan.price}
                  </span>
                </div>
                
                <p className="text-[#E6EAF2]/70 mb-4">{plan.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-[#EBCB8B] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleDirectCheckout(key as 'full' | 'mini')}
                  disabled={isCreatingCheckout && loadingPlan === key}
                  className="w-full bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] astro-glow"
                >
                  {isCreatingCheckout && loadingPlan === key ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    key === 'mini' ? 'Get Mini Report' : 'Get Full Report'
                  )}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mb-8">
          <p className="text-[#E6EAF2]/70 text-lg">
            Click on your preferred package to continue to secure checkout
          </p>
        </div>

        {/* Security Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-[#E6EAF2]/50 text-sm">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            SSL Encrypted
          </div>
          <div className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Secure Payment
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 mr-2" />
            GDPR Compliant
          </div>
        </div>

        {/* Terms */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#E6EAF2]/50">
            By completing this order, you agree to our{' '}
            <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
