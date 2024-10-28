import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reclamation } from '../Model/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationUserAdmin {
  private reclamationUrl: string;
  private selectedPostSubject: BehaviorSubject< Reclamation| null> = new BehaviorSubject<Reclamation | null>(null);
  public selectedPost$: Observable<Reclamation | null> = this.selectedPostSubject.asObservable();

  constructor(private http: HttpClient) {
    // Update the URL to match your backend URL
    this.reclamationUrl = 'http://localhost:9200/api/v1/reclamation';
  }


  //get all reclamation 
  public findAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.reclamationUrl}/getall`);
  }

  //add Reclamation 
  public addreclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.reclamationUrl}/addReclamation`, reclamation);
  }

  //get reclamation by email
  public findByEmail(email: string): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.reclamationUrl}/getReclamationByEmail/${email}`);
  }

  Treat(email: string){
    return this.http.put(`${this.reclamationUrl}/accept/${email}`, null);
  }
  
  Reject(email: string){
    return this.http.put(`${this.reclamationUrl}/reject/${email}`, null);
  }

}
