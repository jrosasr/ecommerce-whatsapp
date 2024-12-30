import Image from "next/image";
import Link from "next/link";

import { Divider } from "@nextui-org/react";
import { PostersMarquee } from "./components/PostersMarquee";
import { HeroVideoPresentation } from "./components/HeroVideoPresentation";
import { BackgroundNeon } from "./components/BackgroundNeon/BackgroundNeon";
import Particles from "@/components/ui/particles";
import { DownloadSection } from "./components/download-section";
import { HeroSection } from "./components/hero-section";
import { Footer } from "./components/footer";
import { FaqSection } from "./components/Faq";
import { PlanInfo } from "./components/plan-info";
import { Separator } from "@radix-ui/react-separator";
import { ResellerSection } from "./components/reseller-section";

const HomePage = async () => {
  return (
    <div className="relative bg-neutral-950 mx-auto max-w-[1600px] overflow-hidden dark">
      <BackgroundNeon />
      {/* Section Header */}
      <div className="flex justify-start mx-8">
        <Link href="/" className="z-10">
          <Image
            src="/assets/lunatv/alt-iso.png"
            alt="logo"
            width={60}
            height={60}
            className="mt-8"
            priority
          />
        </Link>
      </div>
      {/* Section Hero */}
      <HeroSection />

      <Separator className="my-16" />

      {/* Section Posters */}
      <PostersMarquee />

      <Separator className="my-16" />

      {/* Plan Info Section */}
      <PlanInfo />

      <Separator className="my-16" />

      {/* Section Hero Video */}
      {/* <div>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#0ea5e9"
          refresh
        />
        <h2 className="mt-24 font-bold text-2xl text-balance text-center text-white md:text-4xl">
          Conoce todo lo que{" "}
          <span className="font-bold uppercase">Luna TV</span> tiene para
          ofrecerte
        </h2>
        <div className="mx-auto my-20 w-[80%] md:w-[60%]">
          <HeroVideoPresentation />
        </div>
      </div> */}

      <Separator className="my-16" />

      {/* Section Download */}
      <DownloadSection />

      {/* <Separator className="my-16" /> */}

      {/* Reseller Section */}
      <ResellerSection />

      <Separator className="my-16" />

      {/* FAQ Section */}
      <FaqSection />

      {/* <Separator className="my-16" /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default HomePage;