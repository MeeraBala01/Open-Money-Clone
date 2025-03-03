import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';
import { URL_CONFIG } from '../../environments/environment';

@Injectable({ 
  providedIn: 'root'
})
export class TeamService {  

  private _urlConfig = inject(URL_CONFIG);

  constructor(private http: HttpClient, private userDataService: UserDataService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userDataService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-control-allow-origin': 'http://localhost:4200',
      'Access-control-allow-credentials':'true'
    });
  }

  teamData(): Observable<any> {
    const accountId = this.userDataService.getAccountId();
    const companyId = this.userDataService.getCompanyId();
    
    const url = `${this._urlConfig.baseUrl}/get_all_members?accounts_id=${accountId}&companies_id=${companyId}&orderBy=created_at&sortedBy=DESC&page=1&per_page=12&team_member_details_ids=`;

    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  teamRoles(): Observable<any>{

    const token = this.userDataService.getToken(); // Fetch token dynamically

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'product-id': '1',
  
  });

  const url = 'https://preprod-identity-service.bankopen.co/v1/roles?exclude_internal_default_roles=true';
  
  return this.http.get(url, { headers });

   
    
    
  }

  teamData2(){
    const accountId = this.userDataService.getAccountId();
    const companyId = this.userDataService.getCompanyId();
    
    const url = `${this._urlConfig.baseUrl}/get_all_members?accounts_id=${accountId}4&companies_id=${companyId}4&orderBy=created_at&sortedBy=DESC&page=2&per_page=12&team_member_details_ids=`;

    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  teamData3(){
    const accountId = this.userDataService.getAccountId();
    const companyId = this.userDataService.getCompanyId();
    
    const url = `${this._urlConfig.baseUrl}/get_all_members?accounts_id=${accountId}4&companies_id=${companyId}4&orderBy=created_at&sortedBy=DESC&page=3&per_page=12&team_member_details_ids=`;

    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

// teamRoles(): Observable<any> {
 // const token = this.userDataService.getToken();
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${token}`,
  //    'Content-Type': 'application/json'
  // });

//   const url = `https://preprod-identity-service.bankopen.co/v1/roles?exclude_internal_default_roles=true`;
//   return this.http.get(url, { headers: this.getAuthHeaders() });
// }

}




