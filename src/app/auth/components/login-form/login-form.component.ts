import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FieldValidatorsMessageComponent } from "../../../shared/components/field-validators-message/field-validators-message.component";
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'auth-login-form',
  imports: [
    ReactiveFormsModule,
    FieldValidatorsMessageComponent
],
  templateUrl: './login-form.component.html',
  styles: ``
})
export class LoginFormComponent {
  public loginForm!: FormGroup;
  formUtils = FormUtils;

  constructor(private authService: AuthService, 
              private fb         : FormBuilder, 
              private router     :Router,
             )
  {
    this.loginForm = this.fb.group({
      email    : ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
      password : ['', Validators.required]
    })
  }

  login(){
    if(!this.loginForm.valid) return;
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        this.router.navigateByUrl('user/dashboard');
      },      
    );
  }

}
