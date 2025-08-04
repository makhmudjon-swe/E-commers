import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../../../pipes/truncate-pipe';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { IProduct } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCardModule,
    TruncatePipe,
    CurrencyPipe,
    NgOptimizedImage,
    MatSnackBarModule,
  ],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() item!: IProduct;
  private cartService = inject(CartService);
  private _snackBar = inject(MatSnackBar);

  addCart(product: IProduct): void {
    const cartItem = { product, quantity: 1 };
    this.cartService.addToCart(cartItem, product.id).subscribe((isAdded) => {
      if (isAdded) {
        this._snackBar.open('Product added to cart!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        this._snackBar.open('Product quantity increased!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }
}
