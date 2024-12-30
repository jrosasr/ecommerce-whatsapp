"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import WhatsApp from "@/components/icons/Whatsapp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ResellerSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Saludos, quiero adquirir cuentas para revender. Me interesa obtener más información sobre este servicio."
    );
    window.open(
      `https://api.whatsapp.com/send?phone=15128459099&text=${message}`,
      "_blank"
    );
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-transparent to-cyan-900 px-4 py-16 text-white"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 font-bold text-4xl"
        >
          ¿Quieres ser Revendedor?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 text-xl"
        >
          Obtén precios especiales y promociones exclusivas en paneles desde 30,
          50, 100 o más créditos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-r from-transparent to-cyan-700 shadow-lg my-8 px-4 py-2 rounded-full text-white transform transition-transform"
        >
          <p className="font-bold text-lg">
            Precios especiales para revendedores
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-10"
        >
          {[30, 50, 100].map((credits, index) => (
            <motion.div
              key={credits}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              className="bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-cyan-500/30 backdrop-blur-sm p-6 rounded-lg transform transition duration-300 ease-in-out hover:scale-105"
            >
              <h3 className="mb-2 font-semibold text-2xl">
                {credits} Créditos
              </h3>
              <ul>
                <li className="flex items-center mb-2">Soporte 24/7</li>
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <RainbowButton
            onClick={openWhatsApp}
            className="px-8 py-3 text-lg transition-all ease-in-out hover:scale-105"
          >
            <WhatsApp className="mr-2 w-6 h-6" />
            Consultar
          </RainbowButton>
        </motion.div>
      </div>
    </motion.section>
  );
}