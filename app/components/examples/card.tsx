import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function CardExample() {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>Quarterly launch plan</CardTitle>
        <CardDescription>
          A nested card example using the whole card family.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Draft</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          Consolidate homepage messaging, package pricing into
          clearer tiers, and tighten form completion.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Review checklist</Button>
      </CardFooter>
    </Card>
  );
}
