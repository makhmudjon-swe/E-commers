import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ProductCard } from '../components/card/product-card/product-card';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [MatCardModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService);
  search = signal('');

  productList = toSignal(this.productService.getProduct(), {
    initialValue: [],
  });

  filteredProduct = computed(() => {
    const query = this.search().toLowerCase();
    return this.productList().filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  });

  constructor() {
    console.log(this.filteredProduct);
  }
}
