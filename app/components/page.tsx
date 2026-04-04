import { cn } from "@/lib/utils";
import Layout from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Actions
import ButtonVariantsExample from "./examples/button-variants";
import BadgeVariantsExample from "./examples/badge-variants";
import ButtonGroupsExample from "./examples/button-groups";
import ToggleExample from "./examples/toggle";
import PaginationExample from "./examples/pagination";
import KbdExample from "./examples/kbd";

// Navigation
import BreadcrumbExample from "./examples/breadcrumb";
import NavigationMenuExample from "./examples/navigation-menu";
import MenubarExample from "./examples/menubar";
import DropdownMenuExample from "./examples/dropdown-menu";
import ContextMenuExample from "./examples/context-menu";
import CommandExample from "./examples/command";

// Forms
import FieldExample from "./examples/field";
import InputsExample from "./examples/inputs";
import InputGroupExample from "./examples/input-group";
import SelectionControlsExample from "./examples/selection-controls";
import SelectExample from "./examples/select";
import InputOtpExample from "./examples/input-otp";
import ComboboxExample from "./examples/combobox";
import SliderExample from "./examples/slider";
import CalendarExample from "./examples/calendar";
import DateInputExample from "./examples/date-input";
import TimeInputExample from "./examples/time-input";
import DatetimeInputExample from "./examples/datetime-input";

// Data Display
import CardExample from "./examples/card";
import AlertExample from "./examples/alert";
import AvatarExample from "./examples/avatar";
import ItemExample from "./examples/item";
import AccordionExample from "./examples/accordion";
import CollapsibleExample from "./examples/collapsible";
import TabsExample from "./examples/tabs";
import AspectRatioExample from "./examples/aspect-ratio";
import TableExample from "./examples/table";
import ScrollAreaExample from "./examples/scroll-area";
import ResizableExample from "./examples/resizable";
import EmptySkeletonExample from "./examples/empty-skeleton";

// Overlays
import DialogExample from "./examples/dialog";
import AlertDialogExample from "./examples/alert-dialog";
import DrawerExample from "./examples/drawer";
import SheetExample from "./examples/sheet";
import PopoverExample from "./examples/popover";
import HoverCardTooltipExample from "./examples/hover-card-tooltip";

// Advanced
import ChartExample from "./examples/chart";
import CarouselExample from "./examples/carousel";
import DirectionExample from "./examples/direction";
import ProgressSpinnerToastExample from "./examples/progress-spinner-toast";
import { Sidebar, type SectionsType } from "@/components/ui/layout/sidebar";

function PageSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-black">{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function DemoCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

const sections: SectionsType = [
  ["Actions", "actions"],
  ["Navigation", "navigation"],
  ["Forms", "forms"],
  ["Data Display", "data-display"],
  ["Overlays", "overlays"],
  ["Advanced", "advanced"],
];

