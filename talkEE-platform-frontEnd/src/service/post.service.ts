import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.BACKEND_API_P}/posts`;
  private baseUrlForUsersGet = `${environment.BACKEND_API_AUTH}/users`;

  constructor(private http: HttpClient) {}

  // Get all posts
  getAllPosts(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get(`${this.baseUrl}`, { headers });
  }
  getAllUsers(): any {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get(`${this.baseUrlForUsersGet}`, { headers }).toPromise(); // Convert Observable to Promise
  }
  // getUserPosts(): Observable<any> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
  //   return this.http.get(`${this.baseUrl}/user`, { headers }); 
  // }
  getUserDetails(userId: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get(`${environment.BACKEND_API_P}/users/${userId}`, { headers });
}
  // Create a new post
  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.post(`${this.baseUrl}`, postData, { headers });
  }
  getUserPosts(userId: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get(`${this.baseUrl}/user/${userId}`, { headers }); 
}

  // Update an existing post
  updatePost(postId: string, postData: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.put(`${this.baseUrl}/${postId}`, postData, { headers });
  }

  // Delete a post
  deletePost(postId: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.delete(`${this.baseUrl}/${postId}`, { headers });
  }

  private getToken(): string {
    const name = 'jwt=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }
  addComment(postId: string, commentData: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.post(`${this.baseUrl}/${postId}/comments`, commentData, { headers });
  }
  getDecodedToken() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }
}
