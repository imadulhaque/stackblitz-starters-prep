import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Ticket, TicketState } from '../ticket.model';
import { TicketStore } from '../ticket.store';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent implements OnInit, OnDestroy {
  @Input() ticketState!: TicketState;
  TicketState = TicketState;
  tickets$!: Observable<Ticket[]>;

  constructor(private ticketStore: TicketStore) {}

  ngOnInit() {
    console.log('Initialized ticketState', this.ticketState);
    if (this.ticketState === TicketState.Open) {
      this.tickets$ = this.ticketStore.openTickets$;
    } else if (this.ticketState === TicketState.Closed) {
      this.tickets$ = this.ticketStore.closedTickets$;
    } else {
      this.tickets$ = this.ticketStore.inProgressTickets$;
    }
  }

  closeTicket(ticket: Ticket) {
    this.ticketStore.changeTicketState({
      ticket: ticket,
      state: TicketState.Closed,
    });
  }

  openTicket(ticket: Ticket) {
    this.ticketStore.changeTicketState({
      ticket: ticket,
      state: TicketState.Open,
    });
  }

  setToInProgress(ticket: Ticket) {
    this.ticketStore.changeTicketState({
      ticket: ticket,
      state: TicketState.InProgress,
    });
  }

  changeTicketState(ticket: Ticket) {
    let state: TicketState;
    if (ticket.state === TicketState.Open) {
      state = TicketState.InProgress;
    } else if (this.ticketState === TicketState.Closed) {
      state = TicketState.Open;
    } else {
      state = TicketState.Closed;
    }
    this.ticketStore.changeTicketState({ ticket: ticket, state: state });
  }

  ngOnDestroy() {
    console.log('Destroyed', this.ticketState);
  }
}
