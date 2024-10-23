import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Comments } from '../Model/comments';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentUrl: string;
  private selectedCommentSubject: BehaviorSubject<Comments | null> = new BehaviorSubject<Comments | null>(null);
  public selectedComment$: Observable<Comments | null> = this.selectedCommentSubject.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.commentUrl = 'http://localhost:9200/api/v1/comments';
  }

  public findAll(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.commentUrl + '/getall');
  }

  public save(comment: Comments) {
    return this.http.post<Comments>(this.commentUrl + '/addComments', comment).pipe(
      tap(() => {
        this.toastr.success('Comment added successfully', 'Success');
      })
    );
  }

  public deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.commentUrl}/deleteId/${id}`);
  }

  public update(comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(`${this.commentUrl}/updatecomments/${comment.idComm}`, comment);
  }

  public setSelectedComment(comment: Comments): void {
    this.selectedCommentSubject.next(comment);
  }

  public findById(id: number): Observable<Comments> {
    return this.http.get<Comments>(`${this.commentUrl}/findById/${id}`);
  }
}
