import { useState } from 'react';
import { Download, Share2, Star, Mail, Facebook, Copy, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ThankYouPageProps {
  onNewReport: () => void;
}

export function ThankYouPage({ onNewReport }: ThankYouPageProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = "https://astrofye.com/share/sarah-cosmic-journey";
  const shareText = "Just got my personalized astro report from AstroFye! 🌟 The insights were incredible!";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EBCB8B] to-[#F3D27A] flex items-center justify-center mx-auto mb-6 astro-glow">
            <CheckCircle className="w-10 h-10 text-[#0B0E1A]" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-serif mb-4">
            Your cosmic journey <span className="text-[#EBCB8B]">awaits!</span>
          </h1>
          <p className="text-lg text-[#E6EAF2]/70 max-w-2xl mx-auto">
            Thank you for your order! Your personalized astrology report has been delivered to your email.
          </p>
        </div>

        {/* Delivery Status */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-8 glass border-[#EBCB8B]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Your Astrology Report</h3>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Ready
              </Badge>
            </div>
            <p className="text-[#E6EAF2]/70 mb-6">
              Your personalized astrology report with birth chart analysis, power dates, compatibility insights, and shareable story cards.
            </p>
            <div className="flex justify-center">
              <Button className="w-full max-w-md bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] py-3 text-lg">
                <Download className="w-4 h-4 mr-2" />
                Download Complete Report
              </Button>
            </div>
          </Card>
        </div>

        {/* Shareable Content */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20 mb-12">
          <h2 className="text-2xl font-serif mb-6 text-center">Share your cosmic results</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Story Cards Preview */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Shareable Story Cards (1080×1920)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: "Birth Chart", subtitle: "Your cosmic blueprint" },
                  { title: "Power Dates", subtitle: "Next 30 days" },
                  { title: "Compatibility", subtitle: "Love insights" },
                ].map((card, i) => (
                  <div key={i} className="aspect-[9/16] bg-gradient-to-br from-[#1A1440] to-[#10162A] rounded-lg p-4 relative overflow-hidden border border-[#EBCB8B]/20">
                    <div className="absolute top-4 left-4 right-4">
                      <h4 className="text-sm font-medium text-[#EBCB8B]">{card.title}</h4>
                      <p className="text-xs text-[#E6EAF2]/70">{card.subtitle}</p>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs text-[#E6EAF2]/50">@AstroFye</div>
                    </div>
                    {/* Decorative stars */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-1 h-1 bg-[#EBCB8B] rounded-full opacity-60"
                          style={{
                            left: `${25 + (j * 15)}%`,
                            top: `${25 + (j * 15)}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button className="w-full max-w-xs bg-[#10162A] text-[#EBCB8B] border border-[#EBCB8B]/30 hover:bg-[#EBCB8B]/10" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Story Cards
                </Button>
              </div>
            </div>

            {/* Social Sharing */}
            <div>
              <h3 className="text-lg font-medium mb-4">Share on Social</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleSocialShare('facebook')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="w-full justify-start border-[#EBCB8B]/30 text-[#EBCB8B] hover:bg-[#EBCB8B]/10"
                >
                  {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 glass border-[#EBCB8B]/20">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Mail className="w-5 h-5 text-[#EBCB8B] mr-2" />
              Check Your Email
            </h3>
            <p className="text-[#E6EAF2]/70 mb-4">
              We've sent your PDF report and story cards to your email. Check your inbox for the download links.
            </p>
            <div className="text-sm text-[#E6EAF2]/50">
              Order #: AF-2025-001247
            </div>
          </Card>

          <Card className="p-6 glass border-[#EBCB8B]/20">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Star className="w-5 h-5 text-[#EBCB8B] mr-2" />
              Leave a Review
            </h3>
            <p className="text-[#E6EAF2]/70 mb-4">
              Help others discover their cosmic potential. Share your experience with our community.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" className="border-[#EBCB8B]/30 text-[#EBCB8B] hover:bg-[#EBCB8B]/10">
                Write Review
              </Button>
            </div>
          </Card>
        </div>

        {/* Get Another Report */}
        <div className="text-center glass rounded-2xl p-8 border border-[#EBCB8B]/20">
          <h2 className="text-2xl font-serif mb-4">Want another reading?</h2>
          <p className="text-[#E6EAF2]/70 mb-6">
            Create reports for friends, family, or explore different aspects of your cosmic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={onNewReport}
              className="bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] px-8"
            >
              Create New Report
            </Button>
            <Button
              variant="outline"
              className="border-[#EBCB8B]/30 text-[#EBCB8B] hover:bg-[#EBCB8B]/10 px-8"
            >
              Gift a Report
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[#E6EAF2]/50 text-sm">
          <p>
            Need help? <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Contact support</a> • 
            <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A] ml-2">Download receipt</a>
          </p>
        </div>
      </div>
    </div>
  );
}