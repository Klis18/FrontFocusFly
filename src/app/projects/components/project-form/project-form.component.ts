import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomersService } from '../../../customers/services/customers.service';
import { Customer, CustomerFilters} from '../../../customers/interfaces/customers.interface';
import { ProjectsService } from '../../services/projects.service';
import { AlertsService } from '../../../shared/services/alerts.service';
import { formatDateOnly } from '../../../utils/format-date';
import { CreateProject } from '../../interfaces/project.interface';

@Component({
  selector: 'app-project-form',
  imports: [
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogContent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './project-form.component.html',
  styles: ``
})
export class ProjectFormComponent {

  public projectForm    !: FormGroup;
  public dateToday       : Date = new Date(Date.now());
  public customerList   !: Customer[];
  public customerFilter  : CustomerFilters = {
    nombre: '',
    page: 1,
    pageSize: 5
  };
  data = inject(MAT_DIALOG_DATA);
  public titleForm : string = (this.data.action == 'add') ? 'Agregar Proyecto' : 'Editar Proyecto';
  
  constructor(private fb              : FormBuilder, 
              private alertService    : AlertsService,
              private customerServices: CustomersService,
              private projectServices : ProjectsService,
              private dialogRef       : MatDialogRef<ProjectFormComponent>){
    this.projectForm = this.fb.group({
      nombreProyecto : [''],
      clienteId : [0],
      estadoId : [5],
      fechaInicioProyecto : [this.dateToday],
      fechaFinProyecto : [this.dateToday]
    });

    this.customerServices.getCustomers(this.customerFilter).subscribe({
      next: (response) =>{
        this.customerList = response.clientes;
        console.log('CustomerList', this.customerList);
      }
    });
  }

  closeModal(){
    this.dialogRef.close();
  };

  onSubmit(){
    const {fechaInicioProyecto, fechaFinProyecto} = this.projectForm.value;
    const projectData = {
      ...this.projectForm.value,
      fechaInicioProyecto: formatDateOnly(fechaInicioProyecto),
      fechaFinProyecto: formatDateOnly(fechaFinProyecto)
    };
    (this.data.action == 'add') ? this.addProject(projectData) : this.updateProject();
  };

  addProject(project: CreateProject){
    if(!this.projectForm.valid) return;
    this.projectServices.createProject(project).subscribe(
      {
        next: (response) =>{
          this.alertService.sendOkMessage('Projecto guardado con éxito')
        },
        error: (err) =>{
          this.alertService.sendErrorMessage(err);
        }
      }
    );
  }

  updateProject(){

  }

}
