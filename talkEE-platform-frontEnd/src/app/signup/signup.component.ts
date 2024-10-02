import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  eyeOn:string="assets/icons/login/eye-on.svg";
  eyeOff:string="assets/icons/login/eye-off.svg";

  password: string = '';
  hidePassword: boolean = true;
  user = { username: '', password: '',email:''};

  constructor(private router: Router,private authService: AuthService) { }

  navigateToRegister() {
    this.router.navigate(['/login']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  signUp() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      alert('Please fill in all fields');
      return;
    }
    this.authService.signUp(this.user).subscribe(
      (response) => {
        console.log('Sign-up successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Sign-up error', error);
      }
    );
  }
}
