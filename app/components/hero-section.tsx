"use client";
import Particles from "@/components/ui/particles";
import Image from "next/image";
import { CallToAction } from "./CallToAction";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative -mt-12 px-8 rounded-xl w-auto h-auto"
    >
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#0ea5e9"
        refresh
      />
      {/* <BorderBeam borderWidth={3} /> */}
      <div
        className="flex flex-col flex-1 justify-center items-center px-4 py-20 w-full text-center"
      >
        <motion.a
          href=""
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="border-white-700 dark:border-gray-500 mb-5 px-4 py-2 border rounded-lg text-gray-400 text-sm transition duration-300 ease-in-out"
        >
          Todo el contenido en un solo lugar
        </motion.a>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto max-w-4xl font-bold font-display text-3xl text-white md:text-7xl tracking-normal"
        >
          Descubre tu próxima <br />
          <span className="relative text-white-600 dark:text-gray-300 whitespace-nowrap">
            serie favorita en
          </span>
          <br />
          <span className="relative text-orange-500 dark:text-orange-300 whitespace-nowrap">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Image
                src="/assets/lunatv/alt-logo-1.png"
                alt="logo"
                width={250}
                height={250}
                className="mx-auto my-12"
                style={{ width: 'auto', height: 'auto' }}
              />
            </motion.div>
          </span>
        </motion.h1>
        {/* <h2 className="mx-auto mt-12 max-w-xl text-gray-100 text-lg leading-7">
            No te pierdas los últimos éxitos de taquilla y los clásicos
            atemporales en cualquier momento.
          </h2> */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center mt-4 w-full"
        >
          <CallToAction />
        </motion.div>
      </div>
    </motion.div>
  );
}

