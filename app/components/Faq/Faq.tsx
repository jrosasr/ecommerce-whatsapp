"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Particles from "@/components/ui/particles";
import { faqs } from "./Faq.data";
import { BackgroundNeon } from "../BackgroundNeon";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function FaqSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative bg-neutral-950 py-20 overflow-hidden"
    >
      <div className="mx-auto px-4 container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 font-bold text-4xl text-center text-white"
        >
          Preguntas Frecuentes
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
              >
                <AccordionItem value={faq.question}>
                  <AccordionTrigger className="bg-neutral-900/50 px-4 rounded-lg text-white hover:text-blue-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 text-gray-400">
                    {faq.answer} <br />{" "}
                    {faq.link && (
                      <Link
                        href={faq.link}
                        target="_blank"
                        className="z-20 text-blue-500"
                      >
                        Más información
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
      <BackgroundNeon customStyles="right" />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#0ea5e9"
        refresh
      />
    </motion.section>
  );
}

