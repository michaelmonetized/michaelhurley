"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-[28rem]">
        <SheetHeader>
          <SheetTitle>Inspector</SheetTitle>
          <SheetDescription>
            A side panel for contextual editing.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-3 p-4">
          <Input placeholder="Tag name" />
          <Input placeholder="Priority" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
