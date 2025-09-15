import { ArrowLeft, Mail, Clock, MessageCircle, HelpCircle, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center text-[#EBCB8B] hover:text-[#F3D27A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-serif mb-4">Contact Support</h1>
            <p className="text-[#E6EAF2]/70 max-w-2xl mx-auto">
              We're here to help! Get in touch with our support team for any questions, 
              technical issues, or assistance with your astrological reports.
            </p>
          </div>
        </div>

        {/* Main Contact Card */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EBCB8B] to-[#F3D27A] flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#0B0E1A]" />
          </div>
          
          <h2 className="text-2xl font-serif mb-4">Get In Touch</h2>
          <p className="text-[#E6EAF2]/70 mb-6">
            Email us directly for the fastest response. We typically reply within 24 hours.
          </p>
          
          <div className="bg-[#EBCB8B]/10 p-6 rounded-lg border border-[#EBCB8B]/20 mb-6">
            <p className="text-2xl font-medium text-[#EBCB8B] mb-2">astroocontacts@gmail.com</p>
            <p className="text-sm text-[#E6EAF2]/70">
              Our dedicated support team is ready to assist you
            </p>
          </div>
          
          <Button 
            onClick={() => window.location.href = 'mailto:astroocontacts@gmail.com'}
            className="bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] px-8 py-3 astro-glow"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 glass border-[#EBCB8B]/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-[#EBCB8B]/20 flex items-center justify-center text-[#EBCB8B] flex-shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-[#EBCB8B]">Order Support</h3>
                <p className="text-sm text-[#E6EAF2]/70 mb-3">
                  Issues with your order, delivery problems, or payment questions
                </p>
                <ul className="text-xs text-[#E6EAF2]/60 space-y-1">
                  <li>• Order not received</li>
                  <li>• Payment issues</li>
                  <li>• Delivery problems</li>
                  <li>• Order modifications</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-[#EBCB8B]/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-[#EBCB8B]/20 flex items-center justify-center text-[#EBCB8B] flex-shrink-0">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-[#EBCB8B]">Report Corrections</h3>
                <p className="text-sm text-[#E6EAF2]/70 mb-3">
                  Technical errors or corrections needed for your astrological report (contact within 2 hours)
                </p>
                <ul className="text-xs text-[#E6EAF2]/60 space-y-1">
                  <li>• Calculation errors</li>
                  <li>• Missing content</li>
                  <li>• File format issues</li>
                  <li>• Birth data corrections</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-[#EBCB8B]/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-[#EBCB8B]/20 flex items-center justify-center text-[#EBCB8B] flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-[#EBCB8B]">General Questions</h3>
                <p className="text-sm text-[#E6EAF2]/70 mb-3">
                  Questions about our services, astrology, or how our reports work
                </p>
                <ul className="text-xs text-[#E6EAF2]/60 space-y-1">
                  <li>• Service information</li>
                  <li>• How reports work</li>
                  <li>• Astrological questions</li>
                  <li>• Account assistance</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass border-[#EBCB8B]/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-[#EBCB8B]/20 flex items-center justify-center text-[#EBCB8B] flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-[#EBCB8B]">Business Inquiries</h3>
                <p className="text-sm text-[#E6EAF2]/70 mb-3">
                  Partnerships, bulk orders, or other business-related questions
                </p>
                <ul className="text-xs text-[#E6EAF2]/60 space-y-1">
                  <li>• Partnership opportunities</li>
                  <li>• Bulk orders</li>
                  <li>• Media inquiries</li>
                  <li>• Collaborations</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Response Times */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 mb-8">
          <h2 className="text-xl font-medium mb-6 text-center text-[#EBCB8B] flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2" />
            Response Times
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-serif text-[#EBCB8B] mb-2">30 minutes</div>
              <div className="font-medium mb-2">Report Corrections</div>
              <p className="text-sm text-[#E6EAF2]/70">
                Technical errors or calculation mistakes (within 2 hours of delivery)
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-serif text-[#EBCB8B] mb-2">24 hours</div>
              <div className="font-medium mb-2">Standard Support</div>
              <p className="text-sm text-[#E6EAF2]/70">
                General questions, order inquiries, or report corrections
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-serif text-[#EBCB8B] mb-2">48 hours</div>
              <div className="font-medium mb-2">Complex Issues</div>
              <p className="text-sm text-[#E6EAF2]/70">
                Technical investigations or detailed astrological questions
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Contacting Support */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 mb-8">
          <h2 className="text-xl font-medium mb-6 text-[#EBCB8B]">Tips for Faster Support</h2>
          
          <div className="space-y-4 text-[#E6EAF2]/80">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#EBCB8B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-[#EBCB8B]">1</span>
              </div>
              <div>
                <p className="font-medium">Include your order number</p>
                <p className="text-sm text-[#E6EAF2]/70">
                  This helps us locate your account and order details quickly
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#EBCB8B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-[#EBCB8B]">2</span>
              </div>
              <div>
                <p className="font-medium">Be specific about the issue</p>
                <p className="text-sm text-[#E6EAF2]/70">
                  Detailed descriptions help us understand and resolve problems faster
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#EBCB8B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-[#EBCB8B]">3</span>
              </div>
              <div>
                <p className="font-medium">Include screenshots if relevant</p>
                <p className="text-sm text-[#E6EAF2]/70">
                  Visual aids help us identify technical issues more quickly
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#EBCB8B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-[#EBCB8B]">4</span>
              </div>
              <div>
                <p className="font-medium">Check your spam folder</p>
                <p className="text-sm text-[#E6EAF2]/70">
                  Our responses might end up in spam - add us to your contacts!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Preview */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20">
          <h2 className="text-xl font-medium mb-6 text-[#EBCB8B]">Quick Answers</h2>
          
          <div className="space-y-4">
            <div className="border-b border-[#EBCB8B]/10 pb-4">
              <p className="font-medium mb-2">How long does delivery take?</p>
              <p className="text-sm text-[#E6EAF2]/70">
                Mini reports are instant. Full reports take 2-4 hours and are delivered directly to your email.
              </p>
            </div>
            
            <div className="border-b border-[#EBCB8B]/10 pb-4">
              <p className="font-medium mb-2">What if there's an error in my report?</p>
              <p className="text-sm text-[#E6EAF2]/70">
                We offer free corrections for technical errors! Contact us within 2 hours of delivery with your order number and we'll fix it immediately.
              </p>
            </div>
            
            <div className="border-b border-[#EBCB8B]/10 pb-4">
              <p className="font-medium mb-2">What if I don't know my exact birth time?</p>
              <p className="text-sm text-[#E6EAF2]/70">
                You can still get accurate results! Check 'not sure about time' and we'll provide insights based on your birth date and location.
              </p>
            </div>
            
            <div>
              <p className="font-medium mb-2">Is my personal data secure?</p>
              <p className="text-sm text-[#E6EAF2]/70">
                Yes! We're fully GDPR compliant and use encryption to protect your data. Birth information is used only for generating your report.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#E6EAF2]/50 text-sm">
          <p>
            Still have questions? Don't hesitate to reach out at{' '}
            <a href="mailto:astroocontacts@gmail.com" className="text-[#EBCB8B] hover:text-[#F3D27A]">
              astroocontacts@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}