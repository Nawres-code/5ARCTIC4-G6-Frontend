import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  forgotPasswordForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.'
    }
  };

  onSubmitForgotPassword(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {

      const email = this.forgotPasswordForm.value.email;
      this.authService.forgotPassword(email).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Reset successful',
            text: 'Check your email for further instructions.'
          });
          // Optionally, you can navigate to another page after success
           //this.router.navigate(['/reset-password']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Password reset failed',
            text: 'There was an error during password reset. Please try again.'
          });
        }
      );

      // Reset form and submission state
      this.forgotPasswordForm.reset();
      this.submitted = false;
    } else {
      console.log('Form is not valid');
    }
  }
}