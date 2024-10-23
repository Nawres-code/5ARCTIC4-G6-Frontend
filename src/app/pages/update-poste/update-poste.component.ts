import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poste } from 'src/app/Model/poste';
import { PosteServiceService } from 'src/app/Service/poste-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-poste',
  templateUrl: './update-poste.component.html',
  styleUrls: ['./update-poste.component.scss']
})
export class UpdatePosteComponent implements OnInit {
  poste: Poste = new Poste();
  postId: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private posteService: PosteServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.getPosteById(this.postId);
    });
  }

  getPosteById(id: number): void {
    this.posteService.getPosteById(id).subscribe(
      data => {
        this.poste = data;
      },
      error => {
        console.error('Error fetching poste:', error);
        this.errorMessage = 'Failed to fetch the poste.';
      }
    );
  }

  onSubmit(): void {
    console.log('Updating poste:', this.poste); 
    this.posteService.update(this.poste).subscribe(
      updatedPoste => {
        console.log('Post updated:', updatedPoste);
        this.toastr.success('Post updated successfully!', 'Success'); 
        this.router.navigate(['/tables']);

      },
      error => {
        console.error('Error updating poste:', error);
        this.errorMessage = 'Failed to update the poste.';
      }
    );
  }
}
