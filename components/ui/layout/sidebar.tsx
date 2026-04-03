"use client";

import { useState } from "react";

import {
  Sidebar as SidebarWrapper,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "@/components/link";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export type SectionsType = Array<[string, string, React.ReactNode?]>;

function SectionFilter({ sections }: { sections: SectionsType }) {
  const [filteredSections, setFilteredSections] = useState(sections);
  const handleSectionFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filtered = sections.filter(([label, id]) => {
      return (
        label.toLowerCase().includes(value.toLowerCase()) ||
        id.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredSections(filtered);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>On this page</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="flex items-center gap-2 p-2">
          <SidebarInput
            placeholder="Filter sections"
            onChange={handleSectionFilter}
          />
        </div>
        <nav>
          <SidebarMenu>
            {filteredSections.map(([title, id]) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton asChild isActive={id === sections[0][0]}>
                  <a href={`#${id}`}>{title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SidebarUser() {
  return (
    <Collapsible className="p-0">
      <CollapsibleTrigger asChild className="p-0">
        <Button
          variant="ghost"
          className="flex place-content-stretch place-items-center h-full p-0 gap-2 text-left text-xs font-thin"
          role="tab"
        >
          <Image
            src="https://placecats.com/80/80"
            alt="Cat avatar"
            width={80}
            height={80}
            className="aspect-square h-8 w-auto object-cover border border-border rounded-full"
          />
          <span className="flex flex-col">
            <span className="block w-full">Michael Hurley</span>
            <span className="block w-full text-ellipsis overflow-clip">
              michaelmonetized@gmail.com
            </span>
          </span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <nav>
          <SidebarMenu className="p-0 m-0 indent-0 list-none">
            {[
              ["Profile", "profile"],
              ["Dashboard", "dashboard"],
              ["Billing", "billing"],
              ["Order History", "order-history"],
            ].map(([title, id]) => (
              <SidebarMenuItem key={id}>
                <Link href={`/${id}/`}>{title}</Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar({ sections }: { sections?: SectionsType }) {
  return (
    <SidebarWrapper
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className="h-full min-h-auto max-h-auto bg-sidebar border-sidebar-border pt-12"
    >
      <SidebarContent>
        {sections && (
          <>
            <SectionFilter sections={sections} />
            <SidebarSeparator />
          </>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>About</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav>
              <SidebarMenu>
                {[
                  ["Knowledge Base", "/knowledge-base"],
                  ["Privacy", "/privacy"],
                  ["Terms", "/terms"],
                ].map(([label, href], index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link href={href}>{label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarUser />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </SidebarWrapper>
  );
}
