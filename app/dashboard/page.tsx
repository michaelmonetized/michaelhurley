"use client";

import Layout from "@/components/ui/layout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", active: true },
  { label: "Analytics", active: false },
  { label: "Campaigns", active: false },
  { label: "Settings", active: false },
];

const stats = [
  { title: "Total Visitors", value: "24,831", change: "+12.5% from last month" },
  { title: "Conversions", value: "1,429", change: "+8.2% from last month" },
  { title: "Revenue", value: "$48,290", change: "+22.1% from last month" },
  { title: "Active Campaigns", value: "7", change: "3 launching this week" },
];

const recentActivity = [
  {
    date: "Mar 31, 2026",
    action: "Campaign 'Spring Sale' went live",
    status: "Active",
  },
  {
    date: "Mar 30, 2026",
    action: "New subscriber batch imported (340 contacts)",
    status: "Completed",
  },
  {
    date: "Mar 28, 2026",
    action: "A/B test concluded for 'Welcome Flow'",
    status: "Completed",
  },
  {
    date: "Mar 27, 2026",
    action: "Payment failed for invoice #1042",
    status: "Failed",
  },
  {
    date: "Mar 25, 2026",
    action: "Campaign 'Early Access' scheduled",
    status: "Pending",
  },
];

function statusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default" as const;
    case "Completed":
      return "secondary" as const;
    case "Failed":
      return "destructive" as const;
    case "Pending":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
}

export default function DashboardPage() {
  return (
    <Layout variant="sidebar">
      <Sidebar>
        <SidebarHeader className="p-4">
          <span className="text-sm font-bold tracking-tight">
            Hustle Launch
          </span>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active}>
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <Button className="w-full">Upgrade</Button>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h1 className="text-lg font-bold">Welcome back, Michael</h1>
          <p className="text-xs text-muted-foreground">
            Here&apos;s what&apos;s happening across your campaigns today.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader>
                <CardDescription>{stat.title}</CardDescription>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent activity table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and campaign events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant(row.status)}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Chart placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Trend</CardTitle>
            <CardDescription>
              Daily unique visitors over the past 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "flex h-48 items-center justify-center rounded-none",
                "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
              )}
            >
              <span className="text-sm font-medium text-muted-foreground">
                Chart
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
