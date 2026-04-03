import Image from "next/image";
export default function Logo({
  width = 1347,
  height = 473,
  className,
}: {
  width?: number;
  height?: number;
  className?: React.HTMLAttributes<HTMLImageElement>["className"];
}) {
  return (
    <Image
      src="/logo.svg"
      alt="Hustle Launch"
      width={width}
      height={height}
      className={className}
    />
  );
}
