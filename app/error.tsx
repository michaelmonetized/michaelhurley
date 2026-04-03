"use client";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>Reset</Button>
    </div>
  );
}
