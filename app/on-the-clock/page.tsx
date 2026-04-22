"use client";

import { motion } from "framer-motion";
import { PageShell } from "@/components/michaelhurley/layout-shell";
import { WaveText, MarkIcon } from "@/components/michaelhurley/shared";
import { skillGroups, developmentGroups } from "@/components/michaelhurley/data";

export default function OnTheClockPage() {
  return (
    <PageShell>
      <section className="p-xl max-w-7xl mx-auto min-h-svh flex flex-col justify-center">
        <div className="flex flex-col md:flex-row gap-4x items-start">
          <motion.div 
            className="w-full md:w-1/3 sticky top-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-9xl font-black uppercase leading-none">
              <WaveText text="On" />
              <br />
              <WaveText text="The" />
              <br />
              <span className="text-primary"><WaveText text="Clock" /></span>
            </h1>
            <p className="text-2xl mt-xl uppercase tracking-widest italic opacity-70">
              Professional Career & Performance
            </p>
            <div className="mt-2xl">
              <MarkIcon className="h-4x w-auto opacity-20" />
            </div>
          </motion.div>
          
          <div className="w-full md:w-2/3 space-y-4x">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
              {skillGroups.map((group, index) => (
                <motion.div 
                  key={group.title} 
                  className="border-t-4 border-foreground pt-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-black uppercase mb-lg">{group.title}</h2>
                  <ul className="space-y-sm text-xl opacity-80">
                    {group.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="border-t-4 border-primary pt-xl bg-primary/5 p-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black uppercase mb-xl">Senior Engineering</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                {developmentGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-2xl font-bold uppercase mb-sm opacity-60">{group.title}</h3>
                    <ul className="space-y-xs text-lg italic">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
