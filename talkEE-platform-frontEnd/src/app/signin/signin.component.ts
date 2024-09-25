import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  MatIconModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  constructor(private router: Router) { }

  eyeOn:string="assets/icons/login/eye-on.svg";
  eyeOff:string="assets/icons/login/eye-off.svg";
  password: string = '';
  hidePassword: boolean = true;
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
