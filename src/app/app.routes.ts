import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PostdetailsPageComponent } from './pages/postdetails-page/postdetails-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/nonauth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home',
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home',
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: LoginPageComponent,
    title: 'Login',
    canActivate: [NonAuthGuard],
  },
  {
    path: 'sign-up',
    component: RegisterPageComponent,
    title: 'Register',
    canActivate: [NonAuthGuard],
  },
  {
    path: 'post/:id',
    component: PostdetailsPageComponent,
    title: 'Post Details',
    canActivate: [AuthGuard],
  },
];
