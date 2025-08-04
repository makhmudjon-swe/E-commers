import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`);
  }

  addCart(cart: Omit<ICart, 'id'>): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/cart`, cart);
  }

  removeFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${cartId}`);
  }

  updateQuantity(cartId: string , quantity : number):Observable<ICart>{
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartId}`, quantity)
  }

  updateCart(cartId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartId}`, {
      quantity,
    });
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart`);
  }
}
