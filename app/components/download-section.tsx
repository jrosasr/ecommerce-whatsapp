"use client";
import { Download } from 'lucide-react';
import Image from "next/image";
import { BackgroundNeon } from "./BackgroundNeon";
import Particles from "@/components/ui/particles";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function DownloadSection() {
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
      className="relative py-20 overflow-hidden"
    >
      <BackgroundNeon />
      <div className="relative z-10 mx-auto px-4 container">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#0ea5e9"
        refresh
      />
        <div
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl font-bold text-4xl text-white sm:text-5xl tracking-tighter"
            style={{lineHeight: "1.2"}}
          >
            ¡Descarga la aplicación LunaTv ahora!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-xl text-gray-400 text-lg"
          >
            Disfruta de acceso instantáneo a todas tus películas y programas
            favoritos con nuestra aplicación.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <RainbowButton className="z-20 gap-2 w-full md:w-auto transition ease-in-out hover:scale-105">
              <a href="/download/application/LUNA_TV_IBO17.apk" download className="flex gap-2">
                <Download className="mr-2 w-5 h-5" />
                Descargar APK
              </a>
            </RainbowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative -mt-8 md:-mt-[8rem] lg:-mt-[11rem]"
        >
          <div className="z-10 absolute inset-0" />
          <Image
            src="/assets/mockups/horizontal.png"
            alt="Luna TV Interface"
            width={1200}
            height={720}
            className="opacity-90 rounded-lg w-full md:scale-110 object-cover scale-150"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-transparent backdrop-blur-3xl" />
    </motion.section>
  );
}

