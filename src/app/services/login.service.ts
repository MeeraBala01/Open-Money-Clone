import { inject, Injectable } from '@angular/core';
import { URL_CONFIG } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NumberInput } from '@angular/cdk/coercion';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  private _urlConfig = inject(URL_CONFIG);

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this._urlConfig.baseUrl}/users/send_2fa_otp`, {
      login: credentials.username,
      password: credentials.password,
      recaptcha:
        '03AFcWeA5WJbyyxJc2rYpnI9nXFW1d109cUsd8EK2JtzGwUXRLe3pq9nKEKWFb85QONjGGGaypfD59',
      lead: {
        next: '/dashboar',
      },
    });
  }

  verifyOtp(otp: string): Observable<any> {
    return this.http.post(`${this._urlConfig.baseUrl}/users/login`, {
      login: '9218381273',
      password: 'Test@123',
      two_fa_otp: otp,
      lead: { next: '/dashboard' },
    });
  }
}
