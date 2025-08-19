'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Study } from '@/services/studies/types';
import { ROLES, COMPANY_SIZES, YEARS_EXPERIENCE } from '@/services/studies/constants';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().optional(),
  company_name: z.string().optional(),
  company_size: z.string().optional(),
  years_experience: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function StudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studyId = params?.id as string;

  const [study, setStudy] = useState<Study | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | 'none';
    message: string;
  }>({ type: 'none', message: '' });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      company_name: '',
      company_size: '',
      years_experience: ''
    }
  });

  // Watch form values for Calendly prefill
  const formData = watch();

  useEffect(() => {
    fetchStudy();
  }, [studyId]);

  const fetchStudy = async () => {
    try {
      const response = await fetch(`/api/studies/${studyId}`);
      if (response.ok) {
        const data = await response.json();
        setStudy(data);
      } else {
        router.push('/studies');
      }
    } catch (error) {
      console.error('Error fetching study:', error);
      router.push('/studies');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: 'none', message: '' });

    try {
      const response = await fetch(`/api/studies/${studyId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        if (study?.calendly_link) {
          // If there's a Calendly link, show scheduling immediately
          setShowCalendly(true);
          setSubmitStatus({
            type: 'success',
            message: 'Great! Now let\'s schedule your session.'
          });
        } else {
          // No Calendly link, just show success
          setSubmitStatus({
            type: 'success',
            message: 'Successfully signed up! We\'ll be in touch soon.'
          });
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: responseData.error || 'Failed to sign up. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0B]">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-gray-400">Loading study...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!study) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/studies')}
            className="text-gray-400 hover:text-white mb-8 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Studies
          </Button>

          {/* Study Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md border-[rgba(255,255,255,0.12)] mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <CardTitle className="text-3xl text-white mb-4">{study.name}</CardTitle>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        <Users className="w-3 h-3 mr-1" />
                        {study.user_type}
                      </Badge>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        <MapPin className="w-3 h-3 mr-1" />
                        {study.location}
                      </Badge>
                      {study.spots_remaining !== null && (
                        <Badge 
                          variant="outline" 
                          className={study.spots_remaining > 0 
                            ? "border-green-500/30 text-green-300" 
                            : "border-red-500/30 text-red-300"
                          }
                        >
                          {study.spots_remaining > 0 
                            ? `${study.spots_remaining} spots left` 
                            : 'Study Full'
                          }
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-300 text-lg whitespace-pre-wrap">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showSignupForm && !showCalendly && (
                  <Button
                    onClick={() => setShowSignupForm(true)}
                    className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    disabled={study.spots_remaining === 0}
                  >
                    {study.spots_remaining === 0 ? 'Study Full' : 'Sign Up for This Study'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Signup Form with Calendly */}
            {showSignupForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md border-[rgba(255,255,255,0.12)]">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      {!showCalendly ? 'Sign Up for Study' : 'Schedule Your Session'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {!showCalendly 
                        ? 'Please provide your information to participate in this study'
                        : 'Please select a time that works best for you'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showCalendly ? (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="first_name" className="text-gray-300 text-sm font-medium">First Name</Label>
                          <Input
                            id="first_name"
                            {...register('first_name')}
                            className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name" className="text-gray-300 text-sm font-medium">Last Name</Label>
                          <Input
                            id="last_name"
                            {...register('last_name')}
                            className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={`bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10 ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-gray-300 text-sm font-medium">Role</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => setValue('role', value)}
                        >
                          <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                            {ROLES.map((role) => (
                              <SelectItem key={role} value={role} className="text-white hover:bg-[rgba(255,255,255,0.1)]">
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_name" className="text-gray-300 text-sm font-medium">Company Name</Label>
                        <Input
                          id="company_name"
                          {...register('company_name')}
                          className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company_size" className="text-gray-300 text-sm font-medium">Company Size</Label>
                          <Select
                            value={formData.company_size}
                            onValueChange={(value) => setValue('company_size', value)}
                          >
                            <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                              {COMPANY_SIZES.map((size) => (
                                <SelectItem key={size} value={size} className="text-white hover:bg-[rgba(255,255,255,0.1)]">
                                  {size} employees
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="years_experience" className="text-gray-300 text-sm font-medium">Years of Experience</Label>
                          <Select
                            value={formData.years_experience}
                            onValueChange={(value) => setValue('years_experience', value)}
                          >
                            <SelectTrigger className="bg-[rgba(30,30,35,0.4)] border-[rgba(255,255,255,0.1)] text-white h-10">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1D] border-[rgba(255,255,255,0.1)]">
                              {YEARS_EXPERIENCE.map((exp) => (
                                <SelectItem key={exp} value={exp} className="text-white hover:bg-[rgba(255,255,255,0.1)]">
                                  {exp} years
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {submitStatus.type !== 'none' && (
                        <div className={`p-4 rounded-lg ${
                          submitStatus.type === 'success' 
                            ? 'bg-green-500/10 border border-green-500/20 text-green-300' 
                            : 'bg-red-500/10 border border-red-500/20 text-red-300'
                        }`}>
                          {submitStatus.message}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowSignupForm(false)}
                          className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {isSubmitting ? 'Submitting...' : 
                            study.calendly_link ? 'Continue to Schedule' : 'Submit Application'
                          }
                        </Button>
                      </div>
                    </form>
                    ) : (
                      // Calendly widget shown in the same card after form submission
                      <div>
                        <div className="rounded-lg overflow-hidden mb-6">
                          <InlineWidget
                            url={`${study.calendly_link}?hide_event_type_details=1&hide_gdpr_banner=1&text_color=ffffff&primary_color=a855f7&background_color=0a0a0b`}
                            styles={{
                              height: '700px',
                              minWidth: '320px',
                            }}
                            prefill={{
                              email: formData.email,
                              firstName: formData.first_name,
                              lastName: formData.last_name,
                              name: `${formData.first_name} ${formData.last_name}`,
                              customAnswers: {
                                a1: formData.company_name,
                                a2: formData.role,
                              }
                            }}
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button
                            onClick={() => {
                              setShowCalendly(false);
                              setSubmitStatus({ type: 'none', message: '' });
                              // Keep form data in case they want to go back
                            }}
                            variant="outline"
                            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                          >
                            Back to Form
                          </Button>
                          <Button
                            onClick={() => router.push('/studies')}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Done - View All Studies
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Remove the separate Calendly Embed section */}
            {false && showCalendly && study.calendly_link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md border-[rgba(255,255,255,0.12)]">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Schedule Your Session</CardTitle>
                    <CardDescription className="text-gray-400">
                      Please select a time that works best for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg overflow-hidden">
                      <InlineWidget
                        url={study.calendly_link}
                        styles={{
                          height: '700px',
                          minWidth: '320px',
                        }}
                        prefill={{
                          email: formData.email,
                          firstName: formData.first_name,
                          lastName: formData.last_name,
                          name: `${formData.first_name} ${formData.last_name}`,
                          customAnswers: {
                            a1: formData.company_name,
                            a2: formData.role,
                          }
                        }}
                      />
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        onClick={() => {
                          setShowCalendly(false);
                          setShowSignupForm(false);
                        }}
                        variant="outline"
                        className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                      >
                        Back to Study
                      </Button>
                      <Button
                        onClick={() => router.push('/studies')}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        View All Studies
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}