"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ── Shared data ──

type Deployment = {
  id: string;
  branch: string;
  status: "ready" | "building" | "error";
  region: string;
  duration: number;
  date: string;
};

const initialRows: Deployment[] = [
  { id: "dpl_1", branch: "main", status: "ready", region: "iad1", duration: 14, date: "Mar 31" },
  { id: "dpl_2", branch: "feat/auth", status: "building", region: "sfo1", duration: 28, date: "Mar 31" },
  { id: "dpl_3", branch: "fix/nav", status: "ready", region: "cdg1", duration: 9, date: "Mar 30" },
  { id: "dpl_4", branch: "main", status: "error", region: "hnd1", duration: 42, date: "Mar 30" },
  { id: "dpl_5", branch: "feat/api", status: "ready", region: "iad1", duration: 17, date: "Mar 29" },
  { id: "dpl_6", branch: "feat/ui", status: "ready", region: "sfo1", duration: 11, date: "Mar 29" },
  { id: "dpl_7", branch: "main", status: "ready", region: "cdg1", duration: 22, date: "Mar 28" },
  { id: "dpl_8", branch: "fix/perf", status: "ready", region: "iad1", duration: 8, date: "Mar 28" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  ready: "default",
  building: "secondary",
  error: "destructive",
};

// ── 1. Sortable table ──

type SortKey = "branch" | "status" | "region" | "duration" | "date";
type SortDir = "asc" | "desc";

function SortableTable() {
  const [sortKey, setSortKey] = React.useState<SortKey>("duration");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...initialRows].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <Table>
      <TableCaption>Click a column header to sort</TableCaption>
      <TableHeader>
        <TableRow>
          {(["branch", "status", "region", "duration", "date"] as const).map((key) => (
            <TableHead
              key={key}
              className="cursor-pointer select-none hover:text-foreground"
              onClick={() => handleSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {arrow(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono">{row.branch}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
            </TableCell>
            <TableCell className="font-mono">{row.region}</TableCell>
            <TableCell>{row.duration}s</TableCell>
            <TableCell className="text-muted-foreground">{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── 2. Drag to reorder ──

function DragReorderTable() {
  const [rows, setRows] = React.useState(initialRows.slice(0, 5));
  const dragIndex = React.useRef<number | null>(null);
  const overIndex = React.useRef<number | null>(null);

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragEnter(index: number) {
    overIndex.current = index;
  }

  function handleDragEnd() {
    const from = dragIndex.current;
    const to = overIndex.current;
    if (from === null || to === null || from === to) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragIndex.current = null;
    overIndex.current = null;
  }

  return (
    <Table>
      <TableCaption>Drag rows to reorder priority</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8" />
          <TableHead>Branch</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={row.id}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="cursor-grab active:cursor-grabbing"
          >
            <TableCell className="text-muted-foreground select-none">⠿</TableCell>
            <TableCell className="font-mono">{row.branch}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
            </TableCell>
            <TableCell>{row.duration}s</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── 3. Sticky header/footer/first column ──

function StickyTable() {
  return (
    <div className="relative max-h-56 overflow-auto border">
      <table className="w-full text-xs">
        <thead className="sticky top-0 z-20 bg-background">
          <tr className="border-b">
            <th className="sticky left-0 z-30 bg-background px-3 py-2 text-left font-medium">
              Branch
            </th>
            <th className="px-3 py-2 text-left font-medium">Status</th>
            <th className="px-3 py-2 text-left font-medium">Region</th>
            <th className="px-3 py-2 text-left font-medium">Duration</th>
            <th className="px-3 py-2 text-left font-medium">Date</th>
            <th className="px-3 py-2 text-left font-medium">Commit</th>
          </tr>
        </thead>
        <tbody>
          {[...initialRows, ...initialRows].map((row, i) => (
            <tr key={`${row.id}-${i}`} className="border-b hover:bg-muted/50">
              <td className="sticky left-0 z-10 bg-background px-3 py-2 font-mono">
                {row.branch}
              </td>
              <td className="px-3 py-2">
                <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
              </td>
              <td className="px-3 py-2 font-mono">{row.region}</td>
              <td className="px-3 py-2">{row.duration}s</td>
              <td className="px-3 py-2 text-muted-foreground">{row.date}</td>
              <td className="px-3 py-2 font-mono text-muted-foreground">
                {row.id.replace("dpl_", "a1b2c3")}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0 z-20 border-t bg-muted/50">
          <tr>
            <td className="sticky left-0 z-30 bg-muted/50 px-3 py-2 font-medium">
              Total
            </td>
            <td className="px-3 py-2" colSpan={2}>
              {initialRows.length * 2} deployments
            </td>
            <td className="px-3 py-2">
              {[...initialRows, ...initialRows].reduce((s, r) => s + r.duration, 0)}s
            </td>
            <td className="px-3 py-2" colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── 4. Caption and summary ──

function CaptionSummaryTable() {
  const totals = initialRows.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Table>
      <TableCaption>
        Deployment summary — {initialRows.length} total: {totals.ready ?? 0} ready,{" "}
        {totals.building ?? 0} building, {totals.error ?? 0} errors
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Count</TableHead>
          <TableHead className="text-right">Avg duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(["ready", "building", "error"] as const).map((status) => {
          const matching = initialRows.filter((r) => r.status === status);
          const avg = matching.length
            ? Math.round(matching.reduce((s, r) => s + r.duration, 0) / matching.length)
            : 0;
          return (
            <TableRow key={status}>
              <TableCell>
                <Badge variant={statusVariant[status]}>{status}</Badge>
              </TableCell>
              <TableCell className="text-right">{matching.length}</TableCell>
              <TableCell className="text-right">{avg}s</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">All</TableCell>
          <TableCell className="text-right">{initialRows.length}</TableCell>
          <TableCell className="text-right">
            {Math.round(initialRows.reduce((s, r) => s + r.duration, 0) / initialRows.length)}s
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

// ── Composed export ──

export default function TableExample() {
  const [active, setActive] = React.useState<"sortable" | "drag" | "sticky" | "summary">("sortable");

  const tables = {
    sortable: <SortableTable />,
    drag: <DragReorderTable />,
    sticky: <StickyTable />,
    summary: <CaptionSummaryTable />,
  };

  const labels: Record<string, string> = {
    sortable: "Sortable",
    drag: "Drag to reorder",
    sticky: "Sticky header / footer / column",
    summary: "Caption and summary",
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
          <Button
            key={key}
            variant={active === key ? "default" : "outline"}
            size="xs"
            onClick={() => setActive(key as typeof active)}
          >
            {labels[key]}
          </Button>
        ))}
      </div>
      <Separator />
      {tables[active]}
    </div>
  );
}
