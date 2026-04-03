import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
export default function AlertExample() {
  return (
    <div className="space-y-3">
      <Alert>
        <AlertTitle>Default alert</AlertTitle>
        <AlertDescription>
          General-purpose helper copy and contextual messaging.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            Action
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive alert</AlertTitle>
        <AlertDescription>
          Use for irreversible actions or broken states.
        </AlertDescription>
      </Alert>
    </div>
  );
}
