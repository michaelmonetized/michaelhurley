"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DirectionProvider } from "@/components/ui/direction";
export default function DirectionExample() {
  return (
    <DirectionProvider dir="rtl">
      <div className="space-y-3 border p-3" dir="rtl">
        <div>
          RTL-aware primitives should flip spacing and directional
          icons without a second implementation.
        </div>
        <ButtonGroup>
          <Button variant="outline">السابق</Button>
          <Button>التالي</Button>
        </ButtonGroup>
      </div>
    </DirectionProvider>
  );
}
