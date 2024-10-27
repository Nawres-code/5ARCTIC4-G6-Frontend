import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public chart: any;
  private userCountUrl: string;
  private parkingLotsCountUrl: string;
  private reservationCountUrl: string;
  private userCountSinceLastMonthUrl: string
  private reservationCountSinceLastWeekUrl: string
  private posteCountUrl: string
  private lotsCountUrl: string
  private spotsCountUrl: string
  private spotTypeUrl: string

  private carCountUrl: string
  private bicycleCountUrl: string
  private scooterCountUrl: string
  private handicapCountUrl: string
  private motorCountUrl: string
  private simpleUserUrl: string
  private subscribedUserUrl: string
  private annuelUrl: string
  private mensuelUrl: string
  private semestrielUrl: string
  private pendingUrl: string
  private acceptedUrl: string
  private processingUrl: string
  private reclamationCountUrl: string
  private subPercentagesSemestrielUrl: string
  private subPercentagesMensuelUrl: string
  private subPercentagesAnnuelUrl: string
  private mostActiveUserUrl: string
  private recPercentagesAcceptedUrl: string
  private recPercentagesPendingUrl: string
  private recPercentagesProcessingUrl: string

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.userCountUrl = 'http://192.168.163.145:9200/api/v1/userdashboard/user-count';
    this.userCountSinceLastMonthUrl = 'http://192.168.163.145:9200/api/v1/userdashboard/user-count-since-last-month'
    this.parkingLotsCountUrl = 'http://192.168.163.145:9200/parking/reservationdashboard/lots-count';
    this.reservationCountUrl = 'http://192.168.163.145:9200/api/v1/reservationdashboard/reservations-count';
    this.reservationCountSinceLastWeekUrl = 'http://192.168.163.145:9200/api/v1/userdashboard/reservation-count-since-last-week'
    this.posteCountUrl = 'http://192.168.163.145:9200/api/v1/postdashboard/post-count';
    this.lotsCountUrl = 'http://192.168.163.145:9200/api/v1/reservationdashboard/lots-count';
    this.spotsCountUrl = 'http://192.168.163.145:9200/api/v1/reservationdashboard/spots-count'
    this.spotTypeUrl = 'http://192.168.163.145:9200/api/v1/reservationdashboard/most-visited-spot';
    this.carCountUrl = 'http://192.168.163.145:9200/api/v1/spotDashboard/car';
    this.bicycleCountUrl = 'http://192.168.163.145:9200/api/v1/spotDashboard/bicycle';
    this.scooterCountUrl = 'http://192.168.163.145:9200/api/v1/spotDashboard/scooter';
    this.handicapCountUrl = 'http://192.168.163.145:9200/api/v1/spotDashboard/handicapped';
    this.motorCountUrl = 'http://192.168.163.145:9200/api/v1/spotDashboard/motorcycles';
    this.simpleUserUrl ='http://192.168.163.145:9200/api/v1/userdashboard/simple-user-count';
    this.subscribedUserUrl = 'http://192.168.163.145:9200/api/v1/userdashboard/subscribed-user-count';
    this.annuelUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/annuel-subscriptions-count';
    this.mensuelUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/mensuel-subscriptions-count';
    this.semestrielUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/semestriel-subscriptions-count';
    this.pendingUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/pending-reclamations-count';
    this.acceptedUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/accepted-reclamations-count';
    this.processingUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/processing-reclamations-count';
    this.reclamationCountUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/reclamation-count';
    this.subPercentagesSemestrielUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/subscription-percentage-semestriel';
    this.subPercentagesAnnuelUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/subscription-percentage-annuel';
    this.subPercentagesMensuelUrl = 'http://192.168.163.145:9200/api/v1/subscriptiondashboard/subscription-percentage-mensuel';
    this.mostActiveUserUrl = 'http://192.168.163.145:9200/api/v1/userdashboard/most-active-user';
    this.recPercentagesAcceptedUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/reclamation-percentage-accepted';
    this.recPercentagesPendingUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/reclamation-percentage-pending';
    this.recPercentagesProcessingUrl = 'http://192.168.163.145:9200/api/v1/reclamationdashboard/reclamation-percentage-processing';


  }

  public getUserCount(): Observable<number> {
    return this.http.get<number>(this.userCountUrl);
  }

  public getParkingLotsCount(): Observable<number> {
    return this.http.get<number>(this.parkingLotsCountUrl);
  }
  public getReservationCount(): Observable<number> {
    return this.http.get<number>(this.reservationCountUrl);
  }

  public getUserCountSinceLastMonth(): Observable<number> {
    return this.http.get<number>(this.userCountSinceLastMonthUrl);
    //.pipe(
    //  tap(_ => {}, error => this.handleError(error))
    //);
  }
 /* private handleError(error: any): void {
    // Handle error (e.g., display error message)
    this.toastr.error('Failed to fetch user count since last month.');
  }*/
  public getReservationCountSinceLastWeek(): Observable<number> {
    return this.http.get<number>(this.reservationCountSinceLastWeekUrl);
  }
  public getPosteCount(): Observable<number> {
    return this.http.get<number>(this.posteCountUrl);
  }
  public getLotsCount(): Observable<number> {
    return this.http.get<number>(this.lotsCountUrl);
  }

  public getSpotsCount(): Observable<number> {
    return this.http.get<number>(this.spotsCountUrl);
  }
  public getMostVisitedSpot(): Observable<number> {
    return this.http.get<number>(this.spotTypeUrl);
  }

  public getCar(): Observable<number> {
    return this.http.get<number>(this.carCountUrl);
  }
  public getHandicap(): Observable<number> {
    return this.http.get<number>(this.handicapCountUrl);
  }
  public getMotor(): Observable<number> {
    return this.http.get<number>(this.motorCountUrl);
  }

  public getBicycle(): Observable<number> {
    return this.http.get<number>(this.bicycleCountUrl);
  }
  public getScooter(): Observable<number> {
    return this.http.get<number>(this.scooterCountUrl);
  }

  public getSimpleUserCount(): Observable<number> {
    return this.http.get<number>(this.simpleUserUrl);
  }
  
  public getSubscribedUserCount(): Observable<number> {
    return this.http.get<number>(this.subscribedUserUrl);
  }

  public getAnnuelCount(): Observable<number> {
    return this.http.get<number>(this.annuelUrl);
  }

  public getSemestrielCount(): Observable<number> {
    return this.http.get<number>(this.semestrielUrl);
  }

  public getMensuelCount(): Observable<number> {
    return this.http.get<number>(this.mensuelUrl);
  }

 
  public getAcceptedRecCount(): Observable<number> {
    return this.http.get<number>(this.acceptedUrl);
  }
  public getPendingRecCount(): Observable<number> {
    return this.http.get<number>(this.pendingUrl);
  }

  public getProcessingRecCount(): Observable<number> {
    return this.http.get<number>(this.processingUrl);
  }
  public getReclamationCount(): Observable<number> {
    return this.http.get<number>(this.reclamationCountUrl);
  }
  public getSubPercentageSemestrielCount(): Observable<number> {
    return this.http.get<number>(this.subPercentagesSemestrielUrl);
  }
  public getSubPercentageMensuelCount(): Observable<number> {
    return this.http.get<number>(this.subPercentagesMensuelUrl);
  }
  public getSubPercentageAnnuelCount(): Observable<number> {
    return this.http.get<number>(this.subPercentagesAnnuelUrl);
  }
  public getmostActiveUser(): Observable<User> {
    return this.http.get<User>(this.mostActiveUserUrl);
  }

  public getRecPercentageAcceptedCount(): Observable<number> {
    return this.http.get<number>(this.recPercentagesAcceptedUrl);
  }

  public getRecPercentagePendingCount(): Observable<number> {
    return this.http.get<number>(this.recPercentagesPendingUrl);
  }

  public getRecPercentageProcessingCount(): Observable<number> {
    return this.http.get<number>(this.recPercentagesProcessingUrl);
  }

}