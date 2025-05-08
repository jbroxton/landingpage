'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { History, Target, Compass, Users } from "lucide-react";

export default function StorySection() {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingRef = useRef(null);
  
  const storyContent = `Speqq began with a simple idea: to create a tool that empowers individuals to be more productive without sacrificing their well-being. We saw too many professionals burning out while using tools designed to extract maximum output rather than support sustainable productivity.

We're building Speqq to help people work smarter, not harder. Our core belief is that technology should adapt to humans, not the other way around. Every feature we develop is guided by this philosophy.

Currently, Speqq is in active development, with our team working around the clock to create something truly special. We're not just building another productivity app – we're creating a new approach to how work gets done.

While we're not ready for launch just yet, we're excited to connect with like-minded individuals who share our vision. Stay connected with us to be the first to know when Speqq is ready for you to experience.`;

  useEffect(() => {
    const typingSpeed = 20; // ms per character
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout | undefined;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentIndex < storyContent.length) {
          setTypedText(storyContent.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, typingSpeed);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (typingRef.current) {
      observer.observe(typingRef.current);
    }

    return () => {
      clearInterval(typingInterval);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [storyContent]);

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.5, 0, 0.2, 1],
      }
    }
  };

  return (
    <section id="story" className="py-24 relative overflow-hidden bg-[linear-gradient(135deg,rgba(26,26,30,0.95)_0%,rgba(18,18,20,1)_100%)]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(67,97,238,0.08)_0%,transparent_60%),radial-gradient(circle_at_70%_70%,rgba(127,90,240,0.08)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_0%,transparent_100%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.1)] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.1)] to-transparent"></div>
      <div className="features-section-noise"></div>
      <div className="features-section-glow"></div>
      
      {/* Paper-like overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] backdrop-blur-sm opacity-[0.03] rounded-[50%] bg-white"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Our Story</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The journey behind Speqq and where we&apos;re headed.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative overflow-hidden p-8 md:p-10 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            ref={typingRef}
          >
            {/* Icons column */}
            <div className="hidden md:flex absolute left-8 top-10 bottom-10 flex-col justify-between items-center z-10">
              <motion.div
                className="feature-icon w-12 h-12 mb-0"
                variants={iconVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
              >
                <History size={28} className="text-white" />
              </motion.div>
              
              <motion.div
                className="feature-icon w-12 h-12 mb-0"
                variants={iconVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
              >
                <Target size={28} className="text-white" />
              </motion.div>
              
              <motion.div
                className="feature-icon w-12 h-12 mb-0"
                variants={iconVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                transition={{ delay: 0.6 }}
              >
                <Compass size={28} className="text-white" />
              </motion.div>
              
              <motion.div
                className="feature-icon w-12 h-12 mb-0"
                variants={iconVariants}
                initial="hidden"
                animate={isTypingComplete ? "visible" : "hidden"}
                transition={{ delay: 0.8 }}
              >
                <Users size={28} className="text-white" />
              </motion.div>
            </div>
            
            {/* Connecting line */}
            <motion.div 
              className="hidden md:block absolute left-[68px] top-[88px] w-px bottom-10 bg-gradient-to-b from-[rgba(127,90,240,0.2)] via-[rgba(67,97,238,0.2)] to-[rgba(127,90,240,0.2)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isTypingComplete ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ transformOrigin: "top" }}
            />
            
            {/* Story content */}
            <div className="md:pl-16 relative">
              <p className="text-lg leading-relaxed whitespace-pre-line relative text-white text-shadow-sm">
                {typedText}
                {!isTypingComplete && (
                  <span className="typing-cursor inline-block"></span>
                )}
              </p>
              
              <motion.div 
                className="mt-8 text-right text-sm text-white opacity-80 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTypingComplete ? 0.8 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                — The Speqq Team
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}