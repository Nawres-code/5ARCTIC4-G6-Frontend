import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/Model/Reclamation';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';

@Component({
  selector: 'app-reclam-user',
  templateUrl: './reclam-user.component.html',
  styleUrls: ['./reclam-user.component.scss']
})
export class ReclamUserComponent implements OnInit {
  reclamationForm: FormGroup;
  decodedToken: any;

  constructor(
    private formBuilder: FormBuilder, 
    private reclamationService: ReclamationUserAdmin, 
    private jwtDecodeService: JwtDecodeService, 
    private toastr: ToastrService, 
    private router: Router 
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }

    this.reclamationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(30)]], // Max length set to 30 characters
      content: ['', [Validators.required, Validators.maxLength(70)]], // Max length set to 70 characters
    });
  }

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const reclamation: Reclamation = {
        title: this.reclamationForm.value.title,
        content: this.reclamationForm.value.content,
        userName: this.decodedToken.fullName,
        email: this.decodedToken.sub
      };
  
      this.reclamationService.addreclamation(reclamation).subscribe(
        (response) => {
          this.toastr.success('Reclamation added successfully', 'Success');
          console.log('Reclamation added:', response);
          this.reclamationForm.reset();
          this.router.navigateByUrl('/reclamationListUser');
        },
        (error) => {
          console.error('Error adding reclamation:', error);
        }
      );
    } else {
      // Check each form control's errors and display specific error messages
      if (this.reclamationForm.get('title').errors?.required && this.reclamationForm.get('content').errors?.required) {
        this.toastr.error('Title and content are required', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      } else if (this.reclamationForm.get('title').errors?.required ) {
        this.toastr.error('Title is required', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      } else if (this.reclamationForm.get('title').errors?.maxlength) {
        this.toastr.error('Title should be less than 30 characters', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      } else if (this.reclamationForm.get('content').errors?.required) {
        this.toastr.error('Content is required', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      } else if (this.reclamationForm.get('content').errors?.maxlength) {
        this.toastr.error('Content should be less than 70 characters', 'Error', { closeButton: true, timeOut: 3000, progressBar: true, progressAnimation: 'increasing', tapToDismiss: false, toastClass: 'ngx-toastr error-toast' });
      }
      
      // Mark all form fields as touched to display validation errors
      this.markFormGroupTouched(this.reclamationForm);
    }
  }
  
  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
