"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
export default function CollapsibleExample() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle extra notes</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3  ">
        Collapsible is a lower-level disclosure primitive than
        Accordion and works well for inline details.
      </CollapsibleContent>
    </Collapsible>
  );
}
