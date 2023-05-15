import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza';
import { Ingredient } from '../model/ingredient';
import { PizzaService } from '../services/pizza.service';
import { User } from '../model/user';
import { StorageService } from '../services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SizeAndCost } from '../model/size-and-cost';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.css']
})
export class CreatePizzaComponent implements OnInit {

  pizza = new Pizza()
  ingredients: Ingredient[]
  proteins: Ingredient[]
  veggies: Ingredient[]
  sizeAndCosts: SizeAndCost[]
  sizeAdmin: SizeAndCost[] = [new SizeAndCost(), new SizeAndCost(), new SizeAndCost()]
  size: SizeAndCost
  user: User
  proteinAndVeggies = new FormControl('');
  dough = new FormControl('');
  cheese = new FormControl('');
  doSave: boolean;
  sizeCostForm: FormGroup;

  constructor(private pizzaService: PizzaService,private storageService: StorageService,
    public toastr: ToastrService,public formBuilder: FormBuilder,private router: Router) {
      this.sizeAdmin.at(0)!.size=30;
      this.sizeAdmin.at(1)!.size=40;
      this.sizeAdmin.at(2)!.size=50;
      this.sizeCostForm = this.formBuilder.group({
        cost1: ['', Validators.required],
        cost2: ['', Validators.required],
        cost3: ['', Validators.required],
        pizzaName: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.doSave=false;
    this.pizzaService.findAllIngredients().subscribe(data => this.ingredients=data);
    this.user=this.storageService.getUserDetails();
    this.pizzaService.getCustomPizzaSizeAndCost().subscribe(data => this.sizeAndCosts=data);
  }

  saveCustomPizza() {
      this.storageService.getUserByUsername(this.user.username).subscribe(data => {this.user=data
        if(this.proteins)
        this.proteins.forEach(ingredient => 
          this.pizza.ingredients.push(ingredient)
        )
        if(this.veggies)
        this.veggies.forEach(ingredient => 
          this.pizza.ingredients.push(ingredient)
        )
        this.pizza.name="Własna";
        this.pizzaService.addToCard(this.pizza,this.size);
        if(this.user.role=="USER" && this.doSave)  {
          this.pizza.custom=true;
          this.pizza.sizeAndCosts=this.sizeAndCosts;
          this.pizzaService.saveCustomPizza(this.pizza,this.user).subscribe(() => this.router.navigate(['/pizza/user']));
        }
        if(this.user.role=="ADMIN") this.createNewPizzaAsAdmin();
      });
      
    this.pizza.ingredients=[];
  }
  setProteins(options: any[]) {
    this.proteins=[]
      options.forEach(ingredient => this.proteins.push(ingredient.value))
    
  }
  setVeggies(options: any[]) {
    this.veggies=[]
      options.forEach(ingredient => this.veggies.push(ingredient.value))
  }

  setSize(value: SizeAndCost) {
    this.size=value;
  }

  setIfSave(checked: boolean) {
    this.doSave=!this.doSave
  }

  createNewPizzaAsAdmin() {
    this.sizeAdmin[0].cost=this.sizeCostForm.get('cost1')?.value;
    this.sizeAdmin[1].cost=this.sizeCostForm.get('cost2')?.value;
    this.sizeAdmin[2].cost=this.sizeCostForm.get('cost3')?.value;
    this.pizza.sizeAndCosts=this.sizeAdmin;
    this.pizza.name=this.sizeCostForm.get('pizzaName')?.value;
    this.pizzaService.saveNewPizza(this.pizza).subscribe(() => {
      this.router.navigate(['/pizza']);
      this.toastr.success("Zapisano poprawnie");
    }) 
  }

}
