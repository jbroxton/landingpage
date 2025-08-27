'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Study } from '@/services/studies/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ArrowLeft, MapPin, Users } from 'lucide-react';

export default function StudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studyId = params?.id as string;

  const [study, setStudy] = useState<Study | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    fetchStudy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      {study.spots_remaining !== null && study.spots_remaining !== undefined && (
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
                {!showCalendly && study.calendly_link && (
                  <Button
                    onClick={() => setShowCalendly(true)}
                    className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    disabled={study.spots_remaining === 0}
                  >
                    {study.spots_remaining === 0 ? 'Study Full' : 'Sign Up for This Study'}
                  </Button>
                )}
                {!study.calendly_link && (
                  <div className="text-gray-400">
                    No scheduling link available for this study yet. Please check back later.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calendly Widget for Signup */}
            {showCalendly && study.calendly_link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md border-[rgba(255,255,255,0.12)]">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Sign Up & Schedule Your Session</CardTitle>
                    <CardDescription className="text-gray-400">
                      Please fill out the information and select a time that works best for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg overflow-hidden mb-6">
                      <InlineWidget
                        url={`${study.calendly_link}?hide_event_type_details=1&hide_gdpr_banner=1&text_color=ffffff&primary_color=a855f7&background_color=0a0a0b`}
                        styles={{
                          height: '700px',
                          minWidth: '320px',
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowCalendly(false)}
                        variant="outline"
                        className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => router.push('/studies')}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Done - View All Studies
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