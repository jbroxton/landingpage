'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  // Parallax effect for background
  React.useEffect(() => {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxBg) {
        (parallaxBg as HTMLElement).style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background elements */}
      <div className="parallax-bg"></div>
      <div className="bg-gradient gradient-1"></div>
      <div className="bg-gradient gradient-2"></div>
      <div className="pattern-bg"></div>
      
      <div className="container relative z-10 flex flex-col md:flex-row items-center">
        {/* Content */}
        <motion.div 
          className="w-full md:w-1/2 z-10 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight relative inline-block">
            The Future of <br />Workflow Is Coming
            <span className="absolute bottom-[-10px] left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-sm"></span>
          </h1>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-[500px] mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Speqq is building a productivity platform designed to work with you, not against you. We&apos;re reimagining how work gets done in the digital age.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <Button asChild size="lg" className="animate-pulse">
              <Link href="#contact">Join Our Waitlist</Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* App Preview */}
        <motion.div 
          className="w-full md:w-1/2 transform md:translate-x-[5%] hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          <div className="w-[600px] h-[400px] bg-gradient-to-br from-[rgba(40,40,45,0.8)] to-[rgba(25,25,30,0.9)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden relative mt-[-180px]">
            {/* Mock UI elements */}
            <div className="h-[50px] bg-[rgba(30,30,35,0.9)] border-b border-border flex items-center px-5">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-[#febc2e] rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-[#28c840] rounded-full"></div>
            </div>
            
            {/* Sidebar */}
            <div className="absolute top-[50px] left-0 w-[70px] h-[calc(100%-50px)] bg-[rgba(20,20,25,0.6)] border-r border-border flex flex-col items-center pt-5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-[10px] mb-5"></div>
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-[10px] mb-5"></div>
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-[10px] mb-5"></div>
              <div className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-[10px]"></div>
            </div>
            
            {/* Content area */}
            <div className="absolute top-[50px] left-[70px] w-[calc(100%-70px)] h-[calc(100%-50px)] p-5">
              {/* Header */}
              <div className="w-[60%] h-[30px] bg-[rgba(255,255,255,0.1)] rounded-md mb-5"></div>
              
              {/* Cards */}
              <div className="flex mb-5">
                <div className="flex-1 h-[100px] bg-[rgba(127,90,240,0.2)] rounded-[10px] mr-[15px] p-[15px]">
                  <div className="w-[60%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-[10px]"></div>
                  <div className="w-[40%] h-[30px] bg-[rgba(255,255,255,0.3)] rounded-md"></div>
                </div>
                <div className="flex-1 h-[100px] bg-[rgba(67,97,238,0.2)] rounded-[10px] p-[15px]">
                  <div className="w-[60%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-[10px]"></div>
                  <div className="w-[40%] h-[30px] bg-[rgba(255,255,255,0.3)] rounded-md"></div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="w-full h-[150px] bg-[rgba(40,40,45,0.6)] rounded-[10px] p-[15px] relative">
                <div className="w-[70%] h-3 bg-[rgba(255,255,255,0.2)] rounded-sm mb-5"></div>
                
                {/* Chart bars */}
                <div className="flex items-end h-[80px] gap-[15px] pl-[10px]">
                  <div className="w-5 h-[40%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                  <div className="w-5 h-[65%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                  <div className="w-5 h-[30%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                  <div className="w-5 h-[80%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                  <div className="w-5 h-[45%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                  <div className="w-5 h-[60%] bg-gradient-to-t from-primary to-secondary rounded-t-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-[30px] h-[50px] border-2 border-[rgba(255,255,255,0.3)] rounded-[25px] flex justify-center pt-[10px] z-10">
        <div className="w-[6px] h-[6px] rounded-full bg-primary animate-bounce"></div>
      </div>
    </section>
  );
}