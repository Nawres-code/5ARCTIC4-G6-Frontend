import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  formError: string = ''; // Define formError property to store validation error message

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  login(loginForm: NgForm) {
    // Reset previous error message
    this.formError = '';

    // Check if the form is valid
    if (loginForm.valid) {
      const user = { email: this.email, password: this.password };

      this.authService.login(user).subscribe(
        response => {
          const token = response.token;
          this.authService.setToken(token);

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          console.error('Login failed:', error);

          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'An error occurred while logging in. Please try again later.',
            showConfirmButton: true
          });
        }
      );

      // Reset the form after submission
      loginForm.reset();
    } else {
      // Display a single error message if both email and password are required
      if (!this.email.trim() && !this.password.trim()) {
        this.formError = 'Email and Password are required.';
      } else {
        // Otherwise, check for individual validation errors
        if (!this.email.trim()) {
          this.formError = 'Email is required.';
        }
        if (!this.password.trim()) {
          this.formError = 'Password is required.';
        }
      }
    }
  }
}
