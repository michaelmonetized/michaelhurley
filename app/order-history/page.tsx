import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

type OrderStatus = "Delivered" | "Shipped" | "Processing";

interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "#HL-2026-0401",
    date: "Apr 1, 2026",
    items: "Launch Toolkit Pro, Campaign Templates, Analytics Add-on",
    total: "$136.08",
    status: "Processing",
  },
  {
    id: "#HL-2026-0315",
    date: "Mar 15, 2026",
    items: "Growth Accelerator Bundle",
    total: "$199.00",
    status: "Shipped",
  },
  {
    id: "#HL-2026-0228",
    date: "Feb 28, 2026",
    items: "Campaign Templates, Analytics Add-on",
    total: "$48.00",
    status: "Delivered",
  },
  {
    id: "#HL-2026-0210",
    date: "Feb 10, 2026",
    items: "Launch Toolkit Pro",
    total: "$49.00",
    status: "Delivered",
  },
  {
    id: "#HL-2026-0120",
    date: "Jan 20, 2026",
    items: "Funnel Builder, A/B Testing Suite",
    total: "$89.00",
    status: "Delivered",
  },
  {
    id: "#HL-2025-1205",
    date: "Dec 5, 2025",
    items: "Starter Pack",
    total: "$29.00",
    status: "Delivered",
  },
];

const statusVariant: Record<OrderStatus, "default" | "secondary" | "outline"> = {
  Delivered: "secondary",
  Shipped: "default",
  Processing: "outline",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OrderHistoryPage() {
  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and track all of your Hustle&nbsp;Launch orders.
          </p>
        </div>

        {/* Orders table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="max-w-[260px] truncate">
                      {order.items}
                    </TableCell>
                    <TableCell className="tabular-nums">{order.total}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="xs">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
