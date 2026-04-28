import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './services/customer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  customers: any[] = [];

  newCustomer = {
    name: '',
    phone: '',
    email: ''
  };

  editingCustomer: any = null;

  editCustomer(customer: any): void {
    this.editingCustomer = { ...customer }; 
  }

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: any[]) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      }
    });
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: () => {
        this.loadCustomers();
        this.newCustomer = {
          name: '',
          phone: '',
          email: ''
        };
      },
      error: (err) => {
        console.error('Error adding customer:', err);
      }
    });
  }
  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
          alert('Could not delete customer. It may be linked to an order.');
        }
      });
    }
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.editingCustomer).subscribe({
      next: () => {
        this.loadCustomers();
        this.editingCustomer = null;
      },
      error: (err) => {
        console.error('Error updating customer:', err);
      }
    });
  }
}