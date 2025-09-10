import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'auth-login-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styles: ``
})
export class LoginFormComponent {
  public loginForm!: FormGroup;

  constructor(private authService: AuthService, 
              private fb         : FormBuilder, 
              private router     :Router)
  {
    this.loginForm = this.fb.group({
      email    : ['', Validators.required],
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
