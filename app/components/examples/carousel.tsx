"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselSlides = [
  {
    title: "Card-based patterns",
    description:
      "Reusable shadcn compositions for lists, stats, and empty states.",
  },
  {
    title: "Input-heavy workflows",
    description:
      "Grouped controls, validation wrappers, and selection affordances.",
  },
  {
    title: "Overlay patterns",
    description:
      "Dialog, drawer, sheet, popover, hover card, and tooltip surfaces.",
  },
];

export default function CarouselExample() {
  return (
    <div className="px-12">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselSlides.map((slide) => (
            <CarouselItem key={slide.title}>
              <Card>
                <CardHeader>
                  <CardTitle>{slide.title}</CardTitle>
                  <CardDescription>
                    {slide.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
