import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BACKEND_API_AUTH;

  constructor(private http: HttpClient, private router: Router) {}

  // Sign-up method
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Sign-in method with Basic Authentication
  signIn(username: string, password: string): Observable<any> {
    console.log("entered sign in in auth side");

    // Encode username and password to Base64
    const encodedCredentials = btoa(`${username}:${password}`);

    // Set the Authorization header with the encoded credentials
    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });

    return this.http.post(`${this.apiUrl}/signin`, {}, { headers }).pipe(
      tap((response: any) => {
        // Set the JWT token in cookies
        // console.log("response->",response)
        localStorage.setItem('currentUserId', response.user._id);
        this.setToken(response.token);
        const decodedToken: any = jwtDecode(response.token);
        
        // Store the user ID or any other claims you need
        localStorage.setItem('currentUserId', decodedToken._id); // Store user ID
        localStorage.setItem('userRole', decodedToken.role);
      })
    );
  }

  // Store the JWT token in cookies
  setToken(token: string) {
    document.cookie = `jwt=${token}; path=/;`;
  }

  // Retrieve the JWT token from cookies
  getToken(): string | null {
    const name = 'jwt=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  // Remove the JWT token from cookies
  removeToken() {
    document.cookie = `jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }

  // Check if the user is authenticated by checking the JWT token
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Logout the user and clear the token
  logout() {
    this.removeToken();
    this.router.navigate(['/signin']);
  }
}
