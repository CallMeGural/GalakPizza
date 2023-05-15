import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pizza } from '../model/pizza';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

const httpOptions = {
  headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  totalValue: number=0;
  paymentUrl: string;
  orderUrl : string;
  constructor(private toastr: ToastrService,private http: HttpClient) {
    this.paymentUrl = 'http://localhost:8081'
    this.orderUrl='http://localhost:8081/orders'
   }

  getTotalCost(pizza: Pizza[]) : number {
    pizza.map(t => t.sizeAndCosts.forEach(sizeAndCost => this.totalValue+=sizeAndCost.cost));
    console.log(this.totalValue);
    this.toastr.success(this.totalValue.toString(),"Kwota do zapłaty");
    return this.totalValue;
  }

  getClientSecret(amount: number) : Observable<any>{
    return this.http.post<string>(this.paymentUrl+`/create-payment-intent/+${amount}`,httpOptions);
  }

  saveOrder(order: Order) : Observable<any> {
    console.log(order)
    return this.http.post<Order>(this.orderUrl+"/current",JSON.stringify(order),httpOptions)
  }

  findAllOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl+"/all",httpOptions);

  }

  findUserOrders(username: string) : Observable<Order[]>{
    let queryParams = new HttpParams()
    queryParams = queryParams.append("username",username)
    return this.http.get<Order[]>(this.orderUrl+"/users",{params: queryParams});
  }

  updateOrder(order:Order) : Observable<Order> {
    return this.http.put<Order>(this.orderUrl+"/update",JSON.stringify(order),httpOptions);
  }

}
