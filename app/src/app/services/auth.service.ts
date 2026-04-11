import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginData, signupData } from '../models/auth-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private TOKEN_KEY = 'jwtToken';
  private apiUrl = 'http://localhost:3000/api'; //for development purpose
  // private apiUrl = `https://twitterapi-6tp6.onrender.com/api`; //the same url used for development is been deployed

  // OPTIONAL
  // Angular already sets Content-Type: application/json automatically
  attachHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  signUp(data: signupData): Observable<Object> {
    return this.http.post<Object>(`${this.apiUrl}/signup`, data, {
      headers: this.attachHeaders,
    });
  }

  login(data: loginData) {
    return this.http.post(`${this.apiUrl}` + `/login`, data);
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token); // Use sessionStorage instead of localStorage
  }

  getToken(): string | null {
    // return sessionStorage.getItem(this.TOKEN_KEY); // Use sessionStorage instead of localStorage
    let token = sessionStorage.getItem(this.TOKEN_KEY)?.replace(/^"|"$/g, '');
    return token ?? null; // if undefined, return null
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY); // Use sessionStorage instead of localStorage
  }
}

// When DO you need to add headers manually?

// Only in these cases:

// Sending Authorization token

// Sending custom headers

// Sending non-JSON data (form-data, files, etc.)
