import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authServie: AuthService, private router: Router) {}

  login() {
    this.authServie
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          this.authServie.setUser(response);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log('Error creating post:', err);
          this.error = err.error.message;
        }
      );
  }
}
