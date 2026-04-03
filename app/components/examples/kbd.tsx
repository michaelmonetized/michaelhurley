import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
export default function KbdExample() {
  return (
    <div className="flex flex-wrap items-center gap-3 ">
      <span>Open command menu</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <Separator orientation="vertical" className="h-5" />
      <span>Toggle sidebar</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
