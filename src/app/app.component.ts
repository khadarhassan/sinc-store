import { Component, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { SessionStorageService } from './session-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sinc-store';

  constructor(private sessionStorageService: SessionStorageService) {}

  isLoggedIn() {
    return this.sessionStorageService.getSession();
  }
}
