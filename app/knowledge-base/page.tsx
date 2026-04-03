import Layout from "@/components/ui/layout";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const categories = [
  {
    emoji: "\uD83D\uDE80",
    title: "Getting Started",
    count: 12,
    description:
      "Set up your account, connect your domain, and launch your first campaign in minutes.",
  },
  {
    emoji: "\uD83D\uDCB3",
    title: "Account & Billing",
    count: 9,
    description:
      "Manage subscriptions, payment methods, invoices, and plan upgrades.",
  },
  {
    emoji: "\uD83D\uDCE3",
    title: "Campaigns",
    count: 18,
    description:
      "Create, schedule, and optimize email and SMS campaigns for maximum reach.",
  },
  {
    emoji: "\uD83D\uDCCA",
    title: "Analytics",
    count: 14,
    description:
      "Understand your data with dashboards, reports, and conversion tracking.",
  },
  {
    emoji: "\uD83D\uDD17",
    title: "Integrations",
    count: 11,
    description:
      "Connect Hustle Launch with Stripe, Zapier, Slack, and 40+ other tools.",
  },
  {
    emoji: "\uD83D\uDCD6",
    title: "API Reference",
    count: 23,
    description:
      "Full REST API documentation with examples for developers and teams.",
  },
];

const popularArticles = [
  {
    title: "How to set up your first drip campaign",
    category: "Campaigns",
    updated: "Updated 2d ago",
  },
  {
    title: "Understanding your conversion funnel report",
    category: "Analytics",
    updated: "Updated 2d ago",
  },
  {
    title: "Connecting Stripe for one-click checkout",
    category: "Integrations",
    updated: "Updated 2d ago",
  },
  {
    title: "Managing team roles and permissions",
    category: "Account & Billing",
    updated: "Updated 2d ago",
  },
  {
    title: "Authenticating with the Hustle Launch API",
    category: "API Reference",
    updated: "Updated 2d ago",
  },
];

export default function KnowledgeBasePage() {
  return (
    <Layout variant="default">
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-lg font-bold">Knowledge Base</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Find answers, guides, and resources for everything Hustle Launch.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-10 max-w-[28rem]">
          <Input
            type="search"
            placeholder="Search articles..."
          />
        </div>

        {/* Category cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.title} className="cursor-pointer transition-colors hover:bg-muted/40">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" role="img" aria-label={cat.title}>
                    {cat.emoji}
                  </span>
                  <CardTitle>{cat.title}</CardTitle>
                </div>
                <Badge variant="secondary">{cat.count} articles</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>{cat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-10" />

        {/* Popular articles */}
        <section>
          <h2 className="mb-4 text-sm font-bold">Popular Articles</h2>
          <ul className="flex flex-col gap-3">
            {popularArticles.map((article) => (
              <li
                key={article.title}
                className="flex items-center justify-between rounded-none border border-border px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium">{article.title}</span>
                  <Badge variant="outline">{article.category}</Badge>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {article.updated}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}
