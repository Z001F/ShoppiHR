import { Component, OnInit } from '@angular/core';
import { ManagmentServiceService, User, Product } from '../services/management.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.scss'],
})
export class ManagmentComponent implements OnInit {
  isFormVisible = false;
  isSecondFormVisible = false;
  currentUser: User | null = null;
  isAdmin = false;
  isEditMode = false;
  isProductEditMode = false;

  adduser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'user',
    registryDate: '',
    deleted: false
  };

  addproduct: Product = {
    id: 0,
    Pimg: '',
    description: '',
    price: '',
    date: '',
    userId: 0
  };

  users: User[] = [];
  products: Product[] = [];

  constructor(
    private managementService: ManagmentServiceService,
    private authService: AuthService
  ) {}

  // Add a computed property for filtered users
  get displayedUsers(): User[] {
    if (this.isAdmin) {
      return this.users; // Admin sees all users
    } else {
      // Regular user only sees themselves
      return this.users.filter(user => user.id === this.currentUser?.id);
    }
  }

  ngOnInit() {
    this.loadData();
    // Get current user details
    const currentUserEmail = this.authService.getCurrentUserEmail();
    this.currentUser = this.users.find(user => user.email === currentUserEmail) || null;
    this.isAdmin = this.currentUser?.role === 'admin';
  }

  // Check if user can modify a specific user
  canModifyUser(user: User): boolean {
    if (!this.currentUser) return false;
    return this.isAdmin || this.currentUser.id === user.id;
  }

  // Check if user can delete a specific user
  canDeleteUser(user: User): boolean {
    return this.isAdmin;
  }

  // Check if user can add new users
  canAddUser(): boolean {
    return this.isAdmin;
  }

  // Check if user can modify a specific product
  canModifyProduct(product: Product): boolean {
    if (!this.currentUser) return false;
    return this.isAdmin || product.userId === this.currentUser.id;
  }

  // Check if user can delete a specific product
  canDeleteProduct(product: Product): boolean {
    if (!this.currentUser) return false;
    return this.isAdmin || product.userId === this.currentUser.id;
  }

  loadData() {
    this.users = this.managementService.getUsers();
    this.products = this.managementService.getProducts();
  }

  // Toggle functions
  toggleForm(user?: User): void {
    if (this.isSecondFormVisible) {
      this.isSecondFormVisible = false;
    }
    
    if (user) {
      // Edit mode
      this.isEditMode = true;
      this.adduser = { ...user }; // Copy user data to form
    } else {
      // Add mode
      this.isEditMode = false;
      this.adduser = {
        id: 0,
        name: '',
        email: '',
        password: '',
        role: 'user',
        registryDate: '',
        deleted: false
      };
    }
    
    this.isFormVisible = !this.isFormVisible;
  }

  toggleSecondForm(product?: Product): void {
    if (this.isFormVisible) {
      this.isFormVisible = false;
    }
    
    if (product) {
      // Edit mode
      this.isProductEditMode = true;
      this.addproduct = { ...product }; // Copy product data to form
    } else {
      // Add mode
      this.isProductEditMode = false;
      this.addproduct = {
        id: 0,
        Pimg: '',
        description: '',
        price: '',
        date: '',
        userId: 0
      };
    }
    
    this.isSecondFormVisible = !this.isSecondFormVisible;
  }

  // Handle form submission (both add and modify)
  submitAddUserForm() {
    if (!this.canAddUser() && !this.isEditMode) return;
    
    if (this.isEditMode) {
      // If not admin and editing own profile, preserve the role
      if (!this.isAdmin && this.currentUser?.id === this.adduser.id) {
        this.adduser.role = this.currentUser.role;
      }
      // Update existing user
      this.managementService.updateUser(this.adduser);
    } else {
      // Add new user
      this.adduser.id = this.users.length + 1;
      this.adduser.registryDate = new Date().toLocaleString();
      this.adduser.deleted = false;
      this.managementService.addUser(this.adduser);
    }

    // Reset form and state
    this.adduser = {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: 'user',
      registryDate: '',
      deleted: false
    };
    this.isEditMode = false;
    this.isFormVisible = false;
    this.loadData();
  }

  // Handle product form submission (both add and modify)
  submitAddProductForm() {
    if (!this.currentUser) return;
    
    if (this.isProductEditMode) {
      // Update existing product
      this.addproduct.userId = this.currentUser.id;
      this.managementService.updateProduct(this.addproduct);
    } else {
      // Add new product
      this.addproduct.id = this.products.length + 1;
      this.addproduct.userId = this.currentUser.id;
      this.managementService.addProduct(this.addproduct);
    }

    // Reset form and state
    this.addproduct = {
      id: 0,
      Pimg: '',
      description: '',
      price: '',
      date: '',
      userId: 0
    };
    this.isProductEditMode = false;
    this.isSecondFormVisible = false;
    this.loadData();
  }

  // Handle user modification
  modifyUser(user: User) {
    this.toggleForm(user);
  }

  // Handle product modification
  modifyProduct(product: Product) {
    this.toggleSecondForm(product);
  }

  // Handle user deletion
  deleteUser(user: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.managementService.deleteUser(user);
      this.loadData(); // Refresh the data
    }
  }

  // Handle product deletion
  deleteProduct(product: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.managementService.deleteProduct(product);
      this.loadData(); // Refresh the data
    }
  }

  // Helper method to get user name by ID
  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }
}
