"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function AccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="faq-1" className="border-b-border">
        <AccordionTrigger className="decoration-transparent bg-transparent border-border border text-foreground p-md h-auto">
          What makes shadcn different from a package library?
        </AccordionTrigger>
        <AccordionContent className="p-md border-border border">
          <p className="p-md">
            You own the source, so the repo can tailor every primitive instead
            of fighting a dependency boundary.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger className="decoration-transparent bg-transparent border-border border text-foreground p-md h-auto">
          Why keep this many primitives in one gallery?
        </AccordionTrigger>
        <AccordionContent className="p-md border-border border">
          <p className="p-md">
            It forces the system to stay honest when components are added or
            mutated over time.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
