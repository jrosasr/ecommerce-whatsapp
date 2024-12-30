import Link from "next/link"
import Image from "next/image"
import { Car, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import WhatsApp from "@/components/icons/Whatsapp"

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto px-4 container">
        <div className="flex md:flex-row flex-col justify-between items-center gap-8">
          <div className="font-bold text-2xl">
            <Image
              src="/assets/lunatv/alt-logo-1.png"
              alt="logo"
              width={200}
              height={200}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          
          {/* <nav className="flex gap-8">
            <Link href="/sobre-nosotros" className="hover:text-purple-400 transition-colors">
              Sobre nosotros
            </Link>
            <Link href="/contactanos" className="hover:text-purple-400 transition-colors">
              Contáctanos
            </Link>
          </nav> */}
          
          <div className="flex gap-6">
            <Link href="https://api.whatsapp.com/send?phone=15128459099" target="_blank" className="hover:text-purple-400 transition-colors">
              <WhatsApp fill="#fff" className="w-10 h-10" />
              <span className="sr-only">Whatsapp</span>
            </Link>
            {/* <Link href="#" className="hover:text-purple-400 transition-colors">
              <Car className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              <Car className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              <Car className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </Link> */}
          </div>
        </div>
        
        <div className="flex md:flex-row flex-col justify-between items-center border-white/10 mt-8 pt-8 border-t text-gray-400 text-sm">
          <div>
            © 2024 LunaTV. All rights reserved.
          </div>
          {/* <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">
              política de privacidad
            </Link>
            <Link href="/terms-of-service" className="hover:text-blue-500 transition-colors">
              Términos de servicio
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

