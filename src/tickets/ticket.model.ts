// export type TicketState = 'Open' | 'Closed' | 'In Progress';

export enum TicketState {
  Open = 'Open',
  Closed = 'Closed',
  InProgress = 'In Progress'
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  state: TicketState;
}
