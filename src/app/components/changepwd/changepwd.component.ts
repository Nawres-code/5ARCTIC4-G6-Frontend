import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  resetPasswordForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitResetPassword(): void {
    this.submitted = true;

    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      const newPassword = this.resetPasswordForm.value.newPassword;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword;


      console.log(email)
      console.log(newPassword)
      console.log(confirmPassword)

      if (newPassword !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match.', 'error');
        return;
      }

      this.authService.resetPassword(email, newPassword, confirmPassword).subscribe(
        () => {
          Swal.fire('Success', 'Password changed successfully!', 'success');
          this.resetPasswordForm.reset();
          this.submitted = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          Swal.fire('Error', 'Failed to change password. Please try again.', 'error');
        }
      );
    }else{
      console.log("envalid data ")
    }
  }
}