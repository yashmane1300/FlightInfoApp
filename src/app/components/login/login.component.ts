import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/interfaces';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="card">
        <h2 style="text-align: center; margin-bottom: 30px; color: #333;">Flight Info App</h2>
        <h3 style="text-align: center; margin-bottom: 30px; color: #666;">Please Login</h3>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              class="form-control" 
              placeholder="Enter username">
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="form-control" 
              placeholder="Enter password">
          </div>
          
          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>
          
          <button 
            type="submit" 
            class="btn" 
            [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="isLoading" class="loading"></span>
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
          <p><strong>Demo Credentials:</strong></p>
          <p>Username: admin</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const credentials: LoginCredentials = this.loginForm.value;
      
      if (this.authService.login(credentials)) {
        // Login successful - the auth guard will handle navigation
        this.isLoading = false;
      } else {
        this.errorMessage = 'Invalid username or password';
        this.isLoading = false;
      }
    }
  }
}
