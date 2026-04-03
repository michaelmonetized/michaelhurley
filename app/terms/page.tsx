import { NarrowContainer } from "@/components/ui/layout/containers";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Hustle Launch",
  description: "Terms and conditions for using the Hustle Launch platform.",
};

export default function TermsPage() {
  const lastUpdated = "January 9, 2026";

  return (
    <NarrowContainer className="py-lg prose prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {lastUpdated}</p>

      {/* WARNING CALLOUT */}
      <div className="not-prose my-lg p-md border-2 border-red-500 bg-red-500/20 rounded-lg">
        <div className="flex items-center gap-sm mb-sm">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-xl font-bold text-red-400 m-0">
            NO WARRANTY • NO GUARANTEE • ZERO LIABILITY
          </h2>
        </div>
        <p className="text-red-200 font-medium mb-sm">
          This software is provided <strong>&quot;AS IS&quot;</strong> without
          any warranty or guarantee of any kind.
        </p>
        <ul className="text-red-200 text-sm space-y-1 list-disc list-inside">
          <li>
            <strong>Zero liability</strong> — We are not responsible for any
            damages, losses, or issues
          </li>
          <li>
            <strong>No guarantees</strong> — Service availability, accuracy, or
            fitness for purpose is not guaranteed
          </li>
          <li>
            <strong>We own everything</strong> — All content generated belongs
            to us; you receive a revocable license
          </li>
          <li>
            <strong>Termination at will</strong> — We may terminate your access
            at any time, for any reason
          </li>
        </ul>
        <p className="text-red-300 text-sm mt-sm mb-0">
          By using this service, you accept full responsibility for all risks.
        </p>
      </div>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          BY ACCESSING, BROWSING, OR USING HUSTLE LAUNCH (&quot;THE
          SERVICE&quot;), YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND
          AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO
          ALL OF THESE TERMS, YOU ARE NOT AUTHORIZED TO USE THE SERVICE.
        </p>
        <p>
          Your continued use of the Service constitutes ongoing acceptance of
          these Terms and any modifications thereto.
        </p>
      </section>

      <section>
        <h2>2. Grant of License</h2>
        <p>
          Subject to your compliance with these Terms, Hustle Launch grants you
          a limited, non-exclusive, non-transferable, revocable license to
          access and use the Service for your internal business purposes. This
          license does not include:
        </p>
        <ul>
          <li>Any ownership rights in the Service or its content</li>
          <li>The right to modify, adapt, or create derivative works</li>
          <li>The right to sublicense, sell, or redistribute the Service</li>
          <li>Any guarantee of continued access or availability</li>
        </ul>
      </section>

      <section>
        <h2>3. Ownership of Content and Intellectual Property</h2>
        <p className="text-lg border-l-4 border-primary pl-4 bg-muted/30 py-2">
          <strong>
            All content created through Hustle Launch is owned by Hustle Launch.
          </strong>
        </p>
        <p>
          By using the Service, you grant Hustle Launch a perpetual,
          irrevocable, worldwide, royalty-free, fully sublicensable license to
          use, reproduce, modify, adapt, publish, translate, create derivative
          works from, distribute, perform, and display:
        </p>
        <ul>
          <li>All content generated through the platform</li>
          <li>All inputs, prompts, and data you provide</li>
          <li>All company information and business data</li>
          <li>All feedback, suggestions, and communications</li>
        </ul>
        <p>
          You are granted a license to use content generated for your account,
          subject to these Terms and our continued authorization. This license
          may be revoked at any time at our sole discretion.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose</li>
          <li>
            Generate content that is illegal, harmful, threatening, abusive,
            harassing, defamatory, vulgar, obscene, or otherwise objectionable
          </li>
          <li>Infringe upon intellectual property rights of any party</li>
          <li>Transmit malware, viruses, or malicious code</li>
          <li>Attempt to gain unauthorized access to systems or accounts</li>
          <li>Interfere with the proper functioning of the Service</li>
          <li>Circumvent any access controls or usage limits</li>
          <li>Reverse engineer, decompile, or disassemble the Service</li>
          <li>Use the Service to compete with Hustle Launch</li>
          <li>Scrape, harvest, or collect data from the Service</li>
          <li>Resell, sublicense, or redistribute access to the Service</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>
      </section>

      <section>
        <h2>5. Termination and Suspension</h2>
        <p>
          <strong>
            Hustle Launch reserves the right to terminate or suspend your access
            to the Service at any time, for any reason, without notice.
          </strong>{" "}
          Reasons for termination may include, but are not limited to:
        </p>
        <ul>
          <li>Violation of any provision of these Terms</li>
          <li>Suspected fraudulent, abusive, or illegal activity</li>
          <li>Non-payment of applicable fees</li>
          <li>Requests by law enforcement or government agencies</li>
          <li>Discontinuation or modification of the Service</li>
          <li>Technical or security issues</li>
          <li>Any other reason at our sole discretion</li>
        </ul>
        <p>
          Upon termination, your license to use the Service immediately ceases.
          You will not be entitled to any refund of fees paid. We may delete
          your account and all associated data without liability.
        </p>
      </section>

      <section>
        <h2>6. DMCA and Intellectual Property Enforcement</h2>
        <p>
          Hustle Launch respects intellectual property rights and expects users
          to do the same. We reserve the right to:
        </p>
        <ul>
          <li>
            Issue DMCA takedown notices for content that infringes our rights
          </li>
          <li>Remove or disable access to infringing content</li>
          <li>Terminate accounts of repeat infringers</li>
          <li>
            Pursue legal action for unauthorized use of our intellectual
            property
          </li>
        </ul>
        <p>
          If you use content generated through the Service in violation of these
          Terms, you may be subject to DMCA claims and legal action.
        </p>
      </section>

      <section>
        <h2>7. No Security Guarantees</h2>
        <p>
          <strong>
            Hustle Launch does not provide any security guarantees beyond the
            basic protections offered by our third-party service providers.
          </strong>{" "}
          We rely on:
        </p>
        <ul>
          <li>
            <a
              href="https://clerk.com/security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clerk
            </a>{" "}
            - Authentication security
          </li>
          <li>
            <a
              href="https://vercel.com/security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>{" "}
            - Hosting and infrastructure security
          </li>
          <li>
            <a
              href="https://www.cloudflare.com/trust-hub/security/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare
            </a>{" "}
            - Network and DDoS protection
          </li>
          <li>
            <a
              href="https://convex.dev/security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Convex
            </a>{" "}
            - Database security
          </li>
          <li>
            <a
              href="https://resend.com/security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </a>{" "}
            - Email security
          </li>
        </ul>
        <p>
          You acknowledge that no system is completely secure. We are not
          responsible for any unauthorized access, data breaches, or security
          incidents. You use the Service at your own risk.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
          WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
          BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>
        <p>HUSTLE LAUNCH DOES NOT WARRANT THAT:</p>
        <ul>
          <li>THE SERVICE WILL MEET YOUR REQUIREMENTS</li>
          <li>
            THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
          </li>
          <li>
            THE RESULTS OBTAINED FROM THE SERVICE WILL BE ACCURATE OR RELIABLE
          </li>
          <li>ANY ERRORS IN THE SERVICE WILL BE CORRECTED</li>
          <li>AI-GENERATED CONTENT WILL BE SUITABLE FOR ANY PURPOSE</li>
        </ul>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
          HUSTLE LAUNCH, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR
          AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT
          LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER
          INTANGIBLE LOSSES, REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE
          OR WHETHER HUSTLE LAUNCH WAS ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES.
        </p>
        <p>
          IN NO EVENT SHALL HUSTLE LAUNCH&apos;S TOTAL LIABILITY TO YOU FOR ALL
          CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE EXCEED ONE HUNDRED
          DOLLARS ($100.00) OR THE AMOUNT YOU PAID TO HUSTLE LAUNCH IN THE
          THIRTY (30) DAYS IMMEDIATELY PRECEDING THE CLAIM, WHICHEVER IS LESS.
        </p>
      </section>

      <section>
        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Hustle Launch and
          its officers, directors, employees, agents, and affiliates from and
          against any and all claims, damages, obligations, losses, liabilities,
          costs, and expenses (including attorney&apos;s fees) arising from:
        </p>
        <ul>
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Any content you submit or generate through the Service</li>
          <li>Your negligent or wrongful conduct</li>
        </ul>
      </section>

      <section>
        <h2>11. Modifications to Terms</h2>
        <p>
          Hustle Launch reserves the right to modify these Terms at any time
          without prior notice. Changes become effective immediately upon
          posting to the Service. Your continued use of the Service after any
          modifications constitutes acceptance of the updated Terms. It is your
          responsibility to review these Terms periodically.
        </p>
      </section>

      <section>
        <h2>12. Modifications to Service</h2>
        <p>
          Hustle Launch reserves the right to modify, suspend, or discontinue
          the Service (or any part thereof) at any time, with or without notice.
          We shall not be liable to you or any third party for any modification,
          suspension, or discontinuation of the Service.
        </p>
      </section>

      <section>
        <h2>13. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the State of North Carolina, United States, without regard to
          its conflict of law provisions.
        </p>
        <p>
          <strong>
            Exclusive jurisdiction and venue for any disputes arising under
            these Terms shall be in the state and federal courts located in
            Jackson County, North Carolina, USA.
          </strong>{" "}
          You hereby consent to the personal jurisdiction of such courts and
          waive any objection to venue therein.
        </p>
      </section>

      <section>
        <h2>14. Dispute Resolution</h2>
        <p>
          Any dispute arising out of or relating to these Terms or the Service
          shall be resolved through binding arbitration administered by the
          American Arbitration Association in accordance with its Commercial
          Arbitration Rules. The arbitration shall take place in Jackson County,
          North Carolina.
        </p>
        <p>
          <strong>CLASS ACTION WAIVER:</strong> YOU AGREE THAT ANY CLAIMS MUST
          BE BROUGHT IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
          MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
        </p>
      </section>

      <section>
        <h2>15. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or
          invalid, that provision shall be limited or eliminated to the minimum
          extent necessary so that these Terms shall otherwise remain in full
          force and effect.
        </p>
      </section>

      <section>
        <h2>16. Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and Hustle
          Launch regarding the Service and supersede all prior agreements and
          understandings, whether written or oral.
        </p>
      </section>

      <section>
        <h2>17. Contact</h2>
        <p>
          For questions regarding these Terms:{" "}
          <a href="mailto:legal@hustlelaunch.com">legal@hustlelaunch.com</a>
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
