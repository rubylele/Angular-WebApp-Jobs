import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, Roles } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  roles = Object.values(Roles);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    loginRole: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    const { email, password, loginRole } = this.loginForm.value;
    this.authService.login(email, password, loginRole);
  }
}
