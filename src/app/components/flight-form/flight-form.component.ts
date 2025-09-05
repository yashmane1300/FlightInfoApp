import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { AuthService } from '../../services/auth.service';
import { FlightInfoPayload } from '../../models/interfaces';

@Component({
  selector: 'app-flight-form',
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h2 style="color: #333;">Flight Information Form</h2>
          <button class="btn" (click)="logout()" style="background: #dc3545; margin-left: 30px;">Logout</button>
        </div>
        
        <form [formGroup]="flightForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="airline">Airline *</label>
            <input 
              type="text" 
              id="airline" 
              formControlName="airline" 
              class="form-control" 
              placeholder="e.g., American Airlines">
          </div>
          
          <div class="form-group">
            <label for="flightNumber">Flight Number *</label>
            <input 
              type="text" 
              id="flightNumber" 
              formControlName="flightNumber" 
              class="form-control" 
              placeholder="e.g., AA123">
          </div>
          
          <div class="form-group">
            <label for="arrivalDate">Arrival Date *</label>
            <input 
              type="date" 
              id="arrivalDate" 
              formControlName="arrivalDate" 
              class="form-control">
          </div>
          
          <div class="form-group">
            <label for="arrivalTime">Arrival Time *</label>
            <input 
              type="time" 
              id="arrivalTime" 
              formControlName="arrivalTime" 
              class="form-control">
          </div>
          
          <div class="form-group">
            <label for="numOfGuests">Number of Guests *</label>
            <input 
              type="number" 
              id="numOfGuests" 
              formControlName="numOfGuests" 
              class="form-control" 
              min="1" 
              placeholder="Enter number of guests">
          </div>
          
          <div class="form-group">
            <label for="comments">Comments (Optional)</label>
            <textarea 
              id="comments" 
              formControlName="comments" 
              class="form-control" 
              rows="3" 
              placeholder="Any additional comments..."></textarea>
          </div>
          
          <div *ngIf="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>
          
          <div *ngIf="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
          
          <button 
            type="submit" 
            class="btn" 
            [disabled]="flightForm.invalid || isLoading">
            <span *ngIf="isLoading" class="loading"></span>
            {{ isLoading ? 'Submitting...' : 'Submit Flight Information' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private authService: AuthService
  ) {
    this.flightForm = this.fb.group({
      airline: ['', Validators.required],
      flightNumber: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      numOfGuests: ['', [Validators.required, Validators.min(1)]],
      comments: ['']
    });
  }

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.getIsAuthenticated()) {
      // Redirect to login if not authenticated
      window.location.href = '/';
    }
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.flightForm.value;
      
      // Format the date and time properly
      const payload: FlightInfoPayload = {
        airline: formValue.airline,
        flightNumber: formValue.flightNumber,
        arrivalDate: formValue.arrivalDate,
        arrivalTime: formValue.arrivalTime,
        numOfGuests: parseInt(formValue.numOfGuests),
        comments: formValue.comments || undefined
      };

      this.flightService.submitFlightInfo(payload).subscribe({
        next: (response) => {
          this.successMessage = 'Flight information submitted successfully!';
          this.isLoading = false;
          this.flightForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to submit flight information. Please try again.';
          this.isLoading = false;
          console.error('Error submitting flight info:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }
}
