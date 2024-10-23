import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {



  private accountSid = 'TWILIO_ACCOUNT_SID'; // Use environment variable
  private authToken = 'TWILIO_AUTH_TOKEN'; // Use environment variable
  private twilioPhoneNumber = 'TWILIO_PHONE_NUMBER'; // Use environment variable

  private apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;

  constructor(private http: HttpClient) { }

  sendSMS(to: string, body: string) {
    const data = new URLSearchParams();
    data.set('To', to);
   // data.set('From', this.twilioPhoneNumber);
    data.set('Body', body);

    const headers = new HttpHeaders({
    //  'Authorization': 'Basic ' + btoa(`${this.accountSid}:${this.authToken}`)
    });

    //return this.http.get(this.apiUrl, { headers });
  }
}