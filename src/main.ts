import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { LazyLoadedTabsComponent } from './lazy-loaded-tabs/lazy-loaded-tabs.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, LazyLoadedTabsComponent],
  template: `
    <h1>Hello from {{name}}!</h1>
    <app-lazy-loaded-tabs></app-lazy-loaded-tabs>
  `,
  host: { 'collision-id': 'MyAppTestId' },
})
export class MyAppTest {
  name = 'Angular';
}

bootstrapApplication(MyAppTest, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
  ],
}).catch((err) => console.error(err));
