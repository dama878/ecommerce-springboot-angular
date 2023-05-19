import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

//for refresh page don't lose data
  storage: Storage = sessionStorage;
  

  
  constructor() { 

   let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data != null){
      this.cartItems = data;

      this.computeCartTotals();

    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));

  }


  addToCart(theCartItem: CartItem){
      let alreadyExistsInCart: boolean = false;
      let existingCartItem!: CartItem  ;

      if (this.cartItems.length > 0) {
        // for (let temp of this.cartItems){
        //   if(temp.id === theCartItem.id){
        //     existingCartItem = temp;
        //     break;
        //   }
        // }

        existingCartItem=this.cartItems.find(temp => temp.id === theCartItem.id)!;

        alreadyExistsInCart = (existingCartItem != undefined)
      }

      if (alreadyExistsInCart) {
        existingCartItem.quantity++;
      }
      else {
        this.cartItems.push(theCartItem);
      }
      this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let temp of this.cartItems) {
      totalPriceValue+= temp.quantity * temp.unitPrice;
      totalQuantityValue += temp.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)
    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItems();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('content of the cart');
    for (let temp of this.cartItems){
      const subTotalPrice = temp.quantity * temp.unitPrice;
      console.log(`name: ${temp.name}, quantity=${temp.quantity}, unitPrice=${temp.unitPrice}, subtotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    
  }

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;
    if (theCartItem.quantity===0){
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(temp => temp.id === theCartItem.id);

    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      
      this.computeCartTotals();
    }
  }
}
