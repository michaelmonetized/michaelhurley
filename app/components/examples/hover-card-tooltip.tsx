"use client";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function HoverCardTooltipExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost">Hover card trigger</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          Hover cards are ideal for profile previews and dense
          contextual info.
        </HoverCardContent>
      </HoverCard>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Tooltip trigger</Button>
        </TooltipTrigger>
        <TooltipContent>
          Save changes
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
