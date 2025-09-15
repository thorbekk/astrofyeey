import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Calendar, User, Mail, Palette, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';

interface BirthDataFormProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function BirthDataForm({ onComplete, onBack }: BirthDataFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    birthTime: '',
    uncertainTime: false,
    birthCity: '',
    birthCountry: '',
    favoriteColor: '#EBCB8B',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const maxSteps = 2;

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value || value.length < 2) {
          newErrors.fullName = 'Please enter your full name (at least 2 characters)';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email is required for delivery';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'birthDate':
        if (!value) {
          newErrors.birthDate = 'Birth date is required';
        } else {
          const date = new Date(value);
          const now = new Date();
          if (date > now) {
            newErrors.birthDate = 'Birth date cannot be in the future';
          } else {
            delete newErrors.birthDate;
          }
        }
        break;
      case 'birthCity':
        if (!value || value.length < 2) {
          newErrors.birthCity = 'Please enter your birth city';
        } else {
          delete newErrors.birthCity;
        }
        break;
      case 'birthCountry':
        if (!value) {
          newErrors.birthCountry = 'Please select your birth country';
        } else {
          delete newErrors.birthCountry;
        }
        break;
      case 'consent':
        if (!value) {
          newErrors.consent = 'You must consent to data processing to continue';
        } else {
          delete newErrors.consent;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const canProceedToNextStep = () => {
    if (step === 1) {
      return formData.fullName && formData.email && formData.birthDate && !errors.fullName && !errors.email && !errors.birthDate;
    }
    return true;
  };

  const canSubmit = () => {
    return formData.fullName && formData.email && formData.birthDate && 
           formData.birthCity && formData.birthCountry && formData.consent &&
           Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      onComplete(formData);
    }
  };

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Other'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={onBack}
              className="inline-flex items-center text-[#EBCB8B] hover:text-[#F3D27A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </button>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-serif mb-4">Tell us about yourself</h1>
          <p className="text-[#E6EAF2]/70 mb-6">
            We need your birth details to create your personalized astro report
          </p>
          
          {/* Progress */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-sm text-[#E6EAF2]/50 mb-2">
              <span>Step {step} of {maxSteps}</span>
              <span>{Math.round((step / maxSteps) * 100)}%</span>
            </div>
            <Progress value={(step / maxSteps) * 100} className="h-2" />
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8 border border-[#EBCB8B]/20">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-6">Basic Information</h2>
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={`bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] placeholder:text-[#E6EAF2]/50 focus:border-[#EBCB8B] ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </p>
                )}
                {formData.fullName && !errors.fullName && (
                  <p className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Looks good!
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className={`bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] placeholder:text-[#E6EAF2]/50 focus:border-[#EBCB8B] ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
                {formData.email && !errors.email && (
                  <p className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    We'll send your report here
                  </p>
                )}
                <p className="text-[#E6EAF2]/50 text-sm">
                  We'll send your personalized report to this email
                </p>
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Birth Date *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={`bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] focus:border-[#EBCB8B] ${
                    errors.birthDate ? 'border-red-500' : ''
                  }`}
                />
                {errors.birthDate && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.birthDate}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToNextStep()}
                  className="w-full max-w-md bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] py-3"
                >
                  Continue to Birth Details
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Birth Details</h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-[#EBCB8B] hover:text-[#F3D27A] transition-colors text-sm"
                >
                  ← Back
                </button>
              </div>

              {/* Birth Time */}
              <div className="space-y-2">
                <Label htmlFor="birthTime" className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Birth Time
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => handleInputChange('birthTime', e.target.value)}
                  disabled={formData.uncertainTime}
                  className="bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] focus:border-[#EBCB8B]"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uncertainTime"
                    checked={formData.uncertainTime}
                    onCheckedChange={(checked) => handleInputChange('uncertainTime', checked)}
                  />
                  <Label htmlFor="uncertainTime" className="text-sm text-[#E6EAF2]/70">
                    Not sure about exact time
                  </Label>
                </div>
                <p className="text-[#E6EAF2]/50 text-sm">
                  If unsure, pick approximate time or check 'Not sure'
                </p>
              </div>

              {/* Birth City */}
              <div className="space-y-2">
                <Label htmlFor="birthCity" className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Birth City *
                </Label>
                <Input
                  id="birthCity"
                  value={formData.birthCity}
                  onChange={(e) => handleInputChange('birthCity', e.target.value)}
                  placeholder="e.g., New York, London, Tokyo"
                  className={`bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] placeholder:text-[#E6EAF2]/50 focus:border-[#EBCB8B] ${
                    errors.birthCity ? 'border-red-500' : ''
                  }`}
                />
                {errors.birthCity && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.birthCity}
                  </p>
                )}
              </div>

              {/* Birth Country */}
              <div className="space-y-2">
                <Label htmlFor="birthCountry">Birth Country *</Label>
                <Select value={formData.birthCountry} onValueChange={(value) => handleInputChange('birthCountry', value)}>
                  <SelectTrigger className={`bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] focus:border-[#EBCB8B] ${
                    errors.birthCountry ? 'border-red-500' : ''
                  }`}>
                    <SelectValue placeholder="Select your birth country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.birthCountry && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.birthCountry}
                  </p>
                )}
                <p className="text-[#E6EAF2]/50 text-sm">
                  We auto-detect your time zone based on location
                </p>
              </div>

              {/* Favorite Color */}
              <div className="space-y-2">
                <Label htmlFor="favoriteColor" className="flex items-center">
                  <Palette className="w-4 h-4 mr-2 text-[#EBCB8B]" />
                  Favorite Color
                </Label>
                <div className="flex space-x-4">
                  <input
                    id="favoriteColor"
                    type="color"
                    value={formData.favoriteColor}
                    onChange={(e) => handleInputChange('favoriteColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-[#EBCB8B]/30 bg-[#10162A] cursor-pointer"
                  />
                  <Input
                    value={formData.favoriteColor}
                    onChange={(e) => handleInputChange('favoriteColor', e.target.value)}
                    placeholder="#EBCB8B"
                    className="bg-[#10162A] border-[#EBCB8B]/30 text-[#E6EAF2] placeholder:text-[#E6EAF2]/50 focus:border-[#EBCB8B] flex-1"
                  />
                </div>
                <p className="text-[#E6EAF2]/50 text-sm">
                  Used for personalizing your report design
                </p>
              </div>

              {/* Consent */}
              <div className="space-y-4 pt-4 border-t border-[#EBCB8B]/20">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange('consent', checked)}
                    className={errors.consent ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="consent" className="text-sm text-[#E6EAF2]/80 leading-relaxed">
                    I consent to processing my data to generate my personalized astrology report. 
                    I understand this is for entertainment purposes only and not medical or financial advice. 
                    <span className="text-[#EBCB8B]"> (GDPR compliant)</span>
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit()}
                  className="w-full max-w-md bg-[#EBCB8B] text-[#0B0E1A] hover:bg-[#F3D27A] py-3"
                >
                  Continue to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8 text-[#E6EAF2]/50 text-sm">
          <p>Need help? <a href="#" className="text-[#EBCB8B] hover:text-[#F3D27A]">Contact support</a></p>
        </div>
      </div>
    </div>
  );
}