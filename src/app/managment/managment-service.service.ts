import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagmentServiceService {
  users: any[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      date: new Date().toLocaleString(),
      role: 'admin',
    },
    {
      id: 2, 
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      date: new Date().toLocaleString(),
      role: 'user',
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@example.com', 
      password: 'password789',
      date: new Date().toLocaleString(),
      role: 'user',
    }
  ];

  products: any[] = [
    {
      id: 1,
      Pimg: 'product1.jpg',
      description: 'Wireless Headphones',
      price: 99.99,
      date: new Date().toLocaleString(),
      user: this.users[0]
    },
    {
      id: 2,
      Pimg: 'product2.jpg', 
      description: 'Smart Watch',
      price: 199.99,
      date: new Date().toLocaleString(),
      user: this.users[1]
    },
    {
      id: 3,
      Pimg: 'product3.jpg',
      description: 'Bluetooth Speaker',
      price: 79.99,
      date: new Date().toLocaleString(),
      user: this.users[2]
    }
  ];

  constructor() {}

  getUsers() {
    return this.users;
  }

  getProducts() {
    return this.products;
  }

  addUser(user: any) {
    this.users.push(user);
  }

  addProduct(product: any) {
    this.products.push(product);
  }
  updateUser(user: any) {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
  }
  updateProduct(product: any) {
    this.products = this.products.map((p) => (p.id === product.id ? product : p));
  }
  
  deleteUser(user: any) {
    this.users = this.users.filter((u) => u !== user);
  }

  deleteProduct(product: any) {
    this.products = this.products.filter((p) => p !== product);
  }

}
