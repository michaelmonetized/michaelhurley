import BackToTop from "@/components/accessibility/back-to-top";
import Indicator from "@/components/accessibility/indicator";

export default function Accessibility({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main
      </a>

      {children}

      <Indicator />

      <BackToTop />
    </>
  );
}
