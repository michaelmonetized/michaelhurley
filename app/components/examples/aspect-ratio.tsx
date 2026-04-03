import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden border">
      <Image
        src="https://placecats.com/640/360"
        width={640}
        height={360}
        alt="A cat picture placeholder"
        className="size-full objest-cover aspeect-video"
      />
    </AspectRatio>
  );
}
