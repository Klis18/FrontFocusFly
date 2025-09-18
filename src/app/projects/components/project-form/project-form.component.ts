import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  imports: [],
  templateUrl: './project-form.component.html',
  styles: ``
})
export class ProjectFormComponent {

  public projectForm !: FormGroup;
  public dateToday       : Date = new Date(Date.now());


  constructor(private fb: FormBuilder){
    this.projectForm = this.fb.group({
      nombreProyecto : [''],
      clienteId : [''],
      estadoId : [''],
      fechaInicioProyecto : [this.dateToday],
      fechaFinProyecto : [this.dateToday]
    });
  }

}
