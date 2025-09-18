"use client";

import { useState } from 'react';
import type { AgendaItem, AgendaItemStatus } from '@/app/types';
import AgendaItemCard from './AgendaItemCard';
import { Card, CardContent } from '../ui/card';
import { Inbox } from 'lucide-react';

type AgendaListProps = {
  items: AgendaItem[];
  setItems: React.Dispatch<React.SetStateAction<AgendaItem[]>>;
  onUpdateStatus: (id: string, status: AgendaItemStatus) => void;
};

export default function AgendaList({ items, setItems, onUpdateStatus }: AgendaListProps) {
  const [draggedItem, setDraggedItem] = useState<AgendaItem | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: AgendaItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropTargetItem: AgendaItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === dropTargetItem.id) {
      return;
    }

    const dragIndex = items.findIndex(item => item.id === draggedItem.id);
    const dropIndex = items.findIndex(item => item.id === dropTargetItem.id);

    if (dragIndex === -1 || dropIndex === -1) {
      return;
    }
    
    const newItems = [...items];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center text-muted-foreground">
          <Inbox className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">Your agenda is empty.</h3>
          <p>Add a new item below to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AgendaItemCard
          key={item.id}
          item={item}
          isDragging={draggedItem?.id === item.id}
          onUpdateStatus={onUpdateStatus}
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
