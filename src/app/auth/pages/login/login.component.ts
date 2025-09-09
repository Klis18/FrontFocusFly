import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router:Router){
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  login(){
    if(!this.loginForm.valid) return;

    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log('Respuesta', res);
        this.saveToken(res.token);
        this.router.navigateByUrl('user/dashboard');
      },
      
    );
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }
}
