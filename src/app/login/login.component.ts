import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  loginError = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const success = this.authService.login(this.loginData.username, this.loginData.password);
    if (!success) {
      this.loginError = true;
    }
  }
}
