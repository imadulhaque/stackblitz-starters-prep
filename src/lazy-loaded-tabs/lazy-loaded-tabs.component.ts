import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'app-lazy-loaded-tabs',
  standalone: true,
  templateUrl: './lazy-loaded-tabs.component.html',
  styleUrls: ['./lazy-loaded-tabs.component.css'],
  imports: [CommonModule, MatTabsModule, TabContentComponent],
})
export class LazyLoadedTabsComponent implements OnInit {
  public tabs: { label: string; formSrc: string }[] = [];

  constructor() {
    this.createFakeTabs();
  }

  ngOnInit() {
    console.log('ngOnInit');
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
