import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
export default function EmptySkeletonExample() {
  return (
    <div className="space-y-4">
      <Empty className="border min-w-full *:min-w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">✦</EmptyMedia>
          <EmptyTitle>No components filtered out</EmptyTitle>
          <EmptyDescription>
            Empty states should still explain what the user can do next.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create example</Button>
        </EmptyContent>
      </Empty>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
