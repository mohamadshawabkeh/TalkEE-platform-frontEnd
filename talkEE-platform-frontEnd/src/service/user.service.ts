import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserDetails(currentUserId: string) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  getUsername(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    
    if (token) {
      const decodedToken: any = jwtDecode(token.split('=')[1]);
      return decodedToken.username; 
    }
    return null;
  }
  getUserId(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (token) {
      const decodedToken: any = jwtDecode(token.split('=')[1]);
      console.log("decodedToken->",decodedToken)
      return decodedToken._id; 
    }
    return null;
  }

  
  isAdmin(): boolean {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    
    if (token) {
      const decodedToken: any = jwtDecode(token.split('=')[1]);
    //   console.log("decodedToken.role ->",decodedToken.role)
      return decodedToken.role === 'admin'; 
    }
    return false;
  }
}
