import { Component } from '@angular/core';
import { WeeklySummaryComponent } from "../../components/weekly-summary/weekly-summary.component";
import { WeekTasksComponent } from "../../components/week-tasks/week-tasks.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [WeeklySummaryComponent, WeekTasksComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export default class DashboardPageComponent {

}
