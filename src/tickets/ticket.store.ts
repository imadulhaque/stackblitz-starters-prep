import { constructorChecks } from '@angular/cdk/schematics';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, concatMap, EMPTY, Observable, tap } from 'rxjs';
import { Ticket, TicketState } from './ticket.model';
import { TicketService } from './ticket.service';

export interface TicketsState {
  tickets: Ticket[];
}

@Injectable()
export class TicketStore extends ComponentStore<TicketsState> {
  constructor(private ticketService: TicketService) {
    super({
      tickets: [],
    });
  }

  readonly openTickets$: Observable<Ticket[]> = this.select((state) =>
    state.tickets.filter((t: Ticket) => t.state === TicketState.Open)
  );

  readonly closedTickets$: Observable<Ticket[]> = this.select((state) =>
    state.tickets.filter((t: Ticket) => t.state === TicketState.Closed)
  );

  readonly inProgressTickets$: Observable<Ticket[]> = this.select((state) =>
    state.tickets.filter((t: Ticket) => t.state === TicketState.InProgress)
  );

  readonly updateTicket = this.updater((state, ticket: Ticket) => ({
    ...state,
    //[...state.tickets, ticket],
    tickets: state.tickets
      .map((t: Ticket) => ({ ...t }))
      .map((t: Ticket) => {
        if (t.id === ticket.id){
          return {...t, state: ticket.state};
        } else {
          return t;
        }
      }),
  }));

  readonly loadTickets = this.updater((state, tickets: Ticket[] | null) => ({
    ...state,
    tickets: tickets || [],
  }));

  readonly changeTicketState = this.effect<{
    ticket: Ticket;
    state: TicketState;
  }>((ticket$) =>
    ticket$.pipe(
      concatMap((data) =>
        this.ticketService.changeTicketState(data.ticket, data.state).pipe(
          tap((ticket: Ticket) => this.updateTicket(ticket)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
