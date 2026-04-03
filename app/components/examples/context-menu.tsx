"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
export default function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="border-dashed">
          <CardContent className="p-6  ">
            Right-click this surface
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Layer actions</ContextMenuLabel>
        <ContextMenuGroup>
          <ContextMenuItem>
            Bring forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Send backward
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Align</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Left</ContextMenuItem>
            <ContextMenuItem>Center</ContextMenuItem>
            <ContextMenuItem>Right</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Snap to grid
        </ContextMenuCheckboxItem>
        <ContextMenuRadioGroup value="desktop">
          <ContextMenuRadioItem value="desktop">
            Desktop
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="mobile">
            Mobile
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
