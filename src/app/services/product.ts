import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost/bizbuddy-manager/backend/api/products/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiUrl + 'read.php');
  }

  deleteProduct(id: number) {
    return this.http.post(this.apiUrl + 'delete.php', { id: id });
  }
  addProduct(product: any) {
    return this.http.post(this.apiUrl + 'create.php', product);
  }
  updateProduct(product: any) {
    return this.http.post(this.apiUrl + 'update.php', product);
  }
}