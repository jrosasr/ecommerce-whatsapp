"use client";
import { CheckCircle2 } from 'lucide-react';
import { CallToAction } from "./CallToAction";
import { BackgroundNeon } from "./BackgroundNeon";
import Particles from "@/components/ui/particles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function PlanInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-b from-darkblue-700/50 to-blue-900/50 py-16 overflow-hidden"
    >
      <BackgroundNeon customStyles="right" />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#0ea5e9"
        refresh
      />
      <div className="mx-auto px-4 container">
        <div className="bg-neutral-900/80 mx-auto p-8 rounded-xl max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 font-bold text-3xl text-center text-white"
          >
            Planes Luna TV
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8"
          >
            <FeatureItem text="3 pantallas" />
            <FeatureItem text="Soporte 24/7" />
            <FeatureItem text="Sin publicidad" />
            <FeatureItem text="+25,000 películas" />
            <FeatureItem text="+2,500 series" />
            <FeatureItem text="+3,500 canales" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full text-center"
          >
            <div className='mt-8'>
              <CallToAction />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2"
    >
      <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-green-400" />
      <span className="text-lg text-white">{text}</span>
    </motion.div>
  );
}

