import { HttpClient } from '@angular/common/http';
import { Product } from './products';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];
  cartTotal: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: Product) {
    this.items.push(product);
    this.cartTotal = this.calculateTotal();
  }

  getItems() {
    return this.items;
  }

  removeFromCart(product: Product) {
    const idx = this.items.indexOf(product);
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
    this.cartTotal = this.calculateTotal();
  }

  clearCart() {
    this.items = [];
    this.cartTotal = 0;
    return this.items;
  }

  getCartTotal() {
    return this.cartTotal;
  }

  calculateTotal() {
    let total = 0;
    for (const p of this.items) {
      total += p.price;
    }
    return total;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}
