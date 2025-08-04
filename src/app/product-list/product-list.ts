import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../pipes/truncate-pipe';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
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

  productList = toSignal(this.productService.getProduct(), {
    initialValue: [],
  });
}
