import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-content',
  standalone: true,
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css'],
  imports: [CommonModule],
})
export class TabContentComponent implements OnInit, OnDestroy {
  @Input() public data: any;
  @Input() public name: any;

  constructor() {}

  ngOnInit() {
    console.log(`init: tab ${this.name}`);
  }

  public ngOnDestroy() {
    console.log(`destroy: tab ${this.name}`);
    // this.timerSubscription.unsubscribe();
  }
}
