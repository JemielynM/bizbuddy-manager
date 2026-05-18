import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ProductService } from './services/product';
import { FormsModule } from '@angular/forms';
// delete RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  products: any[] = [];
  editing: boolean = false;

  customers: any[] = [];

  newCustomer: any = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  };
  editingCustomer: boolean = false;

  addOrder(): void {
  if (this.editingOrder) {
    this.showMessage('Order updated successfully!', 'success');
    this.editingOrder = false;
  } else {
    this.orders.push({ ...this.newOrder });
    this.showMessage('Order added successfully!', 'success');
  }

  this.newOrder = {
    customer: '',
    company: '',
    product: '',
    quantity: '',
    status: 'Pending'
  };
}

editOrder(order: any): void {
  this.newOrder = order;
  this.editingOrder = true;
}

deleteOrder(index: number): void {
  this.orders.splice(index, 1);
  this.showMessage('Order deleted', 'warning');
}

  orders: any[] = [];
  
  newOrder: any = {
    customer: '',
    product: '',
    quantity: '',
    status: 'Pending'
  };
  editingOrder: boolean = false;

  isLoggedIn: boolean = false;

  isSidebarOpen: boolean = false;
  username: string = '';
  password: string = '';
  loginError: string = '';

  showRegister: boolean = false;
  registerUsername: string = '';
  registerPassword: string = '';
  registerError: string = '';
  registerSuccess: string = '';
 
  message: string = '';
  messageType: string = 'success';
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';

  addCustomer(): void {
  if (this.editingCustomer) {
    this.showMessage('Customer updated successfully!', 'success');
    this.editingCustomer = false;
  } else {
    this.customers.push({ ...this.newCustomer });
    this.showMessage('Customer added successfully!', 'success');
  }

  this.newCustomer = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  };
}

editCustomer(customer: any): void {
  this.newCustomer = customer;
  this.editingCustomer = true;
}

deleteCustomer(index: number): void {
  this.customers.splice(index, 1);
  this.showMessage('Customer deleted', 'warning');
}

  sortProducts(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
 }

  get totalStock(): number {
    return this.products.reduce((total, product) => total + Number(product.stock_qty), 0);
 }

  get lowStockCount(): number {
    return this.products.filter((product) => Number(product.stock_qty) < 20).length;
  }


  get filteredProducts() {
  let filtered = this.products.filter(product =>
    product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(this.searchTerm.toLowerCase())
  );

  if (this.sortColumn) {
    filtered = filtered.sort((a, b) => {
      let valueA = a[this.sortColumn];
      let valueB = b[this.sortColumn];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
 }

  newProduct: any = {
    name: '',
    price: '',
    sku: '',
    color: '',
    size: '',
    stock_qty: ''
  };

  constructor(private productService: ProductService) {}

  login(): void {

  const savedUser = localStorage.getItem('savedUsername');
  const savedPass = localStorage.getItem('savedPassword');

    if (
     (this.username === 'admin' && this.password === '1234') ||

     (this.username === savedUser &&
     this.password === savedPass)
    ) {

     this.isLoggedIn = true;
     localStorage.setItem('isLoggedIn', 'true');
     this.loginError = '';

    } else {

    this.loginError = 'Invalid username or password';

  }
}

  logout(): void {
    this.isSidebarOpen = false;
    this.isLoggedIn = false;  
    this.username = '';
    this.password = '';
    localStorage.removeItem('isLoggedIn');
  }

  register(): void {

   if (!this.registerUsername || !this.registerPassword) {
    this.registerError = 'Please enter username and password';
    return;
   }

   localStorage.setItem('savedUsername', this.registerUsername);
   localStorage.setItem('savedPassword', this.registerPassword);

   this.registerSuccess = 'Account created successfully!';
   this.registerError = '';

   this.showRegister = false;
 }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true;
    }
    this.getProducts();
  }

  // ✅ Show message with auto-hide
  showMessage(msg: string, type: string = 'success'): void {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  // ✅ Load products
  getProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  // ✅ Delete product
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      this.showMessage('Product deleted', 'warning');
    });
  }

  // ✅ Edit product
  editProduct(product: any): void {
    this.newProduct = { ...product };
    this.editing = true;
  }

  // ✅ Cancel edit
  cancelEdit(): void {
    this.editing = false;
    this.newProduct = {
      name: '',
      price: '',
      sku: '',
      color: '',
      size: '',
      stock_qty: ''
    };
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // ✅ Add or Update product
  addProduct(): void {
    if (this.editing) {
      // UPDATE
      this.productService.updateProduct(this.newProduct).subscribe(() => {
        this.getProducts();
        this.showMessage('Product updated successfully!', 'success');
        this.cancelEdit();
      });
    } else {
      // ADD
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.getProducts();
        this.showMessage('Product added successfully!', 'success');
        this.cancelEdit();
      });
    }
  }
}