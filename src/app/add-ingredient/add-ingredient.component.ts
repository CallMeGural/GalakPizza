import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EType } from '../model/etype';
import { PizzaService } from '../services/pizza.service';
import { Ingredient } from '../model/ingredient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  types = Object.values(EType);
  ingredientForm: FormGroup<any>;

  constructor(private formBuilder: FormBuilder,
    private pizzaService: PizzaService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [null, Validators.required]
    })
  }
  onSubmit() {
    if(this.ingredientForm.valid) {
      const ingredient = new Ingredient()
      ingredient.name=this.ingredientForm.get('name')?.value
      ingredient.type=this.ingredientForm.get('type')?.value
      this.pizzaService.saveIngredient(ingredient).subscribe(
        () => this.toastr.success("Sukces","Zapisano składnik")
      );
    }
    else {
      this.toastr.error("Błąd formularza","Wprowadź poprawne dane")
      console.log(this.ingredientForm.errors)
      console.log(this.ingredientForm.value)
    }
  }


}
