import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  routes = routes;

  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
