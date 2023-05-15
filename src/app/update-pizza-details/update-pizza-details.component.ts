import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Pizza } from '../model/pizza';
import { Ingredient } from '../model/ingredient';
import { PizzaService } from '../services/pizza.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-pizza-details',
  templateUrl: './update-pizza-details.component.html',
  styleUrls: ['./update-pizza-details.component.css']
})
export class UpdatePizzaDetailsComponent implements OnInit {
  ingredientList: Ingredient[]
  pizza: Pizza;
  proteinAndVeggies = new FormControl('');
  sizeAndCosts = new FormControl('');
  proteins : Ingredient[] = [];
  veggies : Ingredient[] = []; 

  constructor(private pizzaService: PizzaService, private route: ActivatedRoute,
    private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    const pizzaId=parseInt(this.route.snapshot.paramMap.get('id')!,10);
    console.log(pizzaId);
    this.pizzaService.findAllIngredients().subscribe(data => {
      this.ingredientList=data;
    });
    this.pizzaService.findPizzaById(pizzaId).subscribe(
      pizza => {
        this.pizza=pizza
      }
    )
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    if (!this.pizza || !this.pizza.ingredients) {
      return false;
    }
  
    const ingredientIds = new Set(this.pizza.ingredients.map(ing => ing.id));
    return ingredientIds.has(ingredient.id);
  }

  setVeggies(event: MatSelectionListChange) {
    this.veggies = event.source.selectedOptions.selected.map(option => option.value);
    console.log(this.veggies)
  }

  setProteins(event: MatSelectionListChange) {
    this.proteins = event.source.selectedOptions.selected.map(option => option.value);
    console.log(this.proteins)
  }

  onSubmit(name : string,cost1: string, cost2: string, cost3 :string) {
    this.pizza.name=name;
    if(this.proteins.length==0)
      this.proteins=this.pizza.ingredients.filter(ing => ing.type=='PROTEIN')
    if(this.veggies.length==0) 
      this.veggies=this.pizza.ingredients.filter(ing=> ing.type=='VEGGIES')
    this.pizza.ingredients=[]
    this.veggies.forEach(ingredient => 
      this.pizza.ingredients.push(ingredient)
    )
    this.proteins.forEach(ingredient => 
      this.pizza.ingredients.push(ingredient)
    )
    this.pizza.sizeAndCosts[0].cost=parseFloat(cost1);
    this.pizza.sizeAndCosts[1].cost=parseFloat(cost2);
    this.pizza.sizeAndCosts[2].cost=parseFloat(cost3);

    this.pizzaService.updatePizza(this.pizza).subscribe(()=> {
      this.router.navigate(['/pizza']);
      this.toastr.info("Zaktualizowano pizzę");
    })
  }

}
