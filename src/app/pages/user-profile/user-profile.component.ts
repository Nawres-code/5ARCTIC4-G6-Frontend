import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Poste } from 'src/app/Model/poste';
import { PosteServiceService } from 'src/app/Service/poste-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Add: FormGroup;
  poste: Poste = new Poste();

  constructor(private posteServiceService: PosteServiceService, private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
    // Initialize current date
    const currentDate = new Date().toISOString().substring(0, 10);

    this.Add = new FormGroup({
      title: new FormControl('', [Validators.required, this.forbiddenWordsValidator(["chbinou", "yosser", "test","ok"])]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(currentDate, [Validators.required]), 
     // userName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.Add.valid) {
      this.poste.title = this.Add.get('title').value;
      this.poste.description = this.Add.get('description').value;
      this.poste.date = this.Add.get('date').value;
      //this.poste.userName = this.Add.get('userName').value;
      this.posteServiceService.save(this.poste).subscribe(
        (response) => {
          console.log('New subscription added:', response);
          this.toastr.success('Post added successfully!', 'Success');
          this.Add.reset();
          this.router.navigate(['/tables']);
        },
        (error) => {
          console.error('Error adding subscription:', error);
          this.toastr.error('Failed to add post!', 'Error');
        }
      );
    } else {
      this.markFormGroupTouched(this.Add);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  forbiddenWordsValidator(words: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = words.some(word => new RegExp('\\b' + word + '\\b', 'i').test(control.value));
      return forbidden ? {'forbiddenWords': {value: control.value}} : null;
    };
  }
}
