import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));

    if (token) {
      const decodedToken: any = jwtDecode(token.split('=')[1]);
      const isExpired = decodedToken.exp < Date.now() / 1000;

      if (!isExpired) {
        return true; 
      }
    }
    this.router.navigate(['/login']);
    return false; 
  }
}
