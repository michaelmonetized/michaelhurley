"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function ResizableExample() {
  return (
    <div className="w-full aspect-video border">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="62%">
          <div className="flex h-full items-center justify-center  ">
            Navigator
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="38%">
          <div className="flex h-full items-center justify-center ">Editor</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
