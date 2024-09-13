import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  user: any = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.islogin = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
