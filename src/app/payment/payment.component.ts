import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';
import { StorageService } from '../services/storage.service';
import { StripeScriptTag } from 'stripe-angular';
import { Order } from '../model/order';
import { ToastrService } from 'ngx-toastr';
import { OrderLocalStorageService } from '../services/order-local-storage.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit{

  @ViewChild('cardElement') cardElement: ElementRef;
  totalCost : number;
  order : Order;
  user : User;
  paymentForm: FormGroup;
  card: any;

  constructor(public formBuilder: FormBuilder,
    private storageService: StorageService,private paymentService: PaymentService,
    private stripeScriptTag: StripeScriptTag,private toastr: ToastrService,
    private orderLocal: OrderLocalStorageService, private router: Router) {

      this.order=new Order()
      this.user=new User();

      this.getUserInfo()

      if (!this.stripeScriptTag.StripeInstance) {
        this.stripeScriptTag.setPublishableKey('pk_test_51MvQE4KF6BtFLQH3B3bs07mB2YQ9Jl0CXvlIcN2lxiZVVYyWl8uKsl0Inoh1UkV86oGKoawhPrJpBwGH12u4rxzt00VL1KEG3I');
      }
      this.totalCost=0
      this.totalCost=this.paymentService.getTotalCost(this.orderLocal.getOrder().pizzas);
      
      this.paymentForm = this.formBuilder.group({
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        street: ['', Validators.required],
        zip: ['', Validators.required]
    });
    this.prefillData()
  }

  ngAfterViewInit(): void {
    this.injectStripeCard();
    this.order=this.orderLocal.getOrder();
  }

  injectStripeCard() {
    const stripe = this.stripeScriptTag.StripeInstance;
    const elements = stripe.elements();
    this.card = elements.create('card')
    this.card.mount(this.cardElement.nativeElement)
  }

  confirmPayment(event : Event) {
    event.preventDefault();
    const stripe = this.stripeScriptTag.StripeInstance
    this.paymentService.getClientSecret(this.totalCost*100).subscribe(
      data => {
        const result = stripe.confirmCardPayment(data.clientSecret,{
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.user.firstname+" "+this.user.lastname
            },
          },
        }).then(data => {
          const paymentMethod = data.paymentIntent?.payment_method
          this.setOrderDetails();
          this.order.paymentMethod=paymentMethod!;
        this.paymentService.saveOrder(this.order).subscribe(data => {
          this.toastr.success("Zapłacono poprawnie","Płatność");
          this.router.navigate(['/user/orders']);
        });
        })
      }
    )
  }

  getUserInfo() {
    this.storageService.getUserFromToken().subscribe((data) => {
      const user = data;
      this.user.firstname=data!.firstname
      this.user.lastname=data!.lastname
      this.user.username=data!.username
      this.user.phoneNumber=data!.phoneNumber
    })
  }

  prefillData() {
    this.paymentForm.get('username')?.setValue(this.user.username)
    this.paymentForm.get('firstname')?.setValue(this.user.firstname)
    this.paymentForm.get('lastname')?.setValue(this.user.lastname)
    this.paymentForm.get('phoneNumber')?.setValue(this.user.phoneNumber)
  }

  setOrderDetails() {
      this.order.address.city=this.paymentForm.get('city')?.value
      this.order.address.zip=this.paymentForm.get('zip')?.value
      this.order.address.street=this.paymentForm.get('street')?.value
      this.order.pizzas=this.orderLocal.getOrder().pizzas
      this.order.username=this.user.username;
      this.order.cost=this.totalCost;
  }

}
