import { Component, OnInit } from '@angular/core';
import { ManagmentServiceService, Product } from '../services/management.service';

type ViewMode = 'full' | 'image-price' | 'gallery';
type PriceRange = 'all' | 'under500' | '500to1000' | 'over1000';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortField: keyof Product = 'description';
  selectedProduct: Product | null = null;
  showModal: boolean = false;
  currentView: ViewMode = 'full';
  selectedPriceRange: PriceRange = 'all';
  selectedCategory: string = 'all';
  selectedBrand: string = 'all';

  // Add price range options
  priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under500', label: 'Under $500' },
    { value: '500to1000', label: '$500 - $1000' },
    { value: 'over1000', label: 'Over $1000' }
  ];

  // Add categories and brands arrays
  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Smartphones', label: 'Smartphones' },
    { value: 'Tablets', label: 'Tablets' },
    { value: 'Headphones', label: 'Headphones' },
    { value: 'Smartwatches', label: 'Smartwatches' },
    { value: 'Cameras', label: 'Cameras' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Accessories', label: 'Accessories' }
  ];

  brands = [
    { value: 'all', label: 'All Brands' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Sony', label: 'Sony' },
    { value: 'Dell', label: 'Dell' },
    { value: 'HP', label: 'HP' },
    { value: 'Lenovo', label: 'Lenovo' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Google', label: 'Google' }
  ];

  constructor(private managementService: ManagmentServiceService) {
    // Subscribe to categories and brands updates
    this.managementService.getCategories().subscribe(categories => {
      this.categories = [
        { value: 'all', label: 'All Categories' },
        ...categories.map(c => ({ value: c, label: c }))
      ];
    });

    this.managementService.getBrands().subscribe(brands => {
      this.brands = [
        { value: 'all', label: 'All Brands' },
        ...brands.map(b => ({ value: b, label: b }))
      ];
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.managementService.getProducts();
    this.applyFilters();
  }

  // Search products
  searchProducts() {
    this.applyFilters();
  }

  // Show product details
  showProductDetails(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  // Sort products
  sortProducts(field: keyof Product) {
    if (this.sortField === field) {
      // If clicking the same field, toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If clicking a new field, set it and default to ascending
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  // Apply all filters and sorting
  private applyFilters() {
    this.filteredProducts = [...this.products]
      .filter(product => {
        const searchLower = this.searchTerm.toLowerCase();
        return product.description.toLowerCase().includes(searchLower) ||
               product.brand.toLowerCase().includes(searchLower) ||
               product.category.toLowerCase().includes(searchLower) ||
               product.price.toString().includes(this.searchTerm);
      })
      .filter(product => {
        const price = product.price;
        switch (this.selectedPriceRange) {
          case 'under500':
            return price < 500;
          case '500to1000':
            return price >= 500 && price <= 1000;
          case 'over1000':
            return price > 1000;
          default:
            return true;
        }
      })
      // Apply category filter
      .filter(product => 
        this.selectedCategory === 'all' ? true : product.category === this.selectedCategory
      )
      // Apply brand filter
      .filter(product => 
        this.selectedBrand === 'all' ? true : product.brand === this.selectedBrand
      )
      // Apply sorting
      .sort((a, b) => {
        const aValue = a[this.sortField];
        const bValue = b[this.sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return this.sortDirection === 'asc'
          ? aValue > bValue ? 1 : -1
          : bValue > aValue ? 1 : -1;
      });
  }

  // Get sort icon
  getSortIcon(field: keyof Product): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // Add method to toggle view mode
  toggleView() {
    switch (this.currentView) {
      case 'full':
        this.currentView = 'image-price';
        break;
      case 'image-price':
        this.currentView = 'gallery';
        break;
      case 'gallery':
        this.currentView = 'full';
        break;
    }
  }

  // Add method to get view mode label
  getViewModeLabel(): string {
    switch (this.currentView) {
      case 'full':
        return 'Full View';
      case 'image-price':
        return 'Image & Price';
      case 'gallery':
        return 'Gallery';
      default:
        return 'View';
    }
  }

  // Add method to handle price range change
  onPriceRangeChange() {
    this.applyFilters();
  }

  // Add methods to handle category and brand changes
  onCategoryChange() {
    this.applyFilters();
  }

  onBrandChange() {
    this.applyFilters();
  }

  // Add method to format price
  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
}
