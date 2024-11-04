import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/Model/comments';
import { CommentsService } from 'src/app/Service/comments.service'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 
import { Poste } from 'src/app/Model/poste'; 
import { PosteServiceService } from 'src/app/Service/poste-service.service'; 
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Importez NgbModalRef
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any[];
  selectedPost: Poste; 
  modalRef: NgbModalRef;
  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService,
    private router: Router ,
    private modalService: NgbModal,
    private posteService: PosteServiceService,
     
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.findAll().subscribe(data => {
      this.comments = data;
    })
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe(
      (response) => {
        console.log('Comment deleted successfully:', response);
        this.loadComments();
        this.toastr.success('Comment deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting comment:', error);
        this.toastr.error('Failed to delete comment', 'Error');
      }
    );
  }

  updateComment(comment: Comments) {
    this.commentsService.update(comment).subscribe(
      () => {
        console.log('Comment updated successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error updating comment:', error);
      }
    );
  }

  addComment(comment: Comments) {
    this.commentsService.save(comment).subscribe(
      () => {
        console.log('Comment added successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error adding comment:', error);
        this.toastr.error('Failed to add comment', 'Error');
      }
    );
  }

  updateSelectedComment(comment: Comments) {
    this.commentsService.setSelectedComment(comment);
    this.router.navigate(['/update-comment', comment.idComm]);
  }

  openPostDetailsModal(postId: number) {
    if (postId) {
      this.posteService.getPosteById(postId).subscribe(
        posteDetails => {
          this.selectedPost = posteDetails;
          const modalId = 'postDetailsModal'; // Utilisez le même identifiant qu'en HTML
          const modal = document.getElementById(modalId);
          if (modal) {
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
          } else {
            console.error(`Modal with id ${modalId} not found.`);
          }
        },
        error => {
          console.error('Error fetching poste details:', error);
        }
      );
    } else {
      console.error('Post ID is undefined');
    }
  }
  
  

  closePostDetailsModal() {
    this.router.navigate(['/comments']);
  }
  
}
