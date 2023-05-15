import { Component } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Order } from '../model/order';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  user: User;
  user$: Observable<any>;
  displayedColumns: string[];
  orders : Order[]

  constructor(private orderService: PaymentService,
    private storageService: StorageService) {}

  ngOnInit(): void {
      this.user$=this.storageService.getUserFromToken();
      this.user$.subscribe(
        data => {
          this.displayedColumns=['pizza', 'cost','status','data'];
          this.orderService
            .findUserOrders(data.username)
              .subscribe(data => this.orders=data)   
        }
      );
  }
}
