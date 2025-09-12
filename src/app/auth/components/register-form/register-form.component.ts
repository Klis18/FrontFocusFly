import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FieldValidatorsMessageComponent } from "../../../shared/components/field-validators-message/field-validators-message.component";
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'auth-register-form',
  imports: [
    ReactiveFormsModule,
    FieldValidatorsMessageComponent
],
  templateUrl: './register-form.component.html',
  styles: ``
})
export class RegisterFormComponent {
  public registerForm!: FormGroup;
  formUtils = FormUtils;

  constructor(private authService : AuthService, 
              private fb          : FormBuilder, 
              private router      : Router) 
  {
    this.registerForm = this.fb.group({
      nombre  : ['', Validators.required],
      email   : ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    },
    {
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'confirmpassword')],
    }
  )
  }

  registerUser() {
    if (!this.registerForm.valid) return;

    this.authService.registerUser(this.registerForm.value).subscribe(
      res => {
        this.router.navigateByUrl('auth')
      }
    );
  }
}
