"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Group defaults</PopoverTitle>
          <PopoverDescription>
            Primary pages default to sitemap inclusion and indexable
            metadata.
          </PopoverDescription>
        </PopoverHeader>
        <Separator />
        <div className="space-y-2">
          <div>Primary: priority 0.8</div>
          <div>Secondary: priority 0.5</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
