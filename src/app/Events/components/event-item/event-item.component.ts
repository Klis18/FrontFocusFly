import { Component, input, output } from '@angular/core';
import { Event } from '../../interfaces/event.interface';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'event-item',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './event-item.component.html',
  styles: ``
})
export class EventItemComponent {
  
  eventItem = input<Event>();
  changeInItem = output<string>();

  constructor(private alertService  : AlertsService,
              private dialog        : MatDialog,
              private eventsService : EventsService){};
  
  sendMessageReloadPage(){
    this.changeInItem.emit('reloadPage');
  }

  deleteEvent(id: number) {
    this.eventsService.deleteEvent(id).pipe(
      tap(() => {
        this.sendMessageReloadPage();
        this.alertService.sendOkMessage('Evento eliminado con éxito');
      }),
      catchError( err => {
        this.alertService.sendErrorMessage('Lo sentimos, no se puedo eliminar el evento');
        console.error('Delete Event Error', err);
        return of(null)
      })
    ).subscribe();
  }

  openEditEventModal() {
    const dialogRef = this.dialog.open(EventFormComponent,{
      data:{
        action: 'edit',
        eventData: this.eventItem()
      },
      width:'50%'
    });

    dialogRef.afterClosed().pipe(
      tap(() => {this.sendMessageReloadPage();}),
      catchError( err => {
        this.alertService.sendErrorMessage('Lo sentimos, hubo un error al recargar la página');
        console.error('Edit Modal Close Error', err);
        return of(null)
      })
    ).subscribe();
  }

}
