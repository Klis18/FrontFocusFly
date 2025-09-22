import { Component, input, output } from '@angular/core';
import { Event } from '../../interfaces/event.interface';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';

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
    this.eventsService.deleteEvent(id).subscribe({
      next: (response) => {
        this.sendMessageReloadPage();
        this.alertService.sendOkMessage('Evento eliminado con éxito');
      },
      error: (e) => {
        this.alertService.sendErrorMessage('Lo sentimos, no se pudo eliminar el evento');
      }
    });
  }

  openEditEventModal() {
    const dialogRef = this.dialog.open(EventFormComponent,{
      data:{
        action: 'edit',
        eventData: this.eventItem()
      },
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(
      (res) => this.sendMessageReloadPage()
    );
  }

}
