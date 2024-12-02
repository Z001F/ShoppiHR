import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ManagmentServiceService, User } from './management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserEmail: string | null = null;
  private currentUserRole: 'admin' | 'user' = 'user';

  constructor(
    private router: Router,
    private managementService: ManagmentServiceService
  ) {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(loggedIn);
    
    if (loggedIn) {
      this.currentUserRole = localStorage.getItem('userRole') as 'admin' | 'user' || 'user';
      this.currentUserEmail = localStorage.getItem('currentUserEmail');
    } else {
      this.router.navigate(['/login']);
    }
  }

  login(username: string, password: string): boolean {
    const users = this.managementService.getUsers();
    const user = users.find(u => 
      u.email === username && 
      u.password === password && 
      !u.deleted
    );

    if (user) {
      this.isLoggedInSubject.next(true);
      this.currentUserRole = user.role;
      this.currentUserEmail = user.email;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', user.email);
      localStorage.setItem('userRole', user.role);
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('userRole');
    this.currentUserEmail = null;
    this.currentUserRole = 'user';
    this.router.navigate(['/login']);
  }

  getCurrentUserEmail(): string | null {
    if (!this.currentUserEmail) {
      this.currentUserEmail = localStorage.getItem('currentUserEmail');
    }
    return this.currentUserEmail;
  }

  getCurrentUserRole(): 'admin' | 'user' {
    if (this.currentUserRole === 'user') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'admin') {
        this.currentUserRole = 'admin';
      }
    }
    return this.currentUserRole;
  }
} 