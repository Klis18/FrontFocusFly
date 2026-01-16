import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { EventsService } from '../../services/events.service';
import { EventFilters, EventResponse } from '../../interfaces/event.interface';
import { EventItemComponent } from "../../components/event-item/event-item.component";
import { EventFiltersSearchComponent } from "../../components/event-filters-search/event-filters-search.component";
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { catchError, of, Subject, tap, takeUntil, filter, switchMap } from 'rxjs';
import { AlertsService } from '../../../shared/services/alerts.service';

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
export default class EventsPageComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();
  public eventsResponse !: EventResponse;
  public filterEvents : EventFilters = {
    titulo: '',
    fecha: undefined,
    page: 1,
    pageSize: 5
  }

  constructor(private alertServices: AlertsService,
              private dialog: MatDialog,
              private eventsService: EventsService
              ) {}
              
  ngOnInit(): void {
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
              
  private loadEvents$(){
    return this.eventsService.getEvents(this.filterEvents).pipe(
      tap((response) => {
        this.eventsResponse = response
      }),
      catchError(err => {
        this.alertServices.sendErrorMessage('Lo sentimos, hubo un error al cargar los eventos');
        console.error('get Events Error', err);
        return of(null);
      })
    );
  }

  loadEvents(){
    this.loadEvents$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  filteredEvents(filters: any){
    const {titulo, fecha} = filters;
    this.filterEvents.titulo = titulo;
    this.filterEvents.fecha = fecha;
    this.loadEvents();
  }

  reloadPage(reload: string){
    if(reload){
      this.loadEvents();
    }
  }

  openAddEventModal(){
    const dialogRef = this.dialog.open(EventFormComponent,{
      data:{
        action: 'add'
      },
      width: '50%'
    });

    dialogRef.afterClosed()
              .pipe(
                switchMap(() => this.loadEvents$()),
                takeUntil(this.destroy$)
              )
              .subscribe();
  }

}
