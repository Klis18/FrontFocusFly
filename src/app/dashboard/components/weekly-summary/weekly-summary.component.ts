import { Component, input } from '@angular/core';

@Component({
  selector: 'dashboard-weekly-summary',
  imports: [],
  templateUrl: './weekly-summary.component.html',
  styles: ``
})
export class WeeklySummaryComponent {

  totalHoursWorks = input<number>();

}
