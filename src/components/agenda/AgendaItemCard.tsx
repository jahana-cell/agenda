"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { AgendaItem, AgendaItemStatus } from "@/app/types";
import { iconMap } from "@/app/data/agenda-data";
import { GripVertical } from "lucide-react";

type AgendaItemCardProps = {
  item: AgendaItem;
  isDragging: boolean;
  onUpdateStatus: (id: string, status: AgendaItemStatus) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function AgendaItemCard({
  item,
  isDragging,
  onUpdateStatus,
  ...dragProps
}: AgendaItemCardProps) {
  const Icon = iconMap[item.icon];

  const handleCheckedChange = (checked: boolean) => {
    onUpdateStatus(item.id, checked ? 'completed' : 'pending');
  };

  return (
    <Card
      draggable
      {...dragProps}
      className={cn(
        "cursor-move transition-all duration-300 ease-in-out",
        isDragging
          ? "opacity-50 scale-105 shadow-2xl ring-2 ring-accent"
          : "opacity-100 scale-100 shadow-md",
        "hover:shadow-lg hover:border-primary/50",
        item.status === 'completed' && "bg-secondary"
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex items-center h-full pt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" aria-hidden="true" />
        </div>
        <Checkbox
          id={`item-${item.id}`}
          checked={item.status === 'completed'}
          onCheckedChange={handleCheckedChange}
          className="mt-1.5 h-5 w-5"
          aria-label={`Mark "${item.title}" as ${item.status === 'completed' ? 'pending' : 'completed'}`}
        />
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className={cn(
              "font-bold text-lg font-headline transition-all",
              item.status === 'completed' && "line-through text-muted-foreground"
            )}>
              {item.title}
            </h3>
          </div>
          <p className={cn(
            "text-muted-foreground text-sm transition-all",
            item.status === 'completed' && "line-through"
          )}>
            {item.description}
          </p>
          <p className="text-xs font-semibold mt-2 text-primary">
            Owner: {item.owner}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
