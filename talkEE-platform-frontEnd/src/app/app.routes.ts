import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: SigninComponent },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
    { path: 'toProfile', component: ProfileUserComponent, canActivate: [AuthGuard] },
];