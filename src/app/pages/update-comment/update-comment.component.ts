import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from 'src/app/Model/comments';
import { CommentsService } from 'src/app/Service/comments.service';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit {
  comment: Comments = new Comments(); 
  commentId: number;
  errorMessage: string = '';

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.commentId = params['id'];
      this.getCommentById(this.commentId);
    });
  }

  getCommentById(id: number): void {
    this.commentsService.findById(id).subscribe(
      comment => {
        this.comment = comment;
      },
      error => {
        console.error('Error fetching comment details:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Updating comment:', this.comment);
    this.commentsService.update(this.comment).subscribe(
      updatedComment => {
        console.log('Comment updated:', updatedComment);
        this.router.navigate(['/comments']); 
      },
      error => {
        console.error('Error updating comment:', error);
        this.errorMessage = 'Failed to update the comment.';
      }
    );
  }
}
