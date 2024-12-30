"use client";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { BackgroundNeon } from "../BackgroundNeon/BackgroundNeon";

export function HeroVideoPresentation() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundNeon />
      <div>
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
      </div>
      <div>
        <HeroVideoDialog
          className="dark:block hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}
