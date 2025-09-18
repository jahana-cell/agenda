"use client";

import { Button } from "@/components/ui/button";
import { Download, ListChecks } from "lucide-react";

type AgendaHeaderProps = {
  onExport: () => void;
};

export default function AgendaHeader({ onExport }: AgendaHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4 border-b-2 border-primary/20">
      <div className="flex items-center gap-3">
        <ListChecks className="h-10 w-10 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
          AgendaFlow
        </h1>
      </div>
      <Button onClick={onExport} variant="outline" className="hidden sm:inline-flex">
        <Download className="mr-2 h-4 w-4" />
        Export to HTML
      </Button>
      <Button onClick={onExport} variant="outline" size="icon" className="sm:hidden">
        <Download className="h-4 w-4" />
        <span className="sr-only">Export to HTML</span>
      </Button>
    </header>
  );
}
