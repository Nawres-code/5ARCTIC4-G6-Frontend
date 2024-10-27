import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TwilioService } from 'src/app/Service/twilio.service';




// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { User } from 'src/app/Model/user';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public usersChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public userCount: number = 0; 
  public parkingLotsCount: number = 0; 
  public reservationCount: number = 0; 
  public userCountSinceLastMonth: number = 0;
  public reservationCountSinceLastWeek: number = 0;
  public posteCount: number = 0;
  public lotsCount: number = 0;
  public spotsCount: number = 0;
  public annuelCount: number = 0;
  public semestrielCount: number = 0;
  public mensuelCount: number = 0;
  public spotTypeCounts: any;
  public simpleUserCount: any;
  public subscribedUserCount: any;
  public processingCount: any;
  public acceptedCount: any;
  public pendingCount: any;
  public subPercentageAnnuelCount: any;
  public subPercentageMensuelCount: any;
  public subPercentageSemestrielCount: any;
  public mostActiveUser: any;
  public recPercentageAcceptedCount: any;
  public recPercentagePendingCount: any;
  public recPercentageProcessingCount: any;
  public vehicleData: any = {
    "SCOOTER": 0,
    "HANDICAPPED": 0,
    "MOTORCYCLES": 0,
    "CAR": 0,
    "BICYCLE": 0
  };
  public users: any = {
    "SimpleUsers": 0,
    "SubscribedUsers": 0
  };
  showAlertUserCount: boolean = false;
  showAlertReservationUnderFive: boolean = false;
  showAlertReservationIsFive: boolean = false;
  alertMessageReservationUnderFive: string = '';
  alertMessageReservationIsFive: string = '';
  alertMessageUserCount: string = '';

  constructor(private toastr: ToastrService ,private dashboardService: DashboardService ,private twilioService : TwilioService) { } 

  ngOnInit() {

    this.createChart();
    this.createUserChart();
    this.fetchMostActiveUser();
 
    this.checkReservationCount();
    interval(5000).subscribe(() => {
    this.checkReservationCount();
  });

    this.dashboardService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    this.dashboardService.getParkingLotsCount().subscribe(count => {
      this.parkingLotsCount = count;
    });
    this.dashboardService.getReservationCount().subscribe(count => {
      this.reservationCount = count;
    });
    this.dashboardService.getUserCountSinceLastMonth().subscribe(count => {
      this.userCountSinceLastMonth = count;
      
    });

    this.dashboardService.getPosteCount().subscribe(count => {
      this.posteCount = count;
    });
    this.dashboardService.getLotsCount().subscribe(count => {
      this.lotsCount = count;
    });
    this.dashboardService.getSpotsCount().subscribe(count => {
      this.spotsCount = count;

    });
    this.dashboardService.getAnnuelCount().subscribe(count => {
      this.annuelCount = count;

    });
    this.dashboardService.getMensuelCount().subscribe(count => {
      this.mensuelCount = count;

    });
    this.dashboardService.getSemestrielCount().subscribe(count => {
      this.semestrielCount = count;

    });

    this.dashboardService.getMostVisitedSpot().subscribe(data => {
      this.spotTypeCounts = data;
     // this.updateVehicleData(data);
     // this.createChart(vehicleData);
      
    });
    this.dashboardService.getCar().subscribe(count => {
      this.vehicleData.CAR = count;
      this.updateChart();
    });

    this.dashboardService.getHandicap().subscribe(count => {
      this.vehicleData.HANDICAPPED = count;
      this.updateChart();
    });

    this.dashboardService.getMotor().subscribe(count => {
      this.vehicleData.MOTORCYCLES = count;
      this.updateChart();
    });

    this.dashboardService.getBicycle().subscribe(count => {
      this.vehicleData.BICYCLE = count;
      this.updateChart();
    });

    this.dashboardService.getScooter().subscribe(count => {
      this.vehicleData.SCOOTER = count;
      this.updateChart();
    });

    this.dashboardService.getSimpleUserCount().subscribe(count => {
      this.users.SimpleUsers = count;
      this.updateUserCounts(count, this.users.SimpleUsers);
    });
  
    this.dashboardService.getSubscribedUserCount().subscribe(count => {
      this.users.SubscribedUsers = count;
      this.updateUserCounts(this.users.SubscribedUsers, count);
    });
    let hasAlertBeenShown = false; // Add a flag to track if the alert has been shown

this.dashboardService.getUserCountSinceLastMonth().subscribe(count => {
  if (count === 0 && !hasAlertBeenShown) { // Show the alert only if it hasn't been shown yet
    this.showAlertUserCount = true; // Display the alert
    this.alertMessageUserCount = 'A simple danger alert—check it out!';

    hasAlertBeenShown = true; // Set the flag to true so the alert won't show again

    setTimeout(() => {
      this.showAlertUserCount = false; // Hide the alert after 5 seconds
    }, 5000); // Dismiss the alert after 5 seconds
  }
});

    
    
    
    this.dashboardService.getProcessingRecCount().subscribe(count => {
      this.processingCount = count;

    });
    this.dashboardService.getAcceptedRecCount().subscribe(count => {
      this.acceptedCount = count;

    });
    this.dashboardService.getPendingRecCount().subscribe(count => {
      this.pendingCount = count;

    });
    this.dashboardService.getSubPercentageAnnuelCount().subscribe(count => {
      this.subPercentageAnnuelCount = count;

    });
    this.dashboardService.getSubPercentageSemestrielCount().subscribe(count => {
      this.subPercentageSemestrielCount = count;

    });
    this.dashboardService.getSubPercentageMensuelCount().subscribe(count => {
      this.subPercentageMensuelCount = count;

    });

    this.dashboardService.getRecPercentageAcceptedCount().subscribe(count => {
      this.recPercentageAcceptedCount = count;

    });
    this.dashboardService.getRecPercentagePendingCount().subscribe(count => {
      this.recPercentagePendingCount = count;

    });
    this.dashboardService.getRecPercentageProcessingCount().subscribe(count => {
      this.recPercentageProcessingCount = count;

    });
    
  
  }
  checkReservationCount() {
    let notificationShown = false; // Flag to track if the notification has been shown
    let subscription; // Variable to store the subscription
  
    // Get the reservation count only once
    subscription = this.dashboardService.getReservationCountSinceLastWeek().subscribe(count => {
      if (count === 5 && !notificationShown) { // Show the error notification only once
        this.toastr.error('Reservation count since last week is 5!', 'Alert', { timeOut: 5000 }); // Notification disappears after 5 seconds
        notificationShown = true; // Set notification flag to true
      } else if (count < 5 && !notificationShown) {
        this.toastr.warning('Reservation count since last week is less than 5!', 'Warning', { timeOut: 5000 }); // Notification disappears after 5 seconds
        notificationShown = true; // Set notification flag to true
        // Unsubscribe from the observable to prevent further emissions
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    });
  }
  
  fetchMostActiveUser(): void {
    this.dashboardService.getmostActiveUser().subscribe(
        (user: User) => {
            this.mostActiveUser = `${user.firstname} ${user.lastname}`;
            console.log('Most active user:', this.mostActiveUser);
        },
        (error) => {
            console.error('Error fetching most active user:', error);
        }
    );
}

  updateChart() {
    const labels = Object.keys(this.vehicleData);
    const dataValues = Object.values(this.vehicleData);

    this.salesChart.data.labels = labels;
    this.salesChart.data.datasets[0].data = dataValues;
    this.salesChart.update();
  }

  
 /* getUserCountSinceLastMonth() {
    this.dashboardService.getUserCountSinceLastMonth().subscribe(count => {
      this.userCountSinceLastMonth = count;
      if (count === 0) {
        // Display an alert here
        alert('User count since last month is 0!');
      }
      // Optionally, call any other methods or perform any actions here based on the retrieved data
    });
  }*/

  
  createChart() {
    const labels = Object.keys(this.vehicleData);
    const dataValues = Object.values(this.vehicleData);
  
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Spot Value',
          data: dataValues,
          backgroundColor: 'orange'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        },
        title: {
          display: true,
          text: 'Spot Count Chart',
          fontSize: 18,
          fontColor: '#666'
        },
        tooltips: {
          enabled: true,
          backgroundColor: '#ccc',
          titleFontColor: '#333',
          bodyFontColor: '#333'
        }
      }
    });
  }

  updateVehicleData(newData: any) {
    this.vehicleData = newData;
    this.createChart(); // Update the chart when data changes
  }

  createUserChart() {
    const labels = ['Simple Client', 'Subscribed Client'];
    const dataValues = [this.simpleUserCount, this.subscribedUserCount]; 
  
    var chartUsers = document.getElementById('chart-users');
    this.usersChart = new Chart(chartUsers, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'User Value',
          data: dataValues,
          backgroundColor: ['orange', 'blue']  // Adjust colors as needed
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        },
        title: {
          display: true,
          text: 'User Value Count Chart',
          fontSize: 18,
          fontColor: '#666'
        },
        tooltips: {
          enabled: true,
          backgroundColor: '#ccc',
          titleFontColor: '#333',
          bodyFontColor: '#333'
        }
      }
    });
  }

  updateUserCounts(simpleCount: number, subscribedCount: number) {
    this.simpleUserCount = simpleCount;
    this.subscribedUserCount = subscribedCount;
    this.createUserChart(); // Update the chart when data changes
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
  

   /* this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }*/