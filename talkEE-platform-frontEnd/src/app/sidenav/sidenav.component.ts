import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  username: string | null;

  constructor(private router: Router,private userService: UserService,private authService: AuthService) {
    this.username = this.userService.getUsername();
   }
  @Output() profileClicked = new EventEmitter<void>();

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
  navigateToAdminPanel() {
    this.router.navigate(['/admin']);
  }
  routeToHome(){
    this.router.navigate(['/home']);
    // this.profileClicked.emit();
  }
  routeToProfile() {
    this.router.navigate(['/toProfile']);
    // this.profileClicked.emit();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
