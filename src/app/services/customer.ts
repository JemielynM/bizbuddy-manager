import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readUrl = 'http://localhost/bizbuddy-manager/backend/api/customers/read.php';
  private createUrl = 'http://localhost/bizbuddy-manager/backend/api/customers/create.php';
  private updateUrl = 'http://localhost/bizbuddy-manager/backend/api/customers/update.php';
  private deleteUrl = 'http://localhost/bizbuddy-manager/backend/api/customers/delete.php';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.readUrl);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.createUrl, customer);
  }

  updateCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.updateUrl, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.post<any>(this.deleteUrl, { id });
  }
}