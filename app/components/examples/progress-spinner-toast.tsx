"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
export default function ProgressSpinnerToastExample() {
  return (
    <div className="space-y-4">
      <Progress value={66} />
      <div className="flex items-center gap-3">
        <Spinner />
        <span>Background publish in progress</span>
      </div>
      <Button
        onClick={() =>
          toast.success("Toast sent", {
            description:
              "The local Toaster component styles sonner to match the system.",
          })
        }
      >
        Trigger toast
      </Button>
    </div>
  );
}
