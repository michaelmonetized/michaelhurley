"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
export default function CommandExample() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setCommandOpen(true)}>
          Open Command Dialog
        </Button>
        <CommandDialog
          open={commandOpen}
          onOpenChange={setCommandOpen}
          title="Jump to a surface"
          description="Search the component gallery"
          className="min-w-fit"
        >
          <CommandInput placeholder="Type a component or pattern" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Surfaces">
              <CommandItem>Dialog</CommandItem>
              <CommandItem>Sheet</CommandItem>
              <CommandItem>Drawer</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <Command>
        <CommandInput placeholder="Filter components" />
        <CommandList>
          <CommandEmpty>No matching components.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              Menubar
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Breadcrumb
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Overlays">
            <CommandItem>Popover</CommandItem>
            <CommandItem>Tooltip</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
