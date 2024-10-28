import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GestionuserService {

  private userUrl: string;
  //private percentageUsersUrl: string;

  constructor(private http: HttpClient) {
    // Update the URL to match your backend URL
    //http://192.168.40.149:9200/api/v1/user/getall
   // this.userUrl = 'http://192.168.40.149:9200/parking/userdashboard/user-count';
    this.userUrl = 'http://192.168.40.149:9200/api/v1/user'; 
  }

  public findAll(): any {
    return this.http.get(this.userUrl+'/getall');
  }

 
  
}