import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsExample() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Active</Badge>
            <span className="text-muted-foreground">Last deployed 2h ago</span>
          </div>
          <p>
            Project is running on 3 regions with 99.98% uptime over the last 30
            days.
          </p>
        </TabsContent>
        <TabsContent value="metrics" className="space-y-3 pt-2">
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardHeader className="p-3">
                <CardDescription>Requests</CardDescription>
                <CardTitle className="text-lg">12.4k</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-3">
                <CardDescription>P95 Latency</CardDescription>
                <CardTitle className="text-lg">142ms</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-3">
                <CardDescription>Error rate</CardDescription>
                <CardTitle className="text-lg">0.02%</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-3 pt-2">
          <p className="text-muted-foreground">
            Environment variables, build settings, and domain configuration.
          </p>
        </TabsContent>
      </Tabs>

      <Separator />

      <Tabs defaultValue="code" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="pulls">Pull requests</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="pt-2">
          <p className="text-muted-foreground">
            Line variant tabs for content-heavy layouts like documentation or
            repo navigation.
          </p>
        </TabsContent>
        <TabsContent value="issues" className="pt-2">
          <p className="text-muted-foreground">3 open issues, 12 closed</p>
        </TabsContent>
        <TabsContent value="pulls" className="pt-2">
          <p className="text-muted-foreground">1 open PR awaiting review</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
