import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginCredentials } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Simple hardcoded credentials for demo purposes
  private readonly VALID_CREDENTIALS = {
    username: 'admin',
    password: 'password123'
  };

  constructor() {
    // Check if user is already authenticated (from localStorage)
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuth);
  }

  login(credentials: LoginCredentials): boolean {
    if (credentials.username === this.VALID_CREDENTIALS.username && 
        credentials.password === this.VALID_CREDENTIALS.password) {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
