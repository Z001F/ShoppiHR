import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navb',
  templateUrl: './navb.component.html',
  styleUrls: ['./navb.component.scss'],
})
export class NavbComponent {
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
