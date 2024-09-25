import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/login']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
