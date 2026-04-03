"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
export default function ScrollAreaExample() {
  return (
    <div className="space-y-3">
      <ScrollArea className="h-32 w-full border">
        <div className="space-y-2 p-3 ">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index}>
              Message {index + 1}: dense content should still feel
              navigable in constrained panels.
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <Separator orientation="vertical" className="h-8" />
    </div>
  );
}
