import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza';
import { PizzaService } from '../services/pizza.service';
import { SizeAndCost } from '../model/size-and-cost';
import { User } from '../model/user';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

  pizzas : Pizza[];
  user: User;
  user$: Observable<any>;
  displayedColumns: string[];
  constructor(private pizzaService: PizzaService,
    private storageService: StorageService,
    public dialog: MatDialog,
    private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
      this.pizzaService.findAll().subscribe(data => this.pizzas=data);
      this.user$=this.storageService.getUserFromToken();
      this.user$.subscribe(
        data => {
          this.user.firstname=data.firstname;
          this.user.lastname=data.lastname;
          this.user.role=data.role;
          this.user.phoneNumber=data.phoneNumber;
          this.user.username=data.username;
          if(this.user.role=='ADMIN') this.displayedColumns=['name', 'ingredients', 'sizes','card','edit','delete'];
          else this.displayedColumns=['name', 'ingredients', 'sizes','card'];
        }
      );
  }

  addToCard(pizza: Pizza,size: SizeAndCost) {
    this.pizzaService.addToCard(pizza,size)
  }

  editPizza(pizza: Pizza) {
    this.router.navigate(['/pizza/edit',pizza.id]);
  }

  deletePizza(id: number) {
    this.pizzaService.deletePizza(id).subscribe(
      () => this.pizzaService.findAll().subscribe(data => this.pizzas=data)
    )
  }

}
