import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import jwt_decode from  'jwt-decode';
//import * as jwt_decode from 'jwt-decode';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private endpointURL="http://localhost:9200/api/v1/auth/"
  public  JWT_TOKEN_KEY= 'jwt_token';
  public connected_User :any;
 

  constructor(private http:HttpClient,private router:Router) {

  }

  register(user: any): Observable<any> {  
    const registerUrl = `${this.endpointURL}register`;   
    return this.http.post(registerUrl, user);  
  }
  
  login(user: any): Observable<any> {  
    return this.http.post<any>(`${this.endpointURL}authenticate`, user).pipe(
      tap(response => {
        const token = response.token; // Supposons que le token soit retourné dans la propriété 'token' de la réponse
        this.setToken(token);
      })
    );
  }

   endpointpwd="http://localhost:9200/api/v1/"
   forgotPassword(email: string): Observable<any> {
    const forgotPasswordUrl =  `${this.endpointpwd}forgot-password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams().set('email', email);

    return this.http.post(forgotPasswordUrl, body.toString(), { headers });
  }

  resetPassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
    const resetPasswordUrl = `${this.endpointpwd}reset-password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword)
      .set('confirmPassword', confirmPassword);

    return this.http.post(resetPasswordUrl, body.toString(), { headers });
  }
  
  
  
  decodeToken(token: string): any {
    try {
      const decodedToken = jwt_decode(token);
      
      return decodedToken;
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
    this.router.navigate(['/login']);
  }
 
  setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN_KEY, token);
  }
 
  getToken(): string {
    const token = localStorage.getItem(this.JWT_TOKEN_KEY);
    return token !== null ? token : '';
  }
  
 
  removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN_KEY);
  }
 
  getUserFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      if (decodedToken) {
        return decodedToken.unique_name;
      }
    }
    return null;
  }
  
  
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }
    return true;
  }


  deleteUserById(userId: number): Observable<any> {
    const deleteUserUrl = `http://localhost:9200/api/v1/user/deleteId/${userId}`;
    return this.http.delete(deleteUserUrl).pipe(
      tap(() => {
        // Optionally perform any actions after successful deletion
        console.log(`User with ID ${userId} deleted successfully`);
      })
    );
  }


}