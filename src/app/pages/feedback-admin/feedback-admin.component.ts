import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/Model/Feedback';
import { feedbackService } from 'src/app/Service/feedbackService';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.component.html',
  styleUrls: ['./feedback-admin.component.scss']
})
export class FeedbackAdminComponent implements OnInit {
  feedbacks: Feedback[];
  stars: number[] = [1, 2, 3, 4, 5]; // Initialize the stars array
  averageRating: number = 1;
  //pagination code here
  paginatedFeedbacks: Feedback[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number;
  pages: number[] = [];
  hasFeedbacks: boolean = true;

  constructor(private feedbackService: feedbackService) { }

  ngOnInit(): void {
    this.feedbackService.findAll().subscribe(data => {
      this.feedbacks = data;
      if (this.feedbacks.length === 0) {
        this.hasFeedbacks = false;
      } else {
        this.calculateAverageRating();
        //pagination code here
        this.totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.setPage(this.currentPage);
        //end code pagination
      }
    });
  }

  calculateAverageRating(): void {
    if (this.feedbacks && this.feedbacks.length > 0) {
      const totalRating = this.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
      const average = totalRating / this.feedbacks.length;
      this.averageRating = Number(average.toFixed(2));
    }
  }

  //pagination code here
  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.feedbacks.length);
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
  //end code pagination

}
