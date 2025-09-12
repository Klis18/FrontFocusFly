import { Component } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [MatIconModule, RegisterFormComponent],
  templateUrl: './register.component.html',
  styles: ``
})
export default class RegisterComponent {

}
