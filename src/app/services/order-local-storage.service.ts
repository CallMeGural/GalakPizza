import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderLocalStorageService {

  constructor() {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem(this.key);
    });
  }

  private key = 'order';

  getOrder() {
    const order = localStorage.getItem(this.key);
    return order ? JSON.parse(order) : null;
  }

  setOrder(order: Order) {
    localStorage.setItem(this.key, JSON.stringify(order));
  }
}
