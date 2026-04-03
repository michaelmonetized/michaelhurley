import { NarrowContainer } from "@/components/ui/layout/containers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hustle Launch",
  description:
    "How Hustle Launch collects, uses, shares, and processes your information.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 9, 2026";

  return (
    <NarrowContainer className="py-lg prose prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {lastUpdated}</p>

      {/* WARNING CALLOUT */}
      <div className="not-prose my-lg p-md border-2 border-red-500 bg-red-500/20 rounded-lg">
        <div className="flex items-center gap-sm mb-sm">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-xl font-bold text-red-400 m-0">
            USE AT YOUR OWN RISK
          </h2>
        </div>
        <p className="text-red-200 font-medium mb-sm">
          This software is provided{" "}
          <strong>&quot;AS IS&quot; with NO WARRANTY</strong> of any kind.
        </p>
        <ul className="text-red-200 text-sm space-y-1 list-disc list-inside">
          <li>
            <strong>All content you generate</strong> is shared with our
            affiliates and partners
          </li>
          <li>
            <strong>All information you submit</strong> is shared with third
            parties
          </li>
          <li>
            <strong>All data</strong> is used to train AI models across all
            subscription tiers
          </li>
          <li>
            <strong>No opt-out</strong> is available for data sharing or AI
            training
          </li>
        </ul>
        <p className="text-red-300 text-sm mt-sm mb-0">
          By using this service, you accept these terms unconditionally.
        </p>
      </div>

      <section>
        <h2>1. Summary</h2>
        <p className="text-lg border-l-4 border-primary pl-4 bg-muted/30 py-2">
          <strong>
            By using Hustle Launch, you acknowledge and agree that:
          </strong>{" "}
          We partner with third-party service providers. We share your data,
          content, and information with our partners and affiliates. We train
          artificial intelligence models on all content generated across all
          accounts on all subscription plans, including free tiers. Your use of
          this service constitutes consent to these practices.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect all information you provide or generate through the
          Service, including but not limited to:
        </p>
        <ul>
          <li>Account and authentication information</li>
          <li>Company and business information</li>
          <li>All content generated through the platform</li>
          <li>All prompts, inputs, and interactions with AI features</li>
          <li>Usage data, analytics, and behavioral information</li>
          <li>Device information, IP addresses, and location data</li>
          <li>Communications with our support team</li>
          <li>Payment and billing information</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use your information for any purpose, including:</p>
        <ul>
          <li>Providing and operating the Service</li>
          <li>Training and improving AI models</li>
          <li>Research and development</li>
          <li>Marketing and promotional purposes</li>
          <li>Analytics and performance monitoring</li>
          <li>Any other lawful business purpose</li>
        </ul>
      </section>

      <section>
        <h2>4. AI Model Training</h2>
        <p>
          <strong>
            All content generated through Hustle Launch is used to train AI
            models.
          </strong>
          This includes:
        </p>
        <ul>
          <li>All campaigns, posts, articles, and emails generated</li>
          <li>All images created through the platform</li>
          <li>All prompts and inputs provided to AI features</li>
          <li>All business information and company data</li>
          <li>All user interactions and feedback</li>
        </ul>
        <p>
          This applies to all accounts regardless of subscription tier (free,
          paid, or enterprise). There is no opt-out for AI training. By using
          the Service, you grant us a perpetual, irrevocable, worldwide,
          royalty-free license to use all content for AI training purposes.
        </p>
      </section>

      <section>
        <h2>5. Data Sharing with Partners and Affiliates</h2>
        <p>
          <strong>
            We share your information with third-party partners and affiliates.
          </strong>
          This includes but is not limited to:
        </p>
        <ul>
          <li>AI service providers and model developers</li>
          <li>Cloud infrastructure and hosting providers</li>
          <li>Analytics and marketing platforms</li>
          <li>Business partners and affiliates</li>
          <li>Advertising networks</li>
          <li>Data brokers and aggregators</li>
          <li>Research institutions</li>
          <li>Any entity we deem necessary for business operations</li>
        </ul>
        <p>
          We do not limit how our partners may use shared data. Partners operate
          under their own privacy policies and terms of service.
        </p>
      </section>

      <section>
        <h2>6. Third-Party Service Providers</h2>
        <p>We utilize the following third-party services:</p>
        <ul>
          <li>
            <a
              href="https://clerk.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clerk
            </a>{" "}
            - Authentication
          </li>
          <li>
            <a
              href="https://vercel.com/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>{" "}
            - Hosting
          </li>
          <li>
            <a
              href="https://www.cloudflare.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare
            </a>{" "}
            - CDN and Security
          </li>
          <li>
            <a
              href="https://convex.dev/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Convex
            </a>{" "}
            - Database
          </li>
          <li>
            <a
              href="https://resend.com/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </a>{" "}
            - Email
          </li>
          <li>
            <a
              href="https://openrouter.ai/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenRouter
            </a>{" "}
            - AI Models
          </li>
          <li>
            <a
              href="https://pollinations.ai/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pollinations AI
            </a>{" "}
            - Image Generation
          </li>
          <li>
            <a
              href="https://posthog.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              PostHog
            </a>{" "}
            - Analytics
          </li>
        </ul>
        <p>
          Your data is subject to the terms and privacy policies of these
          providers.
        </p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>
          We retain your data indefinitely. Data used for AI training is
          retained permanently and cannot be deleted from trained models.
          Account deletion removes your access but does not remove data already
          shared with partners or incorporated into AI models.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>
          You may request access to your account data by contacting us. Due to
          the nature of AI training and data sharing with partners, we cannot
          guarantee complete deletion of all data. Some data rights may be
          limited by our legitimate business interests.
        </p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>
          The Service is not intended for users under 18. We do not knowingly
          collect information from children.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy at any time without notice. Continued use of
          the Service constitutes acceptance of any changes.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          For privacy inquiries:{" "}
          <a href="mailto:privacy@hustlelaunch.com">privacy@hustlelaunch.com</a>
        </p>
      </section>

      <div className="mt-xl pt-lg border-t border-border">
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </NarrowContainer>
  );
}
