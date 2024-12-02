import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  registryDate: string;
  role: 'admin' | 'user';
  deleted: boolean;
}

export interface Product {
  id: number;
  Pimg: string;
  description: string;
  price: number;
  date: string;
  userId: number;
  category: string;
  brand: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManagmentServiceService {
  private users: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin',
      password: 'admin',
      registryDate: new Date().toLocaleString(),
      role: 'admin',
      deleted: false
    },
    {
      id: 2,
      name: 'Regular User',
      email: 'user',
      password: 'user',
      registryDate: new Date().toLocaleString(),
      role: 'user',
      deleted: false
    }
  ];

  private products: Product[] = [
    {
      id: 1,
      Pimg: 'https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg',
      description: 'MacBook Pro 2023',
      price: 1299.99,
      date: '2024-03-15',
      userId: 1,
      category: 'Laptops',
      brand: 'Apple'
    },
    {
      id: 2,
      Pimg: 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg',
      description: 'iPhone 14 Pro',
      price: 999.99,
      date: '2024-03-14',
      userId: 2,
      category: 'Smartphones',
      brand: 'Apple'
    },
    {
      id: 3,
      Pimg: 'https://m.media-amazon.com/images/I/61kC3UxQPDL._AC_SL1500_.jpg',
      description: 'Sony WH-1000XM4',
      price: 349.99,
      date: '2024-03-13',
      userId: 1,
      category: 'Headphones',
      brand: 'Sony'
    },
    {
      id: 4,
      Pimg: 'https://m.media-amazon.com/images/I/81gC7frRJyL._AC_SL1500_.jpg',
      description: 'iPad Pro 2023',
      price: 799.99,
      date: '2024-03-12',
      userId: 2,
      category: 'Tablets',
      brand: 'Apple'
    }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Get all products
  getProducts(): Product[] {
    return this.products;
  }

  // Add new user
  addUser(user: User) {
    this.users.push(user);
    this.usersSubject.next(this.users);
    // Store in localStorage
    localStorage.setItem('managementUsers', JSON.stringify(this.users));
  }

  // Update user
  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next(this.users);
      // Update localStorage
      localStorage.setItem('managementUsers', JSON.stringify(this.users));
    }
  }

  // Delete user
  deleteUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
    this.usersSubject.next(this.users);
    // Update localStorage
    localStorage.setItem('managementUsers', JSON.stringify(this.users));
  }

  // Add new product
  addProduct(product: Product) {
    this.products.push(product);
    this.productsSubject.next(this.products);
    // Store in localStorage
    localStorage.setItem('managementProducts', JSON.stringify(this.products));
  }

  // Update product
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products);
      // Update localStorage
      localStorage.setItem('managementProducts', JSON.stringify(this.products));
    }
  }

  // Delete product
  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p.id !== product.id);
    this.productsSubject.next(this.products);
    // Update localStorage
    localStorage.setItem('managementProducts', JSON.stringify(this.products));
  }

  // Add method to sync categories and brands across components
  private categoriesSubject = new BehaviorSubject<string[]>([]);
  private brandsSubject = new BehaviorSubject<string[]>([]);

  getCategories() {
    return this.categoriesSubject.asObservable();
  }

  getBrands() {
    return this.brandsSubject.asObservable();
  }

  addCategory(category: string) {
    const currentCategories = this.categoriesSubject.value;
    if (!currentCategories.includes(category)) {
      this.categoriesSubject.next([...currentCategories, category]);
    }
  }

  addBrand(brand: string) {
    const currentBrands = this.brandsSubject.value;
    if (!currentBrands.includes(brand)) {
      this.brandsSubject.next([...currentBrands, brand]);
    }
  }

  constructor() {
    // Load data from localStorage on service initialization
    const savedUsers = localStorage.getItem('managementUsers');
    const savedProducts = localStorage.getItem('managementProducts');

    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
      this.usersSubject.next(this.users);
    }

    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
      this.productsSubject.next(this.products);
    }
  }
} 