import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/Model/Subscription';
import { UserSubscriptionService } from 'src/app/Service/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  subscription: Subscription = new Subscription();
  constructor(private subscriptionService: UserSubscriptionService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    debugger
    this.subscriptionService.save(this.subscription).subscribe(
      (response) => {
        console.log('New subscription added:', response);
        // Optionally, reset the form after successful submission
        this.subscription = new Subscription();
        this.router.navigate(['/getallsubscription']);
      },
      (error) => {
        console.error('Error adding subscription:', error);
        // Handle error response as needed
      }
    );
  }
  calculateExpirationDate() {
    if (this.subscription.subType === 'ANNUEL') {
      const startDate = new Date(this.subscription.dateDebut);
      startDate.setFullYear(startDate.getFullYear() + 1);
      this.subscription.dateExpiration = startDate;
    } else if (this.subscription.subType === 'MENSUEL') {
      const startDate = new Date(this.subscription.dateDebut);
      startDate.setMonth(startDate.getMonth() + 1);
      this.subscription.dateExpiration = startDate;
    } else if (this.subscription.subType === 'SEMESTRIEL') {
      const startDate = new Date(this.subscription.dateDebut);
      startDate.setMonth(startDate.getMonth() + 6);
      this.subscription.dateExpiration = startDate;
    }
  }

}
