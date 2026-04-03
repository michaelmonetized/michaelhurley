"use client";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export default function ToggleExample() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Toggle
          className="text-foreground"
          variant="outline"
          aria-label="Bold"
        >
          Bold
        </Toggle>
        <Toggle
          variant="outline"
          aria-label="Italic"
          className="text-foreground"
        >
          Italic
        </Toggle>
        <Toggle
          variant="outline"
          size="sm"
          aria-label="Small"
          className="text-foreground"
        >
          Sm
        </Toggle>
        <Toggle
          size="lg"
          variant="outline"
          aria-label="Large"
          className="text-foreground"
        >
          Lg
        </Toggle>
      </div>
      <div className="flex flex-wrap gap-2">
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="left" className="text-foreground">
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="center" className="text-foreground">
            Italic
          </ToggleGroupItem>
          <ToggleGroupItem value="right" className="text-foreground">
            Underline
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" className="text-foreground">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" className="text-foreground">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" className="text-foreground">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  );
}