export default function ShadcnPage() {
  return (
    <Layout variant="sidebar" className="relative">
      <Sidebar sections={sections} />
      <div className="flex flex-col place-items-stretch place-content-stretch w-full *:p-md *:w-full *:grow">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>shadcn/ui</Badge>
            <Badge variant="secondary">Kitchen Sink</Badge>
            <Badge variant="outline">Radix + Base UI</Badge>
          </div>
          <div className="space-y-2">
            <h1>Completely WCAG Compliant shadcn Kitchen Sink</h1>
            <p>
              A dense reference page for every installed `components/ui/*.tsx`
              primitive in this repo, grouped by how you actually reach for them
              in product work.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Table of Contents</CardTitle>
              <CardDescription>
                Each section uses only the local shadcn components in this
                codebase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <nav>
                <ul>
                  {sections.map(([title, id]) => (
                    <li key={id}>
                      <a href={`#${id}`}>{title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </header>

        <main className="space-y-10" id="main" role="main">
          <PageSection
            id="actions"
            title="Actions"
            description="Buttons, badges, toggles, grouping primitives, and keyboard affordances."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard
                title="Button variants and sizes"
                description="Every button variant and size shipped by the local component."
              >
                <ButtonVariantsExample />
              </DemoCard>

              <DemoCard
                title="Badge variants"
                description="Variant-bearing components should show their full range."
              >
                <BadgeVariantsExample />
              </DemoCard>

              <DemoCard
                title="Button groups"
                description="Horizontal, vertical, text, and grouped separators."
              >
                <ButtonGroupsExample />
              </DemoCard>

              <DemoCard
                title="Toggle and toggle group"
                description="Single-state and grouped toggles with variant coverage."
              >
                <ToggleExample />
              </DemoCard>

              <DemoCard
                title="Pagination"
                description="The full pagination component family."
              >
                <PaginationExample />
              </DemoCard>

              <DemoCard title="Kbd" description="Keyboard hint primitives.">
                <KbdExample />
              </DemoCard>
            </div>
          </PageSection>

          <PageSection
            id="navigation"
            title="Navigation"
            description="Menus, breadcrumbs, command surfaces, and route affordances."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard
                title="Breadcrumb"
                description="Linear pathing with an overflow affordance."
              >
                <BreadcrumbExample />
              </DemoCard>

              <DemoCard
                title="Navigation menu"
                description="Inline navigation with viewport and indicator."
                className="overflow-visible"
              >
                <NavigationMenuExample />
              </DemoCard>

              <DemoCard
                title="Menubar"
                description="Desktop-style command menus."
              >
                <MenubarExample />
              </DemoCard>

              <DemoCard
                title="Dropdown menu"
                description="Contextual actions from a trigger button."
              >
                <DropdownMenuExample />
              </DemoCard>

              <DemoCard
                title="Context menu"
                description="Right-click or long-press the trigger area."
              >
                <ContextMenuExample />
              </DemoCard>

              <DemoCard
                title="Command"
                description="Inline command palette plus the dialog variant."
              >
                <CommandExample />
              </DemoCard>
            </div>
          </PageSection>

          <PageSection
            id="forms"
            title="Forms"
            description="Field composition, native controls, higher-level selectors, and input ergonomics."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard
                title="Field"
                description="The field wrappers are the semantic spine of the form system."
              >
                <FieldExample />
              </DemoCard>

              <DemoCard title="Inputs and textareas">
                <InputsExample />
              </DemoCard>

              <DemoCard title="Input group">
                <InputGroupExample />
              </DemoCard>

              <DemoCard title="Selection controls">
                <SelectionControlsExample />
              </DemoCard>

              <DemoCard title="Select and native select">
                <SelectExample />
              </DemoCard>

              <DemoCard title="Input OTP">
                <InputOtpExample />
              </DemoCard>

              <DemoCard title="Combobox">
                <ComboboxExample />
              </DemoCard>

              <DemoCard title="Slider">
                <SliderExample />
              </DemoCard>

              <DemoCard title="Calendar">
                <CalendarExample />
              </DemoCard>

              <DemoCard title="Date input">
                <DateInputExample />
              </DemoCard>

              <DemoCard title="Time input">
                <TimeInputExample />
              </DemoCard>

              <DemoCard title="Datetime input">
                <DatetimeInputExample />
              </DemoCard>
            </div>
          </PageSection>

          <PageSection
            id="data-display"
            title="Data Display"
            description="Cards, tables, list items, structural layout primitives, and display helpers."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard title="Card">
                <CardExample />
              </DemoCard>

              <DemoCard title="Alert variants">
                <AlertExample />
              </DemoCard>

              <DemoCard title="Avatar">
                <AvatarExample />
              </DemoCard>

              <DemoCard title="Item">
                <ItemExample />
              </DemoCard>

              <DemoCard title="Accordion and collapsible">
                <AccordionExample />
                <CollapsibleExample />
              </DemoCard>

              <DemoCard title="Tabs">
                <TabsExample />
              </DemoCard>

              <DemoCard title="Aspect ratio">
                <AspectRatioExample />
              </DemoCard>

              <DemoCard title="Table">
                <TableExample />
              </DemoCard>

              <DemoCard title="Scroll area and separator">
                <ScrollAreaExample />
              </DemoCard>

              <DemoCard title="Resizable">
                <ResizableExample />
              </DemoCard>

              <DemoCard title="Empty and skeleton">
                <EmptySkeletonExample />
              </DemoCard>
            </div>
          </PageSection>

          <PageSection
            id="overlays"
            title="Overlays"
            description="Modal, transient, and contextual surfaces."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard title="Dialog">
                <DialogExample />
              </DemoCard>

              <DemoCard title="Alert dialog">
                <AlertDialogExample />
              </DemoCard>

              <DemoCard title="Drawer">
                <DrawerExample />
              </DemoCard>

              <DemoCard title="Sheet">
                <SheetExample />
              </DemoCard>

              <DemoCard title="Popover">
                <PopoverExample />
              </DemoCard>

              <DemoCard title="Hover card and tooltip">
                <HoverCardTooltipExample />
              </DemoCard>
            </div>
          </PageSection>

          <PageSection
            id="advanced"
            title="Advanced"
            description="State-heavy and con components."
          >
            <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
              <DemoCard title="Chart">
                <ChartExample />
              </DemoCard>

              <DemoCard title="Carousel">
                <CarouselExample />
              </DemoCard>

              <DemoCard title="Direction provider">
                <DirectionExample />
              </DemoCard>

              <DemoCard title="Progress, spinner, and toast">
                <ProgressSpinnerToastExample />
              </DemoCard>
            </div>
          </PageSection>
        </main>
      </div>
    </Layout>
  );
}
