import { Component } from '@angular/core';
import { WeeklySummaryComponent } from "../../components/weekly-summary/weekly-summary.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [WeeklySummaryComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export default class DashboardPageComponent {

}
