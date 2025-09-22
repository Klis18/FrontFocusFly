import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { EventsService } from '../../services/events.service';
import { EventFilters, EventResponse } from '../../interfaces/event.interface';
import { EventItemComponent } from "../../components/event-item/event-item.component";
import { EventFiltersSearchComponent } from "../../components/event-filters-search/event-filters-search.component";
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-events-page',
  imports: [
    MatIconModule,
    PaginatorComponent,
    EventItemComponent,
    EventFiltersSearchComponent
],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export default class EventsPageComponent implements OnInit{

  public eventsResponse !: EventResponse;
  public filterEvents : EventFilters = {
    titulo: '',
    fecha: undefined,
    page: 1,
    pageSize: 5
  }

  constructor(private eventsService: EventsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(){
    this.eventsService.getEvents(this.filterEvents).pipe(
      tap((response) => {
        this.eventsResponse = response
      })
    ).subscribe();
  }

  filteredEvents(filters:any){
    const {titulo, fecha} = filters;
    this.filterEvents.titulo = titulo;
    this.filterEvents.fecha = fecha;
    this.obtenerEventos();
  }

  reloadPage(reload: string){
    if(reload){
      this.obtenerEventos();
    }
  }

  openAddEventModal(){
    const dialogRef = this.dialog.open(EventFormComponent,{
      data:{
        action: 'add'
      },
      width: '50%'
    });
    dialogRef.afterClosed().pipe(
      tap(() => {
        this.obtenerEventos();
      })
    )
  }

}
