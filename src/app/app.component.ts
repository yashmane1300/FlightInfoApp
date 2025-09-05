import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!(isAuthenticated$ | async)">
      <app-login></app-login>
    </div>
    <div *ngIf="isAuthenticated$ | async">
      <app-flight-form></app-flight-form>
    </div>
  `,
  styles: []
})
export class AppComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}
}
