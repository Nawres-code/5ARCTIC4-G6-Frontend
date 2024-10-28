import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  firstname: string = ''; // Define firstName property
  lastname: string = ''; // Define lastName property
  email: string = ''; // Define email property
  password: string = ''; // Define password property

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}
  

  // Define the register method
  register(registerForm: NgForm) {
    const user = { 
      firstname: this.firstname, // Corrected key
      lastname: this.lastname,   // Corrected key
      email: this.email,
      password: this.password
    };
  
    // Call the register method from AuthService
    this.authService.register(user).subscribe( response => {
        // Handle successful registration
        
        // Show success notification using Swal
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          timer: 2000, // Close alert after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false
        });
        this.router.navigate(['/login']).then(
          () => console.log('Navigation to /login successful'),
          error => console.error('Navigation to /login failed:', error)
        );

  
        // You can also navigate to another page upon successful registration if needed
      },
      error => {
        // Handle registration error
        console.error('Registration failed:', error);
  
        // Show error notification using Swal
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'An error occurred while registering. Please try again later.',
          showConfirmButton: true
        });
      }
    );
  
    // Reset the form after submission
    registerForm.reset();
  }
}