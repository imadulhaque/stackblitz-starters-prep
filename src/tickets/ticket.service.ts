import { Injectable } from '@angular/core';
import { delay, filter, from, Observable, of } from 'rxjs';
import { Ticket, TicketState } from './ticket.model';

@Injectable()
export class TicketService {
  tickets: Ticket[] = [
    {
      id: 1,
      title: 'Fix title',
      description: 'Tile color is not as per theme',
      state: TicketState.Open,
    },
    {
      id: 2,
      title: 'Fix Header',
      description: 'Tile color is not as per theme',
      state: TicketState.Closed,
    },
    {
      id: 3,
      title: 'Fix Body Text',
      description: 'Tile color is not as per theme',
      state: TicketState.InProgress,
    },
  ];
  constructor() {}

  fetchAllTickets(): Observable<Ticket[]> {
    return of(this.tickets).pipe(delay(1000));
  }

  fetchOpenTickets(): Observable<Ticket[]> {
    return of(
      this.tickets.filter((t: Ticket) => t.state === TicketState.Open)
    ).pipe(delay(1000));
  }

  fetchClosedTickets(): Observable<Ticket[]> {
    return of(
      this.tickets.filter((t: Ticket) => t.state === TicketState.Closed)
    ).pipe(delay(1000));
  }

  fetchInProgressTickets(): Observable<Ticket[]> {
    return of(
      this.tickets.filter((t: Ticket) => t.state === TicketState.InProgress)
    ).pipe(delay(1000));
  }

  changeTicketState(ticket: Ticket, state: TicketState): Observable<Ticket> {
    const index = this.tickets.findIndex((t: Ticket) => t.id === ticket.id);
    this.tickets[index].state = state;
    return of(this.tickets[index]).pipe(delay(1000));
  }
}
