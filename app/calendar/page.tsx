import { PageShell } from "@/components/michaelhurley/layout-shell";
import { WaveText } from "@/components/michaelhurley/shared";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <PageShell>
      <section className="p-xl max-w-4xl mx-auto min-h-[80svh] flex flex-col justify-center">
        <div className="flex flex-col items-center text-center mb-2xl">
          <h1 className="text-8xl font-black uppercase mb-md">
            <WaveText text="Calendar" />
          </h1>
          <p className="text-xl opacity-60 uppercase tracking-widest italic">
            Availability & Logistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4x items-center">
          <div className="flex justify-center border-8 border-foreground p-xl rounded-3xl bg-background shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
            <CalendarUI
              mode="single"
              className="rounded-md border-0"
            />
          </div>

          <div className="space-y-xl">
            <div className="border-l-8 border-primary p-xl">
              <h2 className="text-3xl font-black uppercase mb-sm">Current Status</h2>
              <p className="text-xl font-bold text-primary">Accepting Select Projects</p>
              <p className="mt-md opacity-70">Focusing on high-performance web applications and strategic growth operations.</p>
            </div>

            <div className="border-l-8 border-foreground p-xl">
              <h2 className="text-3xl font-black uppercase mb-sm">Timezone</h2>
              <p className="text-xl font-bold">Eastern Standard Time (EST)</p>
              <p className="mt-md opacity-70">Based in the North Carolina Highlands.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
