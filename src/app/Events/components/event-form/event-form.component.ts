import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../services/events.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { formatDateOnly } from '../../../utils/format-date';
import { CreateEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-form',
  imports: [
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogContent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-form.component.html',
  styles: ``
})
export class EventFormComponent {

  public eventForm !: FormGroup;
  public dayToday: Date = new Date(Date.now());
  data = inject(MAT_DIALOG_DATA);
  public title : string = (this.data.action == 'add') ? 'Agregar Evento' : 'Editar Evento';

  constructor(private alertService: AlertsService,
              private eventsService: EventsService,
              private fb: FormBuilder,
              private dialogRef: DialogRef<EventFormComponent>)
  {
    this.eventForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha:[this.dayToday, Validators.required],
      hora: ['00:00:00', Validators.required]
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  addEvent(event: CreateEvent){
    this.eventsService.createEvents(event).subscribe({
      next: (response) => {
        this.alertService.sendOkMessage('Evento creado con éxito')
        this.closeModal();
      }
    })
  }

  updateEvent(){}

  onSubmit(){
    if(!this.eventForm.valid) return;

    const {fecha} = this.eventForm.value;
    const event = {
      ...this.eventForm.value,
      fecha: formatDateOnly(fecha)
    };

    (this.data.action == 'add') ? this.addEvent(event) : this.updateEvent();
  }
}
