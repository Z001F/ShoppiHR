import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.scss'],
})
export class ManagmentComponent {
  isFormVisible = false;
  isSecondFormVisible = false;

  // Data objects for user and product
  adduser = {
    name: '',
    email: '',
    password: '',
  };

  addproduct = {
    Pimg: '',
    description: '',
    price: '',
    date: '',
  };

  // Arrays to store added users and products (typed for better maintainability)
  users: {
    name: string;
    email: string;
    password: string;
  }[] = [];
  products: {
    Pimg: string;
    description: string;
    price: string;
    date: string;
  }[] = [];

  // Toggle functions
  toggleForm(): void {
    if (this.isSecondFormVisible) {
      this.isSecondFormVisible = false;
    }
    this.isFormVisible = !this.isFormVisible;
  }

  toggleSecondForm(): void {
    if (this.isFormVisible) {
      this.isFormVisible = false;
    }
    this.isSecondFormVisible = !this.isSecondFormVisible;
  }

  // Handle AddUser form submission
  submitAddUserForm() {
    this.users.push({ ...this.adduser }); // Add the user data to the users array
    console.log('User added:', this.adduser);
    this.adduser = { name: '', email: '', password: '' }; // Reset form after submission
  }

  // Handle AddProduct form submission
  submitAddProductForm() {
    this.products.push({ ...this.addproduct }); // Add the product data to the products array
    console.log('Product added:', this.addproduct);
    this.addproduct = { Pimg: '', description: '', price: '', date: '' }; // Reset form after submission
  }
}
