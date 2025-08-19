'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Study } from '@/services/studies/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Clock, MapPin, Users } from 'lucide-react';

export default function StudiesPage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await fetch('/api/studies');
      if (response.ok) {
        const data = await response.json();
        setStudies(data);
      }
    } catch (error) {
      console.error('Error fetching studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Participate in <span className="speqq-gradient-text">User Studies</span>
            </h1>
            <p className="text-xl text-gray-300">
              Help shape the future of product management tools by participating in our research studies.
              Share your insights and get early access to new features.
            </p>
          </motion.div>

          {/* Studies Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400">Loading studies...</div>
            </div>
          ) : studies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.12)] p-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-4">No Studies Available</h2>
                <p className="text-gray-400 mb-8">
                  We don't have any active studies at the moment. Check back soon or join our waitlist to be notified when new studies are available.
                </p>
                <Button
                  onClick={() => router.push('/#contact')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Join Waitlist
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md border-[rgba(255,255,255,0.12)] hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl text-white">{study.name}</CardTitle>
                        {study.spots_remaining !== null && study.spots_remaining === 0 && (
                          <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">
                            Full
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {study.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-300">
                          <Users className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{study.user_type}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{study.location}</span>
                        </div>
                        {study.spots_remaining !== null && study.spots_remaining > 0 && (
                          <div className="flex items-center text-sm text-gray-300">
                            <Clock className="w-4 h-4 mr-2 text-purple-400" />
                            <span>{study.spots_remaining} spots remaining</span>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => router.push(`/studies/${study.id}`)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={study.spots_remaining === 0}
                      >
                        {study.spots_remaining === 0 ? 'Study Full' : 'View Details'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}