import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { formatDateOnly, formatDateUTC } from '../../../utils/format-date';
import { CreateProject, UpdateProject } from '../../interfaces/project.interface';

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
              private dialogRef       : MatDialogRef<ProjectFormComponent>)
  {
    this.projectForm = this.fb.group({
      nombreProyecto      : ['', Validators.required],
      clienteId           : [0, Validators.required],
      estadoId            : [5],
      fechaInicioProyecto : [this.dateToday],
      fechaFinProyecto    : [this.dateToday]
    });

    this.getCustomerList();
    (this.data.action != 'add')? this.getProjectData() : '';
   
  }

  getCustomerList(){
     this.customerServices.getCustomers(this.customerFilter).subscribe({
      next: (response) =>{
        this.customerList = response.clientes;
      }
    });
  }

  getProjectData(){
    this.projectServices.getProjectById(this.data.projectId).subscribe({
      next:(response) => {
        const {fechaInicioProyecto, fechaFinProyecto} = response;
        const projectData = {
          ...response,
          fechaInicioProyecto : formatDateUTC(fechaInicioProyecto),
          fechaFinProyecto    : formatDateUTC(fechaFinProyecto)
        }
        this.projectForm.setValue(projectData);
      }
    })
  }

  closeModal(){
    this.dialogRef.close();
  };

  
  addProject(project: CreateProject){
    if(!this.projectForm.valid) return;
    this.projectServices.createProject(project).subscribe(
      {
        next: (response) =>{
          this.alertService.sendOkMessage('Proyecto agregado con éxito')
        },
        error: (err) =>{
          this.alertService.sendErrorMessage(err);
        }
      }
    );
  }
  
  updateProject(project: CreateProject){
    if(!this.projectForm.valid) return;
    const updateProjectData: UpdateProject = {
      ...project,
      proyectoId : this.data.projectId
    }
    this.projectServices.updateProject(updateProjectData).subscribe({
      next: (response) =>{
        this.alertService.sendOkMessage('Proyecto actualizado con éxito');
      },
      error: (err) =>{
        this.alertService.sendErrorMessage(err);
      }
    });
  }
  
  onSubmit(){
    const {fechaInicioProyecto, fechaFinProyecto} = this.projectForm.value;
    const projectData = {
      ...this.projectForm.value,
      fechaInicioProyecto : formatDateOnly(fechaInicioProyecto),
      fechaFinProyecto    : formatDateOnly(fechaFinProyecto)
    };
    (this.data.action == 'add') ? this.addProject(projectData) : this.updateProject(projectData);
  };

}
