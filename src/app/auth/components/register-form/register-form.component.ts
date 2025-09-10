import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'auth-register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styles: ``
})
export class RegisterFormComponent {
  public registerForm!: FormGroup;

  constructor(private authService : AuthService, 
              private fb          : FormBuilder, 
              private router      : Router) 
  {
    this.registerForm = this.fb.group({
      nombre  : ['', Validators.required],
      email   : ['', Validators.required],
      password: ['', Validators.required]
    })
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
