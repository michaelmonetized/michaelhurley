"use client";

import { motion } from "framer-motion";
import { PageShell } from "@/components/michaelhurley/layout-shell";
import { WaveText } from "@/components/michaelhurley/shared";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <PageShell>
      <section className="p-xl max-w-4xl mx-auto min-h-[80svh] flex flex-col justify-center">
        <div className="flex flex-col items-center text-center mb-2xl">
          <motion.h1 
            className="text-8xl font-black uppercase mb-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <WaveText text="Calendar" />
          </motion.h1>
          <motion.p 
            className="text-xl opacity-60 uppercase tracking-widest italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
          >
            Availability & Logistics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4x items-center">
          <motion.div 
            className="flex justify-center border-8 border-foreground p-xl rounded-3xl bg-background shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CalendarUI
              mode="single"
              className="rounded-md border-0"
            />
          </motion.div>

          <div className="space-y-xl">
            <motion.div 
              className="border-l-8 border-primary p-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-3xl font-black uppercase mb-sm">Current Status</h2>
              <p className="text-xl font-bold text-primary">Accepting Select Projects</p>
              <p className="mt-md opacity-70">Focusing on high-performance web applications and strategic growth operations.</p>
            </motion.div>

            <motion.div 
              className="border-l-8 border-foreground p-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="text-3xl font-black uppercase mb-sm">Timezone</h2>
              <p className="text-xl font-bold">Eastern Standard Time (EST)</p>
              <p className="mt-md opacity-70">Based in the North Carolina Highlands.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
