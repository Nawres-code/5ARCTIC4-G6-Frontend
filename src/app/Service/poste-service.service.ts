import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Poste } from '../Model/poste';

@Injectable({
  providedIn: 'root'
})
export class PosteServiceService {
  private posteUrl: string;
  private selectedPostSubject: BehaviorSubject<Poste | null> = new BehaviorSubject<Poste | null>(null);
  public selectedPost$: Observable<Poste | null> = this.selectedPostSubject.asObservable();

  constructor(private http: HttpClient) {
    // Update the URL to match your backend URL
    this.posteUrl = 'http://localhost:9200/api/v1/poste';
  }

  public findAll(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.posteUrl}/getall`);
  }
  public getPosteById(id: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.posteUrl}/getPosteById/${id}`);
  }

  public save(poste: Poste): Observable<Poste> {
    return this.http.post<Poste>(`${this.posteUrl}/addPoste`, poste);
  }

  public deletePoste(id: number): Observable<any> {
    return this.http.delete<any>(`${this.posteUrl}/deleteId/${id}`);
  }

  public update(poste: Poste): Observable<Poste> {
    return this.http.put<Poste>(`${this.posteUrl}/updatePoste/${poste.idPoste}`, poste);
}

  public searchByTitle(title: string): Observable<Poste[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Poste[]>(`${this.posteUrl}/searchByTitle`, { params });
  }

  public setSelectedPost(poste: Poste): void {
    this.selectedPostSubject.next(poste);
  }
}
