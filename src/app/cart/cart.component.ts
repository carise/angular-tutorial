import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../products';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = this.cartService.getItems();
  cartTotal = this.cartService.getCartTotal();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder) {}

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  onSubmit(): void {
    // Process checkout data here
    this.cartItems = this.cartService.clearCart();
    this.cartTotal = this.cartService.getCartTotal();
    console.info('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}
