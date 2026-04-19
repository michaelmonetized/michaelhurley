"use client";

import Layout from "@/components/ui/layout";
import { Sidebar, type SectionsType } from "@/components/ui/layout/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemGroup,
  ItemHeader,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowUpRightIcon,
  PulseIcon as ActivityIcon,
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
  ChatCircleTextIcon,
  BellIcon,
  GearIcon,
  TrendUpIcon,
  CheckIcon,
} from "@phosphor-icons/react";

import Hero from "@/components/marketing/hero";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import * as React from "react";

const sections: SectionsType = [
  ["Dashboard & Metrics", "dashboard"],
  ["Application Shells", "shells"],
  ["SaaS & Marketing", "marketing"],
  ["Social & Engagement", "social"],
  ["Feedback & Status", "feedback"],
];

function SectionHeader({ title, description, id }: { title: string; description?: string; id: string }) {
  return (
    <div className="space-y-1 mb-6" id={id}>
      <h2 className="font-black text-lg tracking-tight uppercase">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon }: { 
  title: string; 
  value: string; 
  change: string; 
  trend: "up" | "down"; 
  icon: React.ElementType 
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <span className={cn(
            "flex items-center",
            trend === "up" ? "text-success" : "text-destructive"
          )}>
            {trend === "up" ? <TrendUpIcon className="h-3 w-3" /> : <TrendUpIcon className="h-3 w-3 rotate-180" />}
            {change}
          </span>
          <span>from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function UIKitPage() {
  return (
    <Layout variant="sidebar">
      <Sidebar sections={sections} />
      <main className="flex-1 overflow-y-auto p-6 space-y-12 pb-24">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Web App UI Kit</h1>
          <p className="text-muted-foreground">
            A showcase of common application patterns and interface elements for modern web applications.
          </p>
        </div>

        {/* Dashboard & Metrics */}
        <section>
          <SectionHeader 
            id="dashboard"
            title="Dashboard & Metrics" 
            description="Cards and widgets for displaying key performance indicators and high-level data."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
              title="Total Revenue" 
              value="$45,231.89" 
              change="+20.1%" 
              trend="up" 
              icon={CurrencyDollarIcon} 
            />
            <StatCard 
              title="Subscriptions" 
              value="+2,350" 
              change="+180.1%" 
              trend="up" 
              icon={UsersIcon} 
            />
            <StatCard 
              title="Active Now" 
              value="573" 
              change="+201" 
              trend="up" 
              icon={ActivityIcon} 
            />
            <StatCard 
              title="Churn Rate" 
              value="2.4%" 
              change="-0.4%" 
              trend="down" 
              icon={ChartBarIcon} 
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Monthly performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2 px-2">
                  {[40, 70, 45, 90, 65, 48, 82, 55, 95, 60, 75, 50].map((h, i) => (
                    <div 
                      key={i} 
                      className="bg-primary/20 hover:bg-primary transition-colors w-full" 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-muted-foreground uppercase font-bold">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events from your users</CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup data-size="xs">
                  <Item variant="default" className="p-0 border-0">
                    <ItemMedia variant="image">
                      <NextImage 
                        src="https://placecats.com/40/40" 
                        alt="User" 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="text-xs">New user registered</ItemTitle>
                      <ItemDescription>2 minutes ago</ItemDescription>
                    </ItemContent>
                  </Item>
                  <Item variant="default" className="p-0 border-0">
                    <ItemMedia variant="image">
                      <div className="bg-success/20 text-success p-2 rounded-full">
                        <CheckCircleIcon size={16} />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="text-xs">Payment successful</ItemTitle>
                      <ItemDescription>Invoice #1234 - $299.00</ItemDescription>
                    </ItemContent>
                  </Item>
                  <Item variant="default" className="p-0 border-0">
                    <ItemMedia variant="image">
                      <div className="bg-secondary/20 text-secondary p-2 rounded-full">
                        <ChatCircleTextIcon size={16} />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="text-xs">New comment received</ItemTitle>
                      <ItemDescription>On post &quot;The future of AI&quot;</ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Application Shells */}
        <section>
          <SectionHeader 
            id="shells"
            title="Application Shells" 
            description="Structural layout patterns for different types of applications."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sidebar Navigation</CardTitle>
                <CardDescription>Best for complex, data-heavy applications with many tools.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-border rounded-none h-48 bg-muted/30 flex overflow-hidden">
                  <div className="w-12 border-r border-border bg-background p-2 flex flex-col gap-2">
                    <div className="w-8 h-8 bg-primary rounded-none" />
                    <div className="w-8 h-2 bg-muted rounded-none" />
                    <div className="w-8 h-2 bg-muted rounded-none" />
                    <div className="w-8 h-2 bg-muted rounded-none" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="h-8 border-b border-border bg-background" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted w-1/2" />
                      <div className="h-24 bg-muted/50 w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Navigation</CardTitle>
                <CardDescription>Ideal for simpler apps or those focused on content consumption.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-border rounded-none h-48 bg-muted/30 flex flex-col overflow-hidden">
                  <div className="h-8 border-b border-border bg-background px-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-4 h-4 bg-primary" />
                      <div className="w-8 h-2 bg-muted" />
                      <div className="w-8 h-2 bg-muted" />
                    </div>
                    <div className="w-4 h-4 bg-muted rounded-full" />
                  </div>
                  <div className="flex-1 p-4 space-y-2 max-w-md mx-auto w-full">
                    <div className="h-4 bg-muted w-1/3 mx-auto" />
                    <div className="h-24 bg-muted/50 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SaaS & Marketing */}
        <section>
          <SectionHeader 
            id="marketing"
            title="SaaS & Marketing" 
            description="Components designed to drive conversion and communicate value."
          />
          <div className="space-y-8">
            <Card className="overflow-hidden bg-muted/10 border-dashed">
              <div className="p-4 text-center border-b border-dashed border-border">
                <Badge variant="outline">Hero Section Example</Badge>
              </div>
              <div className="scale-75 origin-top -mb-32">
                <Hero />
              </div>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-border p-6 space-y-4 max-w-sm mx-auto">
                    <div className="space-y-1">
                      <h3 className="font-bold">Pro Plan</h3>
                      <p className="text-xs text-muted-foreground">For growing teams</p>
                    </div>
                    <div className="text-3xl font-black">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center gap-2"><CheckIcon className="text-success h-4 w-4" /> Unlimited projects</li>
                      <li className="flex items-center gap-2"><CheckIcon className="text-success h-4 w-4" /> Advanced analytics</li>
                      <li className="flex items-center gap-2"><CheckIcon className="text-success h-4 w-4" /> 24/7 priority support</li>
                    </ul>
                    <Button className="w-full">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Feature Highlight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="w-8 h-8 bg-primary/10 text-primary flex items-center justify-center">
                          {i === 1 && <ActivityIcon />}
                          {i === 2 && <UsersIcon />}
                          {i === 3 && <BellIcon />}
                          {i === 4 && <GearIcon />}
                        </div>
                        <h4 className="text-xs font-bold uppercase">Feature {i}</h4>
                        <p className="text-[10px] text-muted-foreground leading-tight">
                          Describing the amazing benefit of this specific feature.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social & Engagement */}
        <section>
          <SectionHeader 
            id="social"
            title="Social & Engagement" 
            description="UI for building community, communication, and user interaction."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4 border-2 border-primary/20">
                  <AvatarImage src="https://placecats.com/100/100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-bold">Jane Doe</h3>
                <p className="text-xs text-muted-foreground mb-4">Product Designer @ ACME</p>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">Message</Button>
                  <Button size="sm" className="flex-1">Follow</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <ItemGroup>
                  {[1, 2].map(i => (
                    <Item key={i} className="border-0 p-0 items-start">
                      <div data-slot="item-media" data-variant="image" className="mt-1 flex shrink-0 items-center justify-center gap-2">
                         <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://placecats.com/${40+i}/${40+i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                      </div>
                      <ItemContent>
                        <ItemHeader>
                          <ItemTitle className="text-xs font-bold">User {i}</ItemTitle>
                          <span className="text-[10px] text-muted-foreground">{i * 2}h ago</span>
                        </ItemHeader>
                        <ItemDescription className="text-xs">
                          This is a comment that provides some valuable feedback on the content above. 
                          I really like the way the interface feels!
                        </ItemDescription>
                        <div className="flex gap-4 mt-2">
                          <button className="text-[10px] text-muted-foreground hover:text-primary">Like</button>
                          <button className="text-[10px] text-muted-foreground hover:text-primary">Reply</button>
                        </div>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
                  <div className="mt-6 flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placecats.com/80/80" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  <div className="flex-1 relative">
                    <input 
                      placeholder="Write a comment..." 
                      className="w-full text-xs p-2 pr-10 border border-border bg-transparent outline-none focus:border-primary"
                    />
                    <button className="absolute right-2 top-2 text-primary hover:text-primary-hover">
                      <ArrowUpRightIcon size={14} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feedback & Status */}
        <section>
          <SectionHeader 
            id="feedback"
            title="Feedback & Status" 
            description="Components for communicating system state, progress, and outcomes."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-xs font-medium">Server Status</span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-success">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-xs font-medium">Database Backup</span>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-3 w-3 text-secondary" />
                    <span className="text-[10px] uppercase font-bold text-secondary">In Progress</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">API Integration</span>
                  <div className="flex items-center gap-2">
                    <WarningCircleIcon className="h-3 w-3 text-destructive" />
                    <span className="text-[10px] uppercase font-bold text-destructive">Degraded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Progress & Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold">
                    <span>Onboarding Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold">
                    <span>File Upload</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-1" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="gap-1 animate-pulse">
                    <ActivityIcon size={10} /> Syncing
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <ClockIcon size={10} /> 5m left
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
    </Layout>
  );
}
