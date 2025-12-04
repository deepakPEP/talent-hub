/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Building2, User, Briefcase, Send, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Your name is required'),
  email: z.string().email('Please enter a valid email'),
  countryCode: z.string(),
  phoneNumber: z.string().optional(),
  rolesInterested: z.array(z.string()).min(1, 'Please select at least one role'),
  hiringChallenge: z.string().min(1, 'Please select your hiring challenge'),
  timeline: z.string().min(1, 'Please select your timeline'),
  coBrandingConsent: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const roleOptions = [
  'Sales & Business Development',
  'Marketing & Social Media',
  'Operations & Supply Chain',
  'Finance & Accounting',
  'Customer Service',
  'Research & Analysis',
  'Content Writing',
  'Software Development',
  'Design & Creative',
  'HR & Administration',
];

const challengeOptions = [
  'Finding skilled candidates',
  'High recruitment costs',
  'Long hiring timelines',
  'High turnover rates',
  'Training new hires',
  'Scaling the team quickly',
  'Other',
];

const timelineOptions = [
  'Immediately (within 2 weeks)',
  'Within 1 month',
  'Within 3 months',
  'Just exploring options',
];

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
];

// Map country codes to dial codes
const countryToDialCode: Record<string, string> = {
  'IN': '+91',
  'US': '+1',
  'CA': '+1',
  'GB': '+44',
  'AE': '+971',
  'SG': '+65',
  'AU': '+61',
  'DE': '+49',
  'FR': '+33',
  'JP': '+81',
  'CN': '+86',
  'KR': '+82',
  'BR': '+55',
  'MX': '+52',
  'NL': '+31',
  'IT': '+39',
  'ES': '+34',
  'RU': '+7',
  'ZA': '+27',
  'SA': '+966',
  'MY': '+60',
};

export function TalentInquiryForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    rolesInterested: [],
    hiringChallenge: '',
    timeline: '',
    coBrandingConsent: false,
  });

  // Detect country and autofill from profile
  useEffect(() => {
    const initializeForm = async () => {
      try {
        // 1. Detect country from IP
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          if (data.country_code && countryToDialCode[data.country_code]) {
            setFormData(prev => ({
              ...prev,
              countryCode: countryToDialCode[data.country_code],
            }));
          }
        } catch {
          console.log('Could not detect country, using default');
        }
      } catch (error) {
        console.error('Error initializing form:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeForm();
  }, []);

  const updateField = (field: keyof FormData, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      rolesInterested: prev.rolesInterested.includes(role)
        ? prev.rolesInterested.filter(r => r !== role)
        : [...prev.rolesInterested, role],
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.companyName || formData.companyName.length < 2) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.contactName || formData.contactName.length < 2) {
        newErrors.contactName = 'Your name is required';
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (stepNumber === 2) {
      if (formData.rolesInterested.length === 0) {
        newErrors.rolesInterested = 'Please select at least one role';
      }
      if (!formData.hiringChallenge) {
        newErrors.hiringChallenge = 'Please select your hiring challenge';
      }
      if (!formData.timeline) {
        newErrors.timeline = 'Please select your timeline';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Combine country code and phone number for submission
  const getFullPhone = () => {
    if (!formData.phoneNumber) return '';
    return `${formData.countryCode} ${formData.phoneNumber}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        phone: getFullPhone(),
      };
      
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit inquiry');
      }

      setIsSubmitted(true);
      toast({
        title: 'Inquiry Submitted!',
        description: result.message || 'We\'ll be in touch within 24-48 hours.',
      });
    } catch (error: unknown) {
      console.error('Error submitting inquiry:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast({
        title: 'Submission Failed',
        description: errorMessage || 'Please try again or contact support@pepagora.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </motion.div>
          <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            Your inquiry has been submitted successfully. Our team will review your requirements and contact you within 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to <strong>{formData.email}</strong>
          </p>
        </CardContent>
      </Card>
    );
  }

  const stepIndicators = [
    { number: 1, label: 'Contact Info', icon: User },
    { number: 2, label: 'Requirements', icon: Briefcase },
    { number: 3, label: 'Review', icon: Send },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl ">Get Started with Talent Hub</CardTitle>
        <CardDescription>Tell us about your hiring needs</CardDescription>
        
        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {stepIndicators.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors  ${
                  step >= s.number
                    ? 'bg-primary text-primary-foreground text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              {index < stepIndicators.length - 1 && (
                <div
                  className={`w-12 h-1 mx-1 transition-colors ${
                    step > s.number ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    name="organization"
                    autoComplete="organization"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={e => updateField('companyName', e.target.value)}
                    className={`pl-10 ${errors.companyName ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="contactName"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={formData.contactName}
                    onChange={e => updateField('contactName', e.target.value)}
                    className={`pl-10 ${errors.contactName ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="flex gap-2">
                  <Select value={formData.countryCode} onValueChange={v => updateField('countryCode', v)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map(cc => (
                        <SelectItem key={cc.code} value={cc.code}>
                          <span className="flex items-center gap-2">
                            <span>{cc.flag}</span>
                            <span>{cc.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="tel-national"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={e => {
                        // Only allow digits
                        const value = e.target.value.replace(/\D/g, '');
                        updateField('phoneNumber', value);
                      }}
                      className="pl-10"
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={nextStep} className="gap-2 text-white cursor-pointer">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label>What roles are you hiring for? *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map(role => (
                    <div
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                        formData.rolesInterested.includes(role)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-muted border-border'
                      }`}
                    >
                      {role}
                    </div>
                  ))}
                </div>
                {errors.rolesInterested && <p className="text-sm text-destructive">{errors.rolesInterested}</p>}
              </div>

              <div className="space-y-2">
                <Label>What&apos;s your biggest hiring challenge? *</Label>
                <Select value={formData.hiringChallenge} onValueChange={v => updateField('hiringChallenge', v)}>
                  <SelectTrigger className={errors.hiringChallenge ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {challengeOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.hiringChallenge && <p className="text-sm text-destructive">{errors.hiringChallenge}</p>}
              </div>

              <div className="space-y-2">
                <Label>When do you need to hire? *</Label>
                <Select value={formData.timeline} onValueChange={v => updateField('timeline', v)}>
                  <SelectTrigger className={errors.timeline ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-sm text-destructive">{errors.timeline}</p>}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep} className="gap-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={nextStep} className="gap-2 cursor-pointer text-white">
                  Review <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Contact Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Company:</span>
                  <span>{formData.companyName}</span>
                  <span className="text-muted-foreground">Name:</span>
                  <span>{formData.contactName}</span>
                  <span className="text-muted-foreground">Email:</span>
                  <span className='wrap-break-word md:break-normal'>{formData.email}</span>
                  {formData.phoneNumber && (
                    <>
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{getFullPhone()}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold">Hiring Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Roles: </span>
                    <span>{formData.rolesInterested.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Challenge: </span>
                    <span>{formData.hiringChallenge}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeline: </span>
                    <span>{formData.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Checkbox
                  id="coBranding"
                  checked={formData.coBrandingConsent}
                  onCheckedChange={checked => updateField('coBrandingConsent', checked)}
                  className='cursor-pointer'
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="coBranding" className="text-sm font-medium cursor-pointer">
                    Co-branding Permission (Recommended)
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Allow us to use your company name and logo on talent opportunity materials so candidates know they&apos;re working on real projects.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep} className="gap-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 cursor-pointer text-white">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
