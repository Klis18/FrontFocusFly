import { Component, input, output } from '@angular/core';
import { Event } from '../../interfaces/event.interface';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

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
  
  sendMessageReloadPage(){
    this.changeInItem.emit('reloadPage');
  }

  deleteEvent(arg0: number) {
  throw new Error('Method not implemented.');
  }
  openEditEventModal() {
  throw new Error('Method not implemented.');
  }
}
