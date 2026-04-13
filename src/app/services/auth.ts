import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {

  login(role: 'admin' | 'patient', email: string) {
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
  }

  getRole(): 'admin' | 'patient' {
    return (localStorage.getItem('role') as any) || 'patient';
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }

  isAdmin() {
    return this.getRole() === 'admin';
  }

  logout() {
    localStorage.clear();
  }
}