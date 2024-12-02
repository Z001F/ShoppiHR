import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Development credentials - REMOVE IN PRODUCTION!
  private readonly DEV_USERNAME = 'admin';
  private readonly DEV_PASSWORD = 'admin';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    // Check if user was previously logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(loggedIn);
    
    // If not logged in, redirect to login page
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
  }

  login(username: string, password: string): boolean {
    // Development login check - REPLACE WITH REAL AUTH IN PRODUCTION!
    // Current credentials: username: 'admin', password: 'admin'
    if (username === this.DEV_USERNAME && password === this.DEV_PASSWORD) {
      this.isLoggedInSubject.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
} 