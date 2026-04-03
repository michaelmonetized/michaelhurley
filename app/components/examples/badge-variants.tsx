import { Badge } from "@/components/ui/badge";
export default function BadgeVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
        ] as const
      ).map((variant) => (
        <Badge
          key={variant}
          variant={variant}
          className="text-base"
        >
          {variant}
        </Badge>
      ))}
    </div>
  );
}
