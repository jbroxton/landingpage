'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router = null 
}: {
  // Define a minimal router interface with common methods
  router?: {
    push?: (url: string, options?: object) => Promise<boolean>;
    replace?: (url: string, options?: object) => Promise<boolean>;
    back?: () => void;
    forward?: () => void;
    prefetch?: (url: string) => Promise<void>;
    pathname?: string;
    query?: Record<string, string | string[]>;
  } | null
}) {
  // Router is available for programmatic navigation if needed in the future
  // For parallax effect in hero section
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // No sticky tagline effects needed anymore
  
  // Story content with proper paragraph formatting
  const storyContent = {
    paragraph1: "Speqq is built to be the tool I wished Product Managers had—one that works seamlessly within the existing ecosystem of tools and people while adding the structure, traceability, and alignment the role demands. Essentially, Speqq was born from my first-hand frustration as a Product Manager.",
    paragraph2: "During my time in Product at Google, I experienced firsthand how the lack of specialized tooling led to constant misalignment, lost documentation, and painful manual processes. While engineers had GitHub and Jira, and designers had Figma to improve their efficiency, PMs were left cobbling together workflows with generic tools never built for our unique needs. Requirements lived in scattered docs, alignment happened through fragmented channels, and PMs spent countless hours searching for historical context for product changes.",
    paragraph3: "My mission is to help product teams work smarter by creating a single source of truth where requirements, approvals, and tasks connect effortlessly. Speqq doesn't force PMs to abandon their favorite tools or adopt rigid processes. Instead, it enhances familiar workflows with AI assistance, giving back hours previously lost to administrative overhead. We believe technology should adapt to how product teams actually work—not the other way around.",
    paragraph4: "Speqq doesn't force PMs to abandon their favorite tools or adopt rigid processes. Instead, it enhances familiar workflows with AI assistance, giving back hours previously lost to administrative overhead. We believe technology should adapt to how product teams actually work—not the other way around."
  };
  
  const features = [
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M6.9 9c-.16-.6-.44-1.16-.82-1.65A5.97 5.97 0 0 1 13 4a5.98 5.98 0 0 1 5.83 4.5 5.96 5.96 0 0 1 1.77 10.57A5.98 5.98 0 0 1 15 22a5.39 5.39 0 0 1-1.82-.31 5.96 5.96 0 0 1-7.08-3.27 6 6 0 0 1 .8-9.42Z"/><path d="m12 8-2 4h4l-2 4"/></svg>
      </div>,
      title: "Speqq AI",
      description: "Our intelligent AI assistant optimizes your workflows, analyzes requirements, and generates product insights automatically."
    },
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
        </svg>
      </div>,
      title: "Smart Integrations",
      description: "Seamlessly sync with Google Docs for PRDs and Jira for requirements, eliminating the constant tool-switching that disrupts your workflow."
    },
    {
      icon: <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
      </div>,
      title: "Requirements",
      description: "Organize and prioritize your product requirements with powerful tools designed specifically for product managers."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Header />
      
      {/* Hero Section - Full screen with parallax */}
      <section 
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-32"
      >
        {/* Parallax background layers */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(67,97,238,0.08)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(127,90,240,0.08)_0%,transparent_60%)]"
          style={{ y: heroY, opacity: heroOpacity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,15,17,0.95)_0%,rgba(10,10,11,1)_100%)]"></div>
        <div className="absolute inset-0 features-section-noise"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            {/* Top Text - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-center mb-16 max-w-3xl"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight whitespace-nowrap text-white">
                Where <span className="speqq-gradient-text">Product Managers</span> Work
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 mx-auto">
                Speqq brings your roadmaps, tasks, and team collaboration into a single, streamlined platform that adapts to how you work.
              </p>
              <Button asChild size="lg" className="animate-pulse mb-14">
                <Link href="#contact">Join Our Waitlist</Link>
              </Button>
              
              {/* Feature icons in a row - moved from features section */}
              <motion.div
                className="flex flex-nowrap overflow-x-auto justify-center gap-2 xs:gap-3 md:gap-5 max-w-4xl mx-auto mb-0 -mt-10 relative pb-2 px-1 feature-icons-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                
                {/* Speqq AI */}
                <div className="flex flex-col items-center text-center hover:bg-white/5 rounded-lg p-2 transition-all duration-300 group cursor-pointer flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(35,35,40,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-1 shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2),0_0_4px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(127,90,240,0.4)] group-hover:bg-[rgba(40,40,50,0.35)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.95)] drop-shadow-[0_0_3px_rgba(127,90,240,0.5)]">
                      <path d="M6.9 9c-.16-.6-.44-1.16-.82-1.65A5.97 5.97 0 0 1 13 4a5.98 5.98 0 0 1 5.83 4.5 5.96 5.96 0 0 1 1.77 10.57A5.98 5.98 0 0 1 15 22a5.39 5.39 0 0 1-1.82-.31 5.96 5.96 0 0 1-7.08-3.27 6 6 0 0 1 .8-9.42Z"/>
                      <path d="m12 8-2 4h4l-2 4"/>
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(127,90,240,0.8)] whitespace-nowrap">Speqq AI</p>
                </div>
                
                {/* Integrations */}
                <div className="flex flex-col items-center text-center hover:bg-white/5 rounded-lg p-2 transition-all duration-300 group cursor-pointer flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(35,35,40,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-1 shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2),0_0_4px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(127,90,240,0.4)] group-hover:bg-[rgba(40,40,50,0.35)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.95)] drop-shadow-[0_0_3px_rgba(127,90,240,0.5)]">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(127,90,240,0.8)] whitespace-nowrap">Integrations</p>
                </div>
                
                {/* Requirements */}
                <div className="flex flex-col items-center text-center hover:bg-white/5 rounded-lg p-2 transition-all duration-300 group cursor-pointer flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(35,35,40,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-1 shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2),0_0_4px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(127,90,240,0.4)] group-hover:bg-[rgba(40,40,50,0.35)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.95)] drop-shadow-[0_0_3px_rgba(127,90,240,0.5)]">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <path d="M14 2v6h6"/>
                      <path d="M16 13H8"/>
                      <path d="M16 17H8"/>
                      <path d="M10 9H8"/>
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(127,90,240,0.8)] whitespace-nowrap">Requirements</p>
                </div>
                
                {/* Roadmaps */}
                <div className="flex flex-col items-center text-center hover:bg-white/5 rounded-lg p-2 transition-all duration-300 group cursor-pointer flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(35,35,40,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-1 shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2),0_0_4px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(127,90,240,0.4)] group-hover:bg-[rgba(40,40,50,0.35)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.95)] drop-shadow-[0_0_3px_rgba(127,90,240,0.5)]">
                      <path d="M3 7h4"/>
                      <path d="M7 7v13"/>
                      <path d="M20 7h-9"/>
                      <path d="M11 7v5"/>
                      <path d="M11 12h4"/>
                      <path d="M15 12v8"/>
                      <path d="M15 20h5"/>
                      <path d="M20 20v-8"/>
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(127,90,240,0.8)] whitespace-nowrap">Roadmaps</p>
                </div>
                
                {/* Goals */}
                <div className="flex flex-col items-center text-center hover:bg-white/5 rounded-lg p-2 transition-all duration-300 group cursor-pointer flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[rgba(35,35,40,0.25)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] flex items-center justify-center mb-1 shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2),0_0_4px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(127,90,240,0.4)] group-hover:bg-[rgba(40,40,50,0.35)] relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.95)] drop-shadow-[0_0_3px_rgba(127,90,240,0.5)]">
                      <path d="M2 12h20"/>
                      <path d="M10 2v20"/>
                      <path d="m17 7-2.5 2.5"/>
                      <path d="m16 17-2 2"/>
                      <path d="M7 7.5 4.5 10"/>
                      <path d="m4.5 15 2.5 2.5"/>
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_3px_rgba(127,90,240,0.8)] whitespace-nowrap">Goals</p>
                </div>
              </motion.div>
              
            </motion.div>
            
            {/* Bottom visual - Full width */}
            <motion.div
              className="w-full max-w-4xl mx-auto -mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="w-full h-[380px] relative bg-[rgba(20,20,25,0.4)] rounded-2xl backdrop-blur-md border border-[rgba(255,255,255,0.1)] overflow-hidden shadow-2xl">
                {/* App preview mockup */}
                <div className="h-[50px] bg-[rgba(30,30,35,0.9)] border-b border-[rgba(255,255,255,0.1)] flex items-center px-5">
                  <div className="w-3 h-3 bg-[#ff5f57] rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-[#febc2e] rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-[#28c840] rounded-full"></div>
                </div>
                
                <div className="p-6">
                  {/* UI elements */}
                  <div className="w-[60%] h-[30px] bg-[rgba(255,255,255,0.1)] rounded-md mb-4"></div>
                  
                  <div className="flex mb-4 gap-4">
                    <div className="flex-1 h-[90px] bg-[rgba(127,90,240,0.2)] rounded-xl p-[15px]">
                      <div className="w-[60%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-[10px]"></div>
                      <div className="w-[40%] h-[30px] bg-[rgba(255,255,255,0.3)] rounded-md"></div>
                    </div>
                    <div className="flex-1 h-[90px] bg-[rgba(67,97,238,0.2)] rounded-xl p-[15px]">
                      <div className="w-[60%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-[10px]"></div>
                      <div className="w-[40%] h-[30px] bg-[rgba(255,255,255,0.3)] rounded-md"></div>
                    </div>
                  </div>
                  
                  <div className="w-full h-[120px] bg-[rgba(40,40,45,0.6)] rounded-xl p-[15px] relative">
                    <div className="w-[70%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-4"></div>
                    
                    <div className="flex items-end h-[60px] gap-[15px] pl-[10px]">
                      <div className="w-5 h-[40%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                      <div className="w-5 h-[65%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                      <div className="w-5 h-[30%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                      <div className="w-5 h-[80%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                      <div className="w-5 h-[45%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                      <div className="w-5 h-[60%] bg-gradient-to-t from-[rgba(127,90,240,1)] to-[rgba(67,97,238,1)] rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Simple Read More Arrow */}
        <div 
          className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => {
            // Get the correct features section with the headline and header height
            const featuresSection = document.getElementById('features-section');
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            
            if (featuresSection) {
              // Calculate position accounting for header height
              const featuresSectionPosition = featuresSection.getBoundingClientRect().top + window.scrollY;
              
              // Scroll to position minus header height so it appears just below header
              window.scrollTo({
                top: featuresSectionPosition - headerHeight,
                behavior: 'smooth'
              });
            }
          }}
        >
          <span className="text-gray-300 text-sm">Learn More</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>
      
      {/* Combined features section with integrated tagline */}
      <section className="bg-[#0A0A0B] py-16 md:py-24" id="features-section">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Tagline - clean with no background */}
            <div className="mb-0 pb-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mx-auto text-shadow-lg max-w-3xl mx-auto mb-2">
                A platform to turn <span className="speqq-gradient-text">ideas into launches</span> faster is coming
              </h2>
              
              <p className="text-white text-lg max-w-2xl mx-auto pb-0 mb-0">
                Built specifically for product teams, Speqq brings essential product management tools into a single, streamlined platform.
              </p>
            </div>
            </motion.div>
          </div>
        </section>
      
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.15)] to-transparent"></div>
      
      {/* Features Section - Alternating layout */}
      <section id="features" className="pt-2 pb-12 relative bg-[#0A0A0B]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_0%,transparent_100%)]"></div>
        <div className="features-section-noise"></div>
        <div className="features-section-glow"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.1)] to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Main title and subtitle are in the hero section */}
          
          {/* Feature 1 */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature card - icon at top, title below, content under title */}
            <div className="max-w-4xl mx-auto">
              <div className="pt-2 pb-4 px-4 md:px-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(127,90,240,0.03)_0%,transparent_70%)]"></div>
                
                {/* Icon at top */}
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(127,90,240,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M6.9 9c-.16-.6-.44-1.16-.82-1.65A5.97 5.97 0 0 1 13 4a5.98 5.98 0 0 1 5.83 4.5 5.96 5.96 0 0 1 1.77 10.57A5.98 5.98 0 0 1 15 22a5.39 5.39 0 0 1-1.82-.31 5.96 5.96 0 0 1-7.08-3.27 6 6 0 0 1 .8-9.42Z"/><path d="m12 8-2 4h4l-2 4"/></svg>
                  </div>
                </div>
                
                {/* Title below icon */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 speqq-gradient-text">{features[0].title}</h3>
                
                {/* Content below title */}
                <div className="text-center max-w-2xl mx-auto relative z-10">
                  {/* Drop cap style statistic with text wrapping */}
                  <div className="relative mb-6 text-left max-w-2xl mx-auto">
                    <div className="float-left text-6xl md:text-8xl font-bold leading-none pr-3 mr-2 mt-0 mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-500">
                      73%
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      of product managers report AI as their <span className="text-white font-medium">top productivity need</span>. Speqq AI uses advanced learning algorithms to adapt to your workflow and automate routine tasks, enabling you to focus on strategic decisions.
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature card - icon at top, title below, content under title */}
            <div className="max-w-4xl mx-auto">
              <div className="pt-2 pb-4 px-4 md:px-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(127,90,240,0.03)_0%,transparent_70%)]"></div>
                
                {/* Icon at top */}
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(127,90,240,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title below icon */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 speqq-gradient-text">{features[1].title}</h3>
                
                {/* Content below title */}
                <div className="text-center max-w-2xl mx-auto relative z-10">
                  {/* Drop cap style statistic with text wrapping */}
                  <div className="relative mb-6 text-left max-w-2xl mx-auto">
                    <div className="float-left text-6xl md:text-8xl font-bold leading-none pr-3 mr-2 mt-0 mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-500">
                      9%
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      of total work time is lost to <span className="text-white font-medium">switching between apps</span>. Seamlessly sync your PRDs from Google Docs and tasks from Jira, eliminating the need to constantly toggle between tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature card - icon at top, title below, content under title */}
            <div className="max-w-4xl mx-auto">
              <div className="pt-2 pb-4 px-4 md:px-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(127,90,240,0.03)_0%,transparent_70%)]"></div>
                
                {/* Icon at top */}
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(127,90,240,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <path d="M14 2v6h6"/>
                      <path d="M16 13H8"/>
                      <path d="M16 17H8"/>
                      <path d="M10 9H8"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title below icon */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 speqq-gradient-text">{features[2].title}</h3>
                
                {/* Content below title */}
                <div className="text-center max-w-2xl mx-auto relative z-10">
                  {/* Drop cap style statistic with text wrapping */}
                  <div className="relative mb-6 text-left max-w-2xl mx-auto">
                    <div className="float-left text-6xl md:text-8xl font-bold leading-none pr-3 mr-2 mt-0 mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-500">
                      70%
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      of projects suffer from <span className="text-white font-medium">scope creep</span>. Our structured requirements management helps product managers prevent feature bloat while keeping stakeholders aligned on the product vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 4 - Goals */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature card - icon at top, title below, content under title */}
            <div className="max-w-4xl mx-auto">
              <div className="pt-2 pb-4 px-4 md:px-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(127,90,240,0.03)_0%,transparent_70%)]"></div>
                
                {/* Icon at top */}
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(127,90,240,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M2 12h20"/>
                      <path d="M10 2v20"/>
                      <path d="m17 7-2.5 2.5"/>
                      <path d="m16 17-2 2"/>
                      <path d="M7 7.5 4.5 10"/>
                      <path d="m4.5 15 2.5 2.5"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title below icon */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 speqq-gradient-text">Goals</h3>
                
                {/* Content below title */}
                <div className="text-center max-w-2xl mx-auto relative z-10">
                  {/* Drop cap style statistic with text wrapping */}
                  <div className="relative mb-6 text-left max-w-2xl mx-auto">
                    <div className="float-left text-6xl md:text-8xl font-bold leading-none pr-3 mr-2 mt-0 mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-500">
                      4.6x
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">more effective and productive</span> are teams that use structured frameworks like OKRs. Speqq&apos;s automated goal tracking keeps your team focused on the metrics that matter and notifies you when targets are hit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Feature 5 - Roadmaps */}
          <motion.div 
            className=""
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Feature card - icon at top, title below, content under title */}
            <div className="max-w-4xl mx-auto">
              <div className="pt-2 pb-4 px-4 md:px-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(127,90,240,0.03)_0%,transparent_70%)]"></div>
                
                {/* Icon at top */}
                <div className="relative z-10 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(127,90,240,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M3 7h4"/>
                      <path d="M7 7v13"/>
                      <path d="M20 7h-9"/>
                      <path d="M11 7v5"/>
                      <path d="M11 12h4"/>
                      <path d="M15 12v8"/>
                      <path d="M15 20h5"/>
                      <path d="M20 20v-8"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title below icon */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10 speqq-gradient-text">Roadmaps</h3>
                
                {/* Content below title */}
                <div className="text-center max-w-2xl mx-auto relative z-10">
                  {/* Drop cap style statistic with text wrapping */}
                  <div className="relative mb-6 text-left max-w-2xl mx-auto">
                    <div className="float-left text-6xl md:text-8xl font-bold leading-none pr-3 mr-2 mt-0 mb-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-500">
                      52%
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      of product managers&apos; time is spent on <span className="text-white font-medium">unplanned firefighting</span> activities. Speqq&apos;s visual roadmapping helps teams stay aligned on priorities while adapting to changing market needs without losing strategic focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.15)] to-transparent"></div>
      
      {/* Story Section - Full width with typing effect */}
      <section id="story" className="py-12 relative bg-[#0A0A0B]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(67,97,238,0.05)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(127,90,240,0.05)_0%,transparent_60%)]"></div>
        <div className="features-section-noise"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.1)] to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-0 tracking-tight">The Story of Speqq</h2>
          </motion.div>
          
          {/* Left-aligned content */}
          <div className="max-w-3xl mx-auto">
            <div className="py-8 px-10 md:px-14 relative">              
              <div className="space-y-6 text-lg text-left leading-relaxed relative">
                <p className="font-medium text-white">{storyContent.paragraph1}</p>
                <p className="text-[rgba(255,255,255,0.95)]">{storyContent.paragraph2}</p>
                <p className="text-[rgba(255,255,255,0.95)]"><span className="text-white font-medium">My mission is to help product teams work smarter</span> by creating a single source of truth where requirements, approvals, and tasks connect effortlessly.</p>
                <p className="text-[rgba(255,255,255,0.95)]"><span className="text-white font-medium">Speqq doesn&apos;t force PMs to abandon their favorite tools or adopt rigid processes.</span> Instead, it enhances familiar workflows with AI assistance, giving back hours previously lost to administrative overhead. We believe technology should adapt to how product teams actually work—not the other way around.</p>
              </div>
              
              <motion.div 
                className="mt-8 flex flex-col items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Avatar at the end */}
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-[0_0_20px_rgba(127,90,240,0.3)] mb-4 border-2 border-purple-500 relative">
                  <Image 
                    src="/avatar.png" 
                    alt="Justin, Founder of Speqq" 
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 80px, 80px"
                    priority
                  />
                </div>
                <p className="text-base text-white opacity-80 italic">
                  — Justin, Founder of Speqq
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(127,90,240,0.05)_0%,transparent_70%)] z-0"></div>
          <div className="hidden md:block absolute top-20 left-10 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(67,97,238,0.05)_0%,transparent_70%)] z-0"></div>
        </div>
      </section>
      
      {/* Section divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.15)] to-transparent"></div>
      
      {/* CTA Section - Full width */}
      <section id="contact" className="py-12 relative bg-[#0A0A0B]">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,90,240,0.08)_0%,transparent_70%)]"></div>
        <div className="features-section-noise"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.1)] to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Join the Waitlist
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Be first in line when we launch Speqq—the future of product management.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-[rgba(20,20,25,0.25)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.12)] p-8 md:p-10 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-center">
                {/* Left side content */}
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
                  <p className="text-gray-300 mb-6">
                    Get exclusive updates on our progress and be the first to experience Speqq when we launch.
                  </p>
                  <div className="hidden md:block">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-[rgba(127,90,240,0.2)] rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-7.5"/><path d="M14 15h-4"/><path d="M17 15h-2"/><path d="M14 11h-4"/><path d="M17 11h-2"/><path d="M14 7H2"/></svg>
                      </div>
                      <p className="text-sm text-gray-300">Stay up to date with launch details</p>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-[rgba(127,90,240,0.2)] rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                      </div>
                      <p className="text-sm text-gray-300">Product insights from our team</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[rgba(127,90,240,0.2)] rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                      </div>
                      <p className="text-sm text-gray-300">Early access invites</p>
                    </div>
                  </div>
                </div>
                
                {/* Right side form */}
                <div>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 bg-[rgba(30,30,35,0.4)] text-white placeholder:text-gray-400 border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Role</label>
                      <select 
                        id="role" 
                        defaultValue=""
                        className="w-full px-4 py-3 bg-[rgba(30,30,35,0.4)] text-white border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="product_manager">Product Manager</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full py-6 text-lg font-semibold animate-pulse">Join Waitlist</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}