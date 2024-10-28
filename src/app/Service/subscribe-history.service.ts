import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionHistory } from '../Model/SubscriptionHistory';
@Injectable({
  providedIn: 'root'
})
export class SubscribeHistoryService {

  private subscribtionhistoyUrl: string;
  //private percentageUsersUrl: string;

  constructor(private http: HttpClient) {
    // Update the URL to match your backend URL
   // this.userUrl = 'http://192.168.163.145:9200/parking/userdashboard/user-count';
    this.subscribtionhistoyUrl = 'http://192.168.163.145:9200/api/v1/subHistory'; 
  }

  public findAll(): Observable<SubscriptionHistory[]> {
    return this.http.get<SubscriptionHistory[]>(this.subscribtionhistoyUrl+'/getAll');
  }

}
