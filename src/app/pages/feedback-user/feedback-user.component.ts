import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/Model/Feedback';
import { trigger, style, transition, animate } from '@angular/animations';
import { feedbackService } from 'src/app/Service/feedbackService';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-feedback-user',
    templateUrl: './feedback-user.component.html',
    styleUrls: ['./feedback-user.component.scss'],
    animations: [
        trigger('starAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate('300ms', style({ transform: 'scale(1)', opacity: 1 })),
            ]),
        ]),
    ],
})
export class FeedbackUserComponent implements OnInit {
    feedback: Feedback = new Feedback();
    allFeedback: Feedback[] = [];
    hasSubmittedFeedback: boolean = false;
    stars: number[] = [1, 2, 3, 4, 5];
    starState = '';
    decodedToken: any;

    constructor(
        private feedbackService: feedbackService,
        private jwtDecodeService: JwtDecodeService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getAllFeedback(); // Fetch all feedback when component initializes
        const token = localStorage.getItem('jwt_token');
        if (token) {
            this.decodedToken = this.jwtDecodeService.decodeToken();
            console.log('Decoded token:', this.decodedToken);
        } else {
            console.log('Token not found in local storage');
        }
    }

    getAllFeedback(): void {
        this.feedbackService.findAll().subscribe(
            (data: Feedback[]) => {
                this.allFeedback = data;
                // Check if the user has already submitted feedback
                this.hasSubmittedFeedback = this.allFeedback.some(feedback => feedback.email === this.decodedToken.sub);
            },
            error => {
                console.error('Error fetching feedback:', error);
            }
        );
    }

    addFeedback(): void {
        this.feedback.email = this.decodedToken.sub;
        this.feedbackService.addFeedback(this.feedback).subscribe({
            next: response => {
                console.log(response);
                this.toastr.success('Feedback added successfully!', 'Success');
                this.hasSubmittedFeedback = true; // Update flag indicating that feedback has been submitted
            },
            error: error => {
                console.log(error);
            },
        });
    }

    setRating(rating: number): void {
        this.feedback.rating = rating;
    }
}
