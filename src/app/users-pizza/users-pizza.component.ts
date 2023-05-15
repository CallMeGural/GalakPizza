import { Component } from '@angular/core';
import { User } from '../model/user';
import { PizzaService } from '../services/pizza.service';
import { StorageService } from '../services/storage.service';
import { Pizza } from '../model/pizza';
import { SizeAndCost } from '../model/size-and-cost';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-pizza',
  templateUrl: './users-pizza.component.html',
  styleUrls: ['./users-pizza.component.css'],
  providers: [StorageService, JwtHelperService],
})
export class UsersPizzaComponent {

  user: User;
  user$: Observable<any>;
  pizza: Pizza[]

  constructor(private pizzaService: PizzaService,private storageService: StorageService) {
      this.user$=storageService.getUserFromToken();
      this.loadPizzaByUser();
    }

  addToCard(pizza: Pizza,size: SizeAndCost) {
    console.log(pizza);
    this.pizzaService.addToCard(pizza,size)
  }

  deletePizza(id: number) {
    this.pizzaService.deletePizza(id).subscribe(() => this.loadPizzaByUser());
  }

  loadPizzaByUser() {
    this.user$.subscribe(user => {
      this.pizzaService
        .findAllByUser(user)
          .subscribe(data => this.pizza=data)
    })
  }

}
