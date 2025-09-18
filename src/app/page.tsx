"use client";

import { useState } from 'react';
import type { AgendaItem } from '@/app/types';
import { initialAgendaItems } from '@/app/data/agenda-data';
import AgendaHeader from '@/components/agenda/AgendaHeader';
import AgendaList from '@/components/agenda/AgendaList';
import AgendaForm from '@/components/agenda/AgendaForm';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgendaItems);

  const handleAddItem = (item: Omit<AgendaItem, 'id' | 'status'>) => {
    const newItem: AgendaItem = {
      ...item,
      id: Date.now().toString(),
      status: 'pending',
    };
    setAgendaItems((prevItems) => [...prevItems, newItem]);
  };

  const handleUpdateStatus = (id: string, status: 'pending' | 'completed') => {
    setAgendaItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleExport = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const agendaHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgendaFlow - Meeting Agenda</title>
  <style>
    body { font-family: 'PT Sans', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #D3D3D3; }
    h1 { color: #708090; border-bottom: 2px solid #708090; padding-bottom: 10px; }
    ul { list-style: none; padding: 0; }
    li { background-color: white; border: 1px solid #ddd; padding: 15px 20px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    li.completed { opacity: 0.7; }
    li.completed h3 { text-decoration: line-through; }
    h3 { margin-top: 0; margin-bottom: 5px; color: #333; }
    p { margin: 5px 0 0; }
    .owner { font-style: italic; color: #555; }
  </style>
</head>
<body>
  <h1>Meeting Agenda</h1>
  <ul>
    ${agendaItems.map(item => `
      <li class="${item.status === 'completed' ? 'completed' : ''}">
        <h3>${item.status === 'completed' ? '✅' : '⬜️'} ${item.title}</h3>
        <p>${item.description}</p>
        <p class="owner"><strong>Owner:</strong> ${item.owner}</p>
      </li>
    `).join('')}
  </ul>
</body>
</html>`;

    const blob = new Blob([agendaHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agenda.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <AgendaHeader onExport={handleExport} />
          <AgendaList items={agendaItems} setItems={setAgendaItems} onUpdateStatus={handleUpdateStatus} />
          <AgendaForm onAddItem={handleAddItem} />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
