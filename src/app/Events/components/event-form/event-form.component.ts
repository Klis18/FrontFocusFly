import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../services/events.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { formatDateOnly, formatDateUTC } from '../../../utils/format-date';
import { CreateEvent, Event } from '../../interfaces/event.interface';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

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
export class EventFormComponent implements OnInit{

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
      titulo     : ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha      : [this.dayToday, Validators.required],
      hora       : ['00:00:00', Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.getEventData();
  }

  closeModal(){
    this.dialogRef.close();
  }

  getEventData(){
    const {titulo, descripcion, fecha, hora} = this.data.eventData;
    const eventData = {
      titulo,
      descripcion,
      fecha: formatDateUTC(fecha),
      hora
    }; 
    this.eventForm.setValue(eventData);
  }

  addEvent(event: CreateEvent){
    this.eventsService.createEvents(event).pipe(
      tap(()=>{
        this.alertService.sendOkMessage('Evento creado con éxito');
        this.closeModal();
      }),
      catchError(err =>{
        this.alertService.sendErrorMessage('Lo sentimos,no se pudo crear el evento, intente mas tarde');
        console.error('Create Event error', err);
        return of(null);
      })
    ).subscribe();
  }

  updateEvent(event: CreateEvent){
    const updateEvent = {
      ...event,
      eventoId: this.data.eventData.id
    };
    this.eventsService.updateEvent(updateEvent).pipe(
      tap(() =>{
        this.alertService.sendOkMessage('Evento actualizado con éxito');
        this.closeModal();
      }),
      catchError(err => {
        this.alertService.sendErrorMessage('Lo sentimos, no se pudo actualizar el evento, intente mas tarde');
        console.error('Update Event error', err);
        return of(null);
      })    
    ).subscribe();
  }

  onSubmit(){
    if(!this.eventForm.valid) return;

    const {fecha} = this.eventForm.value;
    const event = {
      ...this.eventForm.value,
      fecha: formatDateOnly(fecha)
    };

    (this.data.action == 'add') ? this.addEvent(event) : this.updateEvent(event);
  }
}
