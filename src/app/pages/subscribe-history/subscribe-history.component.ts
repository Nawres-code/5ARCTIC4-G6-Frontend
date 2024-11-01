import { Component } from '@angular/core';
import { SubscriptionHistory } from 'src/app/Model/SubscriptionHistory';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SubscribeHistoryService } from 'src/app/Service/subscribe-history.service';

@Component({
  selector: 'app-subscribe-history',
  templateUrl: './subscribe-history.component.html',
  styleUrls: ['./subscribe-history.component.scss']
})
export class SubscribeHistoryComponent {
  subscriptions: SubscriptionHistory[] = [];
  //pagination code here
  paginatedSubscriptions: SubscriptionHistory[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number;
  pages: number[] = [];
  //end code pagination
  editedSubscription: SubscriptionHistory = new SubscriptionHistory(); // Create a new instance to hold edited subscription
  isModalOpen: boolean = false;
  

  constructor(private userSubscriptionhistoryService: SubscribeHistoryService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadSubscription();
  }

  loadSubscription() {
    this.userSubscriptionhistoryService.findAll().subscribe(data => {
      this.subscriptions = data;
      console.log(this.subscriptions);
      //pagination code here
      this.totalPages = Math.ceil(this.subscriptions.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.setPage(this.currentPage);
      //end code pagination
    });
  }

  // deleteSubscription(id: number) {
  //   this.userSubscriptionhistoryService.deleteSubscription(id).subscribe(
  //     (response) => {
  //       console.log('Post deleted successfully:', response);
  //       this.loadSubscription(); // Reload subscriptions after deleting
  //       this.toastr.success('Post deleted successfully', 'Success');
  //     },
  //     (error) => {
  //       console.error('Error deleting post:', error);
  //       this.toastr.error('Failed to delete post', 'Error');
  //     }
  //   );
  // }


  


  // editSubscription(id: number) {
  //   // Find the subscription by ID
  //   console.log("Edit subscription called with ID:", id);
  //   this.userSubscriptionService.findById(id).subscribe(
  //     (subscription) => {
  //       // Assign the found subscription to editedSubscription
  //       this.editedSubscription = { ...subscription };
  //       // Show the modal
  //       this.isModalOpen = true;
  //       console.log("Modal opened for editing subscription:", this.editedSubscription);
  //     },
  //     (error) => {
  //       console.error('Error fetching subscription:', error);
  //       this.toastr.error('Failed to fetch subscription', 'Error');
  //     }
  //   );
  // }

  // saveEditedSubscription() {
  //   // Call the service method to update the subscription...
  //   this.userSubscriptionService.updateSubscription(this.editedSubscription).subscribe(
  //     (response) => {
  //       console.log('Subscription updated successfully:', response);
  //       this.isModalOpen = false; // Hide the modal after successful update
  //       this.loadSubscription(); // Reload subscriptions after update
  //       this.toastr.success('Subscription updated successfully', 'Success');
  //     },
  //     (error) => {
  //       console.error('Error updating subscription:', error);
  //       this.toastr.error('Failed to update subscription', 'Error');
  //     }
  //   );
  // }

  closeModal() {
    console.log("Close modal function called");
    this.isModalOpen = false;
  }



  //pagination code here
  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.subscriptions.length);
    this.paginatedSubscriptions = this.subscriptions.slice(startIndex, endIndex);
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

  navigateToSubscribe() {
    this.router.navigateByUrl('/subscriptionhistory');
  }
  
}


