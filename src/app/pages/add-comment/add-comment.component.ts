import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from 'src/app/Model/comments';
import { Poste } from 'src/app/Model/poste';
import { CommentsService } from 'src/app/Service/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'] 
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comments = new Comments();
  id: number = null;
  

  constructor(private commentsService: CommentsService, private route: ActivatedRoute , private router: Router,) { }

  ngOnInit() {
    // Initialize current date
    const currentDate = new Date().toISOString().substring(0, 10);

    this.commentForm = new FormGroup({
      content: new FormControl('', [Validators.required, this.forbiddenWordsValidator(["yosser", "chbinou"])]),
      description: new FormControl('', [Validators.required , this.forbiddenWordsValidator(["yosser", "chbinou"])]),
      datePub: new FormControl(currentDate, [Validators.required]), 
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        console.log('ID passed in route parameters:', this.id);
        // Use the ID as needed in your component logic
      } else {
        console.log('No ID passed in route parameters');
        // Handle the case when no ID is present
      }
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.comment.content = this.commentForm.get('content').value;
      this.comment.description = this.commentForm.get('description').value;
      this.comment.datePub = this.commentForm.get('datePub').value;
      if (this.id != null) {
        // Create a Poste object with the required properties, including the user property
        const poste: Poste = {
          idPoste: this.id,
          title: '', // Provide appropriate values for these properties
          description: '',
          date: new Date(),
          userName: '',
          comments: [], // Initialize an empty array for comments
          user: null // Initialize user property with null or provide user details
        };
        this.comment.poste = poste; // Assign the Poste object to the comment
      }
      this.commentsService.save(this.comment).subscribe(
        (response) => {
          console.log('New comment added:', response);
          this.commentForm.reset();
          setTimeout(() => {
            this.router.navigate(['/comments']);
          });},
        (error) => {
          console.error('Error adding comment:', error);
        }
       ) ;
    } else {
      this.markFormGroupTouched(this.commentForm);
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
