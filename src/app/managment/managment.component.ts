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
    price: 0,
    date: '',
    userId: 0,
    category: '',
    brand: ''
  };

  users: User[] = [];
  products: Product[] = [];

  // Add categories and brands
  categories: string[] = [
    'Laptops',
    'Smartphones',
    'Tablets',
    'Headphones',
    'Smartwatches',
    'Cameras',
    'Gaming',
    'Accessories'
  ];

  brands: string[] = [
    'Apple',
    'Samsung',
    'Sony',
    'Dell',
    'HP',
    'Lenovo',
    'Microsoft',
    'Google',
    'LG',
    'Asus'
  ];

  newCategory: string = '';
  newBrand: string = '';
  isAddingCategory: boolean = false;
  isAddingBrand: boolean = false;

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
        registryDate: new Date().toLocaleString(),
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
        price: 0,
        date: new Date().toISOString().split('T')[0],
        userId: 0,
        category: '',
        brand: ''
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

  // Add form validation
  validateProductForm(): boolean {
    if (!this.addproduct.Pimg || 
        !this.addproduct.description || 
        !this.addproduct.price || 
        !this.addproduct.date || 
        !this.addproduct.category || 
        !this.addproduct.brand) {
      alert('Please fill in all fields');
      return false;
    }
    return true;
  }

  // Update submit method with validation
  submitAddProductForm() {
    if (!this.currentUser || !this.validateProductForm()) return;
    
    // Convert price to number
    this.addproduct.price = parseFloat(this.addproduct.price.toString());
    
    if (this.isProductEditMode) {
      this.managementService.updateProduct(this.addproduct);
    } else {
      this.addproduct.id = this.products.length + 1;
      this.addproduct.userId = this.currentUser.id;
      this.managementService.addProduct(this.addproduct);
    }

    // Reset form
    this.resetProductForm();
  }

  // Add method to reset form
  private resetProductForm() {
    this.addproduct = {
      id: 0,
      Pimg: '',
      description: '',
      price: 0,
      date: '',
      userId: 0,
      category: '',
      brand: ''
    };
    this.isProductEditMode = false;
    this.isSecondFormVisible = false;
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

  // Add new category
  addNewCategory() {
    if (this.newCategory.trim()) {
      this.categories.push(this.newCategory.trim());
      this.addproduct.category = this.newCategory.trim();
      this.newCategory = '';
      this.isAddingCategory = false;
    }
  }

  // Add new brand
  addNewBrand() {
    if (this.newBrand.trim()) {
      this.brands.push(this.newBrand.trim());
      this.addproduct.brand = this.newBrand.trim();
      this.newBrand = '';
      this.isAddingBrand = false;
    }
  }

  // Cancel adding new category/brand
  cancelAdd(type: 'category' | 'brand') {
    if (type === 'category') {
      this.isAddingCategory = false;
      this.newCategory = '';
    } else {
      this.isAddingBrand = false;
      this.newBrand = '';
    }
  }

  // Helper method to check if any product has a category
  hasAnyCategory(): boolean {
    return this.products.some(product => product.category);
  }

  // Helper method to check if any product has a brand
  hasAnyBrand(): boolean {
    return this.products.some(product => product.brand);
  }
}
