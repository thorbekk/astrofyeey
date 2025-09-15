import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
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
            <h1 className="text-3xl lg:text-4xl font-serif mb-4">Terms of Service</h1>
            <p className="text-[#E6EAF2]/70">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                By accessing and using AstroFye's services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">2. Service Description</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                AstroFye provides personalized astrological reports and related content for entertainment and self-insight purposes only. 
                Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personalized astrology reports based on birth data</li>
                <li>Digital content including PDFs and shareable graphics</li>
                <li>Astrological insights and predictions</li>
                <li>Birth chart analysis and interpretations</li>
              </ul>
              <p className="font-medium text-[#EBCB8B]">
                Important: All content is for entertainment purposes only and should not be considered as medical, 
                financial, legal, or professional advice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">3. User Responsibilities</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate birth information for report generation</li>
                <li>Use the service for personal, non-commercial purposes only</li>
                <li>Not share, redistribute, or resell our content without permission</li>
                <li>Respect intellectual property rights</li>
                <li>Not use the service for any illegal or harmful activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">4. Payment and Corrections</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                All payments are processed securely through our payment partners. Due to the digital nature of our products, 
                <strong className="text-[#EBCB8B]"> refunds are not available</strong> once content has been delivered.
              </p>
              <p>
                However, we offer <strong className="text-[#EBCB8B]">free corrections</strong> for any technical errors in your report. 
                If you believe there's an error in calculations or missing content, please contact us within 
                <strong className="text-[#EBCB8B]"> 2 hours of delivery</strong> for immediate correction.
              </p>
              <div className="bg-[#EBCB8B]/10 p-4 rounded-lg border border-[#EBCB8B]/20">
                <p className="text-[#EBCB8B] font-medium">
                  Contact: astroocontacts@gmail.com with your order number and specific error details.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">5. Privacy and Data Protection</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                We are committed to protecting your privacy and personal data in accordance with GDPR and other applicable 
                data protection laws. Please refer to our Privacy Policy for detailed information about how we collect, 
                use, and protect your data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">6. Limitation of Liability</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                AstroFye provides astrological content for entertainment purposes only. We do not guarantee the accuracy 
                of predictions or interpretations. Users should not make important life decisions based solely on 
                astrological content.
              </p>
              <p>
                To the fullest extent permitted by law, AstroFye shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising out of your use of our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">7. Intellectual Property</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                All content, including but not limited to text, graphics, logos, images, and software, is the property 
                of AstroFye and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                You may use your personalized report for personal purposes but may not reproduce, distribute, or 
                create derivative works without our written permission.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">8. Modifications to Terms</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                We reserve the right to modify these terms at any time. Updated terms will be posted on our website 
                with a new "Last updated" date. Continued use of our services after changes constitutes acceptance 
                of the modified terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">9. Contact Information</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-medium text-[#EBCB8B]">
                astroocontacts@gmail.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#E6EAF2]/50 text-sm">
          <p>
            Need help? <a href="mailto:astroocontacts@gmail.com" className="text-[#EBCB8B] hover:text-[#F3D27A]">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}