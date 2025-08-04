import { Component, computed, effect, inject, signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../models/cart';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shop-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './shop-cart.html',
  styleUrl: './shop-cart.css',
})
export class ShopCart {
  private cartService = inject(CartService);
  private cartSignal = signal<ICart[]>([]);

  totalPrice = computed(() =>
    this.cart().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  cart = this.cartSignal.asReadonly();

  constructor() {
    this.loadCart();
    effect(() => {
      console.log('Cart update', this.cart);
    });
  }

  private loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartSignal.set(data);
      },
    });
  }

  private updateQuantity(id: string, quantity: number) {
    this.cartService.updateQuantity(id, quantity).subscribe({
      next: (cart) => {
        this.cartSignal.update((items) =>
          items.map((item) =>
            item.id === id ? { ...item, quantity: cart.quantity } : item
          )
        );
      },
    });
  }

  increase(cartId: string, currentQty: number) {
    this.updateQuantity(cartId, currentQty + 1);
  }

  decrease(cartId: string, currentQty: number) {
    if (currentQty > 1) this.updateQuantity(cartId, currentQty - 1);
  }

  remove(cartId: string) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.cartSignal.update((items) => items.filter((i) => i.id !== cartId));
      },
    });
  }

  clear() {
    this.cartSignal().forEach((cart) => {
      this.cartService.removeFromCart(cart.id).subscribe();
    });

    this.cartSignal.set([]);
  }
}
