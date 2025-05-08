'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full py-6 z-50 transition-all duration-300 bg-[rgba(18,18,18,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] shadow-md">
      <div className="container">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="relative group" onClick={(e) => {
            e.preventDefault();
            const homeSection = document.getElementById('home');
            homeSection?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            <span className="speqq-logo inline-block">Speqq</span>
            <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-primary rounded-sm transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] opacity-80 group-hover:scale-x-100"></span>
          </a>
          
          {/* Empty middle space */}
          <div className="flex-grow"></div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* CTA Button - visible on all screen sizes but smaller on mobile */}
            <Button asChild className="inline-flex text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2">
              <Link href="#contact">Join Waitlist</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="mt-6 p-4 bg-[rgba(25,25,30,0.85)] backdrop-blur-md rounded-xl border border-[rgba(255,255,255,0.1)] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-4">
              <MobileNavLink href="#home">Home</MobileNavLink>
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#story">Story</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

// Mobile Navigation Link component
function MobileNavLink({ 
  href, 
  children
}: { 
  href: string; 
  children: React.ReactNode;
}) {
  return (
    <a 
      href={href} 
      className="text-white hover:text-[rgba(127,90,240,1)] py-2 px-3 rounded-md transition-colors duration-300 font-medium text-sm hover:bg-[rgba(255,255,255,0.05)]"
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }}
    >
      {children}
    </a>
  );
}