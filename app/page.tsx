import Layout from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/marketing/hero";
import HeroSlider from "@/components/marketing/hero-slider";
import LogoCarousel from "@/components/marketing/logo-carousel";
import ProductGrid from "@/components/marketing/product-grid";
import PricingTable from "@/components/marketing/pricing-table";
import CtaSection from "@/components/marketing/cta-section";
import ServiceGrid from "@/components/marketing/service-grid";
import LiveChat from "@/components/marketing/live-chat";

export default function Home() {
  return (
    <Layout variant="default">
      <Hero variant="centered" />

      <section className="px-md py-lg">
        <LogoCarousel />
      </section>

      <Separator />

      <section className="px-md py-lg space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black">Everything you need to launch</h2>
          <p className="text-muted-foreground">
            From idea to revenue — the tools founders actually use.
          </p>
        </div>
        <ProductGrid />
      </section>

      <Separator />

      <section className="px-md py-lg space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black">Services</h2>
          <p className="text-muted-foreground">
            Hands-on help when you need it most.
          </p>
        </div>
        <ServiceGrid />
      </section>

      <Separator />

      <section className="px-md py-lg">
        <HeroSlider />
      </section>

      <Separator />

      <section className="px-md py-lg space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">
            Start free, upgrade when you&apos;re ready.
          </p>
        </div>
        <PricingTable />
      </section>

      <Separator />

      <section className="px-md py-lg">
        <CtaSection />
      </section>

      <section className="px-md py-lg">
        <Hero variant="minimal" />
      </section>

      <LiveChat />
    </Layout>
  );
}
