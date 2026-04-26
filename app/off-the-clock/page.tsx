"use client";

import { motion } from "framer-motion";
import { PageShell } from "@/components/michaelhurley/layout-shell";
import { WaveText, MarkIcon } from "@/components/michaelhurley/shared";
import { galleryCards } from "@/components/michaelhurley/data";

export default function OffTheClockPage() {
  return (
    <PageShell>
      <section className="p-xl max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-4x pt-2xl">
          <motion.h1 
            className="text-9xl font-black uppercase leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <WaveText text="Off" /> <WaveText text="The" /> <span className="text-sapphire"><WaveText text="Clock" /></span>
          </motion.h1>
          <motion.p 
            className="text-2xl mt-xl uppercase tracking-[0.5em] opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
          >
            Creative Hall of Fame & Ventures
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2xl">
          {galleryCards.map((card, index) => (
            <motion.div 
              key={card.id} 
              className="group relative overflow-hidden border-4 border-foreground aspect-square bg-muted/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={card.screenshotSrc} 
                alt={card.title}
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-xl flex flex-col justify-end">
                <h3 className="text-3xl font-black uppercase">{card.title}</h3>
                <p className="text-lg opacity-80">{card.subtitle}</p>
                <div className="flex gap-md mt-md">
                  <a href={card.liveUrl} className="text-sm font-bold border-b-2 border-white">LIVE</a>
                  <a href={card.repoUrl} className="text-sm font-bold border-b-2 border-white">CODE</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4x flex justify-center pb-4x">
          <MarkIcon className="h-8x w-auto opacity-10 animate-pulse" />
        </div>
      </section>
    </PageShell>
  );
}
