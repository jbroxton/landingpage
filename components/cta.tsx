'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[linear-gradient(135deg,rgba(36,36,36,1)_0%,var(--bg-secondary)_100%)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,90,240,0.08)_0%,transparent_70%)]"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stay Connected With Us
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Be the first to know when Speqq launches and join our community of early adopters.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button asChild size="lg" className="animate-pulse">
              <Link href="#" onClick={(e) => e.preventDefault()}>Join Waitlist</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="mailto:contact@speqq.com">Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}