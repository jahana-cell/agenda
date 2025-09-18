import { Briefcase, Users, FileText, type LucideIcon } from 'lucide-react';
import type { AgendaItem, AgendaItemIcon } from '@/app/types';

export const initialAgendaItems: AgendaItem[] = [
  {
    id: '1',
    title: 'Review Q2 Financials',
    description: 'Go over the quarterly financial report and discuss key takeaways.',
    owner: 'Alice',
    status: 'completed',
    icon: 'Briefcase',
  },
  {
    id: '2',
    title: 'Marketing Campaign Strategy',
    description: 'Brainstorm and finalize the strategy for the upcoming campaign.',
    owner: 'Bob',
    status: 'pending',
    icon: 'Users',
  },
  {
    id: '3',
    title: 'Project Phoenix Update',
    description: 'Share progress updates on Project Phoenix and address any blockers.',
    owner: 'Charlie',
    status: 'pending',
    icon: 'FileText',
  },
];

export const iconMap: Record<AgendaItemIcon, LucideIcon> = {
  Briefcase,
  Users,
  FileText,
};
