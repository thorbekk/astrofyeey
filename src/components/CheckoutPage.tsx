import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Shield, Gift, Lock, Check, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  getProduct, 
  createCheckout, 
  addCustomerToCheckout, 
  PRODUCT_HANDLES, 
  MOCK_PRODUCTS,
  formatBirthDataForShopify 
} from '../lib/shopify';
import { toast } from 'sonner@2.0.3';

interface CheckoutPageProps {
  onComplete: () => void;
  onBack: () => void;
  formData?: any; // Birth data from the form
}

export function CheckoutPage({ onComplete, onBack, formData }: CheckoutPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'full' | 'mini'>('full');
  const [promoCode, setPromoCode] = useState('');
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [product, setProduct] = useState(MOCK_PRODUCTS[PRODUCT_HANDLES.FULL_REPORT]);
  const [useShopify, setUseShopify] = useState(false); // Toggle for testing

  // Load product data on component mount
  useEffect(() => {
    const loadProduct = async () => {
      if (useShopify) {
        try {
          const productHandle = selectedPlan === 'full' ? PRODUCT_HANDLES.FULL_REPORT : PRODUCT_HANDLES.MINI_REPORT;
          const shopifyProduct = await getProduct(productHandle);
          if (shopifyProduct) {
            setProduct(shopifyProduct);
          }
        } catch (error) {
          console.error('Error loading Shopify product:', error);
          // Fallback to mock data
          setProduct(MOCK_PRODUCTS[selectedPlan === 'full' ? PRODUCT_HANDLES.FULL_REPORT : PRODUCT_HANDLES.MINI_REPORT]);
        }
      } else {
        // Use mock data for development
        setProduct(MOCK_PRODUCTS[selectedPlan === 'full' ? PRODUCT_HANDLES.FULL_REPORT : PRODUCT_HANDLES.MINI_REPORT]);
      }
    };

    loadProduct();
  }, [selectedPlan, useShopify]);

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
        'Crush compatibility score',
        'Transit predictions',
        'Shareable story cards (1080×1920)',
        'Instant delivery'
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
        'Instant delivery'
      ]
    }
  };

  const currentPlan = plans[selectedPlan];
  const savings = 0;

  // Handle Shopify checkout creation
  const handleShopifyCheckout = async () => {
    if (!product?.variants?.edges?.[0]?.node?.id) {
      toast.error('Product not available');
      return;
    }

    setIsCreatingCheckout(true);
    
    try {
      // Create checkout with product
      const variantId = product.variants.edges[0].node.id;
      const checkout = await createCheckout(variantId, 1);
      
      if (!checkout) {
        throw new Error('Failed to create checkout');
      }

      // Add customer email and birth data if available
      if (formData?.email) {
        const birthDataAttributes = formatBirthDataForShopify(formData);
        await addCustomerToCheckout(checkout.id, formData.email, birthDataAttributes);
      }

      // Redirect to Shopify checkout
      window.location.href = checkout.webUrl;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout. Please try again.');
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  // Handle demo checkout (original flow)
  const handleDemoCheckout = () => {
    toast.success('Demo order completed! Redirecting...');
    setTimeout(() => {
      onComplete();
    }, 1500);
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Select Your Package</h2>
              {/* Development toggle */}
              <div className="flex items-center space-x-2 text-sm">
                <Label htmlFor="shopify-toggle">Use Shopify</Label>
                <Switch
                  id="shopify-toggle"
                  checked={useShopify}
                  onCheckedChange={setUseShopify}
                />
              </div>
            </div>
            
            {/* Plan Selection */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {Object.entries(plans).map(([key, plan]) => (
                <Card
                  key={key}
                  className={`p-6 cursor-pointer transition-all duration-300 glass glass-hover border-2 ${
                    selectedPlan === key 
                      ? 'border-[#EBCB8B] ring-2 ring-[#EBCB8B]/20' 
                      : 'border-[#EBCB8B]/20'
                  }`}
                  onClick={() => setSelectedPlan(key as 'full' | 'mini')}
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
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-[#EBCB8B] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* Promo Code */}
            {(
              <div className="glass rounded-xl p-6 border border-[#EBCB8B]/20">
                <div className="flex items-center space-x-4">
                  <Gift className="w-5 h-5 text-[#EBCB8B]" />
                  <div className="flex-1">
                    <Label htmlFor="promoCode" className="text-sm">Promo Code</Label>
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <Input
                        id="promoCode"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] flex-1"
                      />
                      <Button 
                        variant="outline" 
                        className="border-[#EBCB8B]/30 text-[#EBCB8B] hover:bg-[#EBCB8B]/10 w-full sm:w-auto"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Info */}
            {(
              <div className="glass rounded-xl p-6 border border-[#EBCB8B]/20">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-[#EBCB8B] mr-2" />
                  Payment Method
                </h3>
                
                {useShopify ? (
                  <div className="text-center py-6">
                    <p className="text-[#E6EAF2]/70 mb-4">
                      Payment will be processed securely through Shopify Checkout
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-[#E6EAF2]/50">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        SSL Encrypted
                      </div>
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        PCI Compliant
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[#E6EAF2]/70 mb-4">
                      Demo mode - no actual payment required
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-[#E6EAF2]/50">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Demo Transaction
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

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
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 border border-[#EBCB8B]/20 sticky top-8">
              <h3 className="text-lg font-medium mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>{currentPlan.name}</span>
                  <span>${currentPlan.price}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Savings</span>
                    <span>-€{savings}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-[#E6EAF2]/50">
                  <span>Tax (included)</span>
                  <span>${(currentPlan.price * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="pt-4 border-t border-[#EBCB8B]/20">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span className="text-[#EBCB8B]">${currentPlan.price}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={useShopify ? handleShopifyCheckout : handleDemoCheckout}
                disabled={isCreatingCheckout}
                className="w-full bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] py-3 text-lg astro-glow"
              >
                {isCreatingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Checkout...
                  </>
                ) : useShopify ? (
                  <>
                    Continue to Shopify
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  selectedPlan === 'mini' ? 'Get Mini Report' : 'Get Full Report'
                )}
              </Button>

              <div className="mt-6 space-y-3 text-sm text-[#E6EAF2]/60">
                <p className="flex items-start">
                  <Check className="w-4 h-4 mr-2 mt-0.5 text-[#EBCB8B] flex-shrink-0" />
                  Digital files — no refunds after delivery
                </p>
                <p className="flex items-start">
                  <Check className="w-4 h-4 mr-2 mt-0.5 text-[#EBCB8B] flex-shrink-0" />
                  We correct any errors free of charge
                </p>
                <p className="flex items-start">
                  <Check className="w-4 h-4 mr-2 mt-0.5 text-[#EBCB8B] flex-shrink-0" />
                  Instant delivery for PDF reports
                </p>
                {useShopify && (
                  <p className="flex items-start">
                    <Shield className="w-4 h-4 mr-2 mt-0.5 text-[#EBCB8B] flex-shrink-0" />
                    Powered by Shopify - secure & trusted
                  </p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-[#EBCB8B]/20 text-center">
                <p className="text-xs text-[#E6EAF2]/50">
                  By completing this order, you agree to our{' '}
                  <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}