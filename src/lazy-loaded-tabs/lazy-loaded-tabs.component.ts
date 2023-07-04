import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TicketListComponent } from '../tickets/ticket-list/ticket-list.component';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TicketStore } from '../tickets/ticket.store';
import { TicketService } from '../tickets/ticket.service';
import { TicketState } from '../tickets/ticket.model';

@Component({
  selector: 'app-lazy-loaded-tabs',
  standalone: true,
  templateUrl: './lazy-loaded-tabs.component.html',
  styleUrls: ['./lazy-loaded-tabs.component.css'],
  imports: [
    CommonModule,
    MatTabsModule,
    TabContentComponent,
    TicketListComponent,
  ],
  providers: [TicketStore, TicketService],
})
export class LazyLoadedTabsComponent implements OnInit {
  public tabs: { label: string; formSrc: string }[] = [];
  TicketState = TicketState;
  constructor(
    private ticketService: TicketService,
    private ticketStore: TicketStore
  ) {
    this.createFakeTabs();
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.ticketService.fetchAllTickets().subscribe({
      next: (tickets) => {
        this.ticketStore.loadTickets(tickets);
      },
    });
    // fetchAllTickets;
  }

  public selectedTabChanged() {
    console.log('tab changed');
  }

  private createFakeTabs() {
    const tabs = [
      { label: 'zero', formSrc: 'content for zero' },
      { label: 'one', formSrc: 'content for one' },
      { label: 'two', formSrc: 'content for two' },
    ];

    this.tabs = tabs;
    console.log('setting tabs');
  }
}
