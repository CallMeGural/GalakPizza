import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza';
import { ToastrService } from 'ngx-toastr';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit{

  constructor(private toastr: ToastrService,private pizzaService: PizzaService) {}

  pizza: Pizza[];
  columndefs : any[] = ['name','ingredients'];

  ngOnInit(): void {
    this.pizza=this.pizzaService.pizzaOrder.pizzas;
  }

  deleteFromOrder(pizza: Pizza) {
    console.log(pizza)
    this.pizza=this.pizza.filter(item => item !== pizza)
    this.pizzaService.pizzaOrder.pizzas=this.pizza;
    this.pizzaService.updateOrder();
    this.toastr.info("Usunięto z zamówienia")
  }  
}
