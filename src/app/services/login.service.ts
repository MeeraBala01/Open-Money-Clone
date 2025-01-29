import { inject, Injectable } from '@angular/core';
import { URL_CONFIG } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private _urlConfig = inject(URL_CONFIG);

  login() {
    // this._urlConfig.baseUrl;
  }
}
