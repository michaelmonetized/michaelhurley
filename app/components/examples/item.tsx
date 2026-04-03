import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
export default function ItemExample() {
  return (
    <ItemGroup>
      <Item variant="outline">
        <ItemMedia variant="image">
          <Image
            src="https://placecats.com/96/96"
            width={96}
            height={96}
            alt="A cat picture placeholder"
          />
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>Case study card</ItemTitle>
            <Badge variant="outline">Featured</Badge>
          </ItemHeader>
          <ItemDescription>
            Local list-item primitive for dense, multi-zone rows.
          </ItemDescription>
          <ItemFooter>
            <span>Updated today</span>
            <ItemActions>
              <Button size="xs" variant="ghost">
                Open
              </Button>
            </ItemActions>
          </ItemFooter>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="muted" size="xs">
        <ItemMedia variant="icon">•</ItemMedia>
        <ItemContent>
          <ItemTitle>Compact item</ItemTitle>
          <ItemDescription>
            Uses the `xs` sizing mode for tighter surfaces.
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
