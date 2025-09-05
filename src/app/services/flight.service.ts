import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightInfoPayload } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly API_URL = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';
  private readonly TOKEN = 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh';
  private readonly CANDIDATE_NAME = 'Yash Mane'; // Replace with your name

  constructor(private http: HttpClient) {}

  submitFlightInfo(payload: FlightInfoPayload): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.TOKEN,
      'candidate': this.CANDIDATE_NAME
    });

    return this.http.post(this.API_URL, payload, { headers });
  }
}
