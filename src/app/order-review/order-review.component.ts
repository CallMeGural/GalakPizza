import { Component } from '@angular/core';
import { Order } from '../model/order';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { PaymentService } from '../services/payment.service';
import { StorageService } from '../services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent {

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
          this.displayedColumns=['pizza','user','cost','status','data','edit'];
          this.orderService
            .findAllOrders()
              .subscribe(data => {this.orders=data; console.log(this.orders)})   
        }
      );
  }

  onStatusChange(order: Order) {
    this.orderService.updateOrder(order).subscribe();
  }

}
