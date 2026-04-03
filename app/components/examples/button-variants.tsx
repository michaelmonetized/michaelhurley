import { Button } from "@/components/ui/button";
export default function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2 place-items-stretch place-content-between">
      {(
        [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "destructive",
          "outline",
          "ghost",
          "link",
        ] as const
      ).map((variant) => (
        <div
          key={variant}
          className="flex flex-col gap-2 place-items-start place-content-start"
        >
          {(
            [
              "xs",
              "sm",
              "default",
              "lg",
              "icon-xs",
              "icon-sm",
              "icon",
              "icon-lg",
            ] as const
          ).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {size.includes("icon") ? "⛱︎" : `${variant} ${size}`}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
