import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {

  role: 'admin' | 'patient' = 'patient';
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Enter email & password');
      return;
    }

    this.auth.login(this.role, this.email);
    console.log('Logged in as:', localStorage.getItem('email'));
    this.router.navigate(['/appointments']);
  }
}