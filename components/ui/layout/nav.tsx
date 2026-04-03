import Link from "@/components/link";
import Logo from "@/components/logo";
import { Menu, MenuMobile } from "@/components/ui/layout/menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Nav({
  sticky = false,
  sidebar = false,
}: {
  sticky?: boolean;
  sidebar?: boolean;
}) {
  return (
    <div className={`p-md ${sticky ? "sticky top-0 z-9090" : ""}`}>
      <div className="flex justify-between items-center rounded-xl bg-mantle/60 backdrop-blur border-border border ">
        {sidebar && (
          <div className="pl-md">
            <SidebarTrigger
              className="bg-transparent hover:bg-transparent rounded-md"
              variant="link"
              size="icon"
            />
          </div>
        )}
        <div>
          <Link href="/">
            <Logo className="h-2x w-auto" />
          </Link>
        </div>
        <div className="hidden md:block pr-sm">
          <Menu />
        </div>
        <div className="md:hidden">
          <MenuMobile />
        </div>
      </div>
    </div>
  );
}
