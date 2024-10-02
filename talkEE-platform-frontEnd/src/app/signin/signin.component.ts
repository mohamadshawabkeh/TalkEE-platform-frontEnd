import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

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
  user = { username: '', password: ''};
  eyeOn:string="assets/icons/login/eye-on.svg";
  eyeOff:string="assets/icons/login/eye-off.svg";
  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router,private authService: AuthService) { }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
signIn() {
  console.log("entered sign in");

  if (!this.user.username || !this.user.password) {
    alert('Please fill in all fields');
    return;
  }

  console.log("user ->", this.user);

  this.authService.signIn(this.user.username, this.user.password).subscribe(
    (response) => {
      console.log("response in signin ->", response);
      this.router.navigate(['/home']); 
    },
    (error) => {
      console.error('Sign-in error', error);
      alert('Sign-in failed: ' + error.error.error); 
    }
  );
}

}
