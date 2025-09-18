export type AgendaItemIcon = 'Briefcase' | 'Users' | 'FileText';

export type AgendaItemStatus = 'pending' | 'completed';

export type AgendaItem = {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: AgendaItemStatus;
  icon: AgendaItemIcon;
};
