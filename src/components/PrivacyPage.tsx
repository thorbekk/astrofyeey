import { ArrowLeft, Shield, Eye, Lock, User } from 'lucide-react';
import { Button } from './ui/button';

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
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
            <h1 className="text-3xl lg:text-4xl font-serif mb-4">Privacy Policy</h1>
            <p className="text-[#E6EAF2]/70">
              Last updated: January 1, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B] flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Our Commitment to Privacy
            </h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                At AstroFye, we are committed to protecting your privacy and personal data. This Privacy Policy explains 
                how we collect, use, and safeguard your information when you use our astrological services.
              </p>
              <p className="bg-[#EBCB8B]/10 p-4 rounded-lg border border-[#EBCB8B]/20">
                <strong className="text-[#EBCB8B]">Important:</strong> We are fully GDPR compliant and follow best practices 
                for data protection and privacy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B] flex items-center">
              <User className="w-5 h-5 mr-2" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <h3 className="font-medium text-[#EBCB8B]">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Birth date, time, and location</li>
                <li>Favorite color (for report personalization)</li>
              </ul>
              
              <h3 className="font-medium text-[#EBCB8B] mt-6">Technical Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and location</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
              </ul>
              
              <h3 className="font-medium text-[#EBCB8B] mt-6">Payment Information</h3>
              <p>
                Payment details are processed securely by our payment partners (Shopify Payments). We do not store 
                your credit card information on our servers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B] flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>We use your personal information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generate your personalized astrological reports</li>
                <li>Calculate accurate birth chart data</li>
                <li>Deliver your digital products via email</li>
                <li>Provide customer support</li>
                <li>Improve our services and user experience</li>
                <li>Send important updates about your order</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <p className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 mt-6">
                <strong className="text-red-400">We will never:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-red-400">
                <li>Sell your personal data to third parties</li>
                <li>Use your birth data for any purpose other than generating your report</li>
                <li>Send unsolicited marketing emails without your consent</li>
                <li>Share your information with advertisers</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B] flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Data Security & Storage
            </h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <h3 className="font-medium text-[#EBCB8B]">Security Measures</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure, encrypted databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access controls for staff</li>
                <li>Secure backup procedures</li>
              </ul>
              
              <h3 className="font-medium text-[#EBCB8B] mt-6">Data Retention</h3>
              <p>
                We retain your personal data only as long as necessary to provide our services and comply with legal 
                obligations. Birth data is kept for report accuracy and potential corrections but can be deleted upon request.
              </p>
              
              <h3 className="font-medium text-[#EBCB8B] mt-6">International Transfers</h3>
              <p>
                Your data may be processed in countries outside the EU. We ensure appropriate safeguards are in place 
                and that all transfers comply with GDPR requirements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Your Rights Under GDPR</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdraw consent:</strong> Revoke consent for data processing</li>
              </ul>
              
              <p className="bg-[#EBCB8B]/10 p-4 rounded-lg border border-[#EBCB8B]/20 mt-6">
                To exercise any of these rights, contact us at <strong className="text-[#EBCB8B]">astroocontacts@gmail.com</strong>. 
                We will respond within 30 days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Cookies & Tracking</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                We use minimal cookies and tracking technologies to improve your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Preference cookies:</strong> Remember your settings and choices</li>
              </ul>
              <p>
                You can control cookie settings through your browser. Disabling certain cookies may affect site functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Third-Party Services</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>We work with trusted partners who help us provide our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Shopify:</strong> Payment processing and order management</li>
                <li><strong>Email providers:</strong> Secure delivery of your reports</li>
                <li><strong>Analytics services:</strong> Website performance and user insights</li>
              </ul>
              <p>
                All partners are required to maintain the same high standards of data protection and privacy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Children's Privacy</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                Our services are not intended for children under 16 years of age. We do not knowingly collect 
                personal information from children under 16. If you believe we have collected information from 
                a child under 16, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Changes to This Policy</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes 
                by email or through our website. The "Last updated" date at the top of this policy indicates when 
                the last changes were made.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-[#EBCB8B]">Contact Us</h2>
            <div className="space-y-4 text-[#E6EAF2]/80">
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-[#EBCB8B]/10 p-4 rounded-lg border border-[#EBCB8B]/20">
                <p className="font-medium text-[#EBCB8B]">Email: astroocontacts@gmail.com</p>
                <p className="text-sm mt-2">We typically respond within 24 hours</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#E6EAF2]/50 text-sm">
          <p>
            Questions about your data? <a href="mailto:astroocontacts@gmail.com" className="text-[#EBCB8B] hover:text-[#F3D27A]">Contact our privacy team</a>
          </p>
        </div>
      </div>
    </div>
  );
}