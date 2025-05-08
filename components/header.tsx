'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Track which section is visible
  useEffect(() => {
    // Set initial active section to home
    setActiveSection('#home');
    
    const handleScroll = () => {
      const sections = ['#home', '#features', '#story', '#contact'];
      
      // Check each section's position
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.querySelector(sections[i]);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        // Use a more reliable way to check if a section is in view
        // This prioritizes sections that are closer to the top
        if (rect.top <= 100) {
          setActiveSection(sections[i]);
          return;
        }
      }
      
      // If no section is detected as active and we're near the top, set home as active
      if (window.scrollY < 100) {
        setActiveSection('#home');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex speqq-nav">
            <NavLink href="#home" isActive={activeSection === '#home' || !activeSection}>Home</NavLink>
            <NavLink href="#features" isActive={activeSection === '#features'}>Features</NavLink>
            <NavLink href="#story" isActive={activeSection === '#story'}>Story</NavLink>
            <NavLink href="#contact" isActive={activeSection === '#contact'}>Contact</NavLink>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <ThemeToggle />
            
            {/* CTA Button */}
            <Button asChild className="hidden md:inline-flex">
              <Link href="#contact">Join Waitlist</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-6 p-4 bg-card rounded-xl border border-border shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-4">
              <NavLink href="#home" mobile isActive={activeSection === '#home' || !activeSection}>Home</NavLink>
              <NavLink href="#features" mobile isActive={activeSection === '#features'}>Features</NavLink>
              <NavLink href="#story" mobile isActive={activeSection === '#story'}>Story</NavLink>
              <NavLink href="#contact" mobile isActive={activeSection === '#contact'}>Contact</NavLink>
              <Button asChild className="w-full mt-2">
                <Link href="#contact">Join Waitlist</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

// Navigation Link component
function NavLink({ 
  href, 
  children, 
  mobile = false,
  isActive = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  mobile?: boolean;
  isActive?: boolean;
}) {
  return (
    <a 
      href={href} 
      className={`${mobile ? 'speqq-mobile-nav-link' : 'speqq-nav-link'} ${isActive ? 'active' : ''}`}
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