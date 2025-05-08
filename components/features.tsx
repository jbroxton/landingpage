'use client';

// Card components removed as they're not being used
import { motion } from "framer-motion";
import { Clock, Layers, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Clock size={30} className="text-white" />,
      title: "Time-Saving Automation",
      description: "Automate repetitive tasks and workflows to save hours every week with powerful, customizable rules.",
    },
    {
      icon: <Layers size={30} className="text-white" />,
      title: "Smart Integrations",
      description: "Connect seamlessly with your favorite tools and services to create a unified workspace experience.",
    },
    {
      icon: <BarChart3 size={30} className="text-white" />,
      title: "Advanced Analytics",
      description: "Gain powerful insights into your productivity patterns with beautiful, intuitive data visualizations.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.5, 0, 0, 1],
      }
    },
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[linear-gradient(135deg,rgba(26,26,30,0.95)_0%,rgba(18,18,20,1)_100%)]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(127,90,240,0.08)_0%,transparent_70%),radial-gradient(circle_at_80%_80%,rgba(67,97,238,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_0%,transparent_100%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(127,90,240,0.1)] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.1)] to-transparent"></div>
      <div className="features-section-noise"></div>
      <div className="features-section-glow"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">What&apos;s Coming</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Speqq is being built with these powerful features to revolutionize your workflow.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}