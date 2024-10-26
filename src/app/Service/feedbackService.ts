import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../Model/Feedback';


@Injectable({
  providedIn: 'root'
})
export class feedbackService {

    private feedbackUrl: string;
    constructor(private http: HttpClient) {
    this.feedbackUrl = 'http://localhost:9200/api/v1/feedback'; 
  }

  public findAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl+'/getall');
  }
  public addFeedback(feedback:Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbackUrl+'/addFeedback',feedback);
  }
  
}