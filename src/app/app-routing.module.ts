import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { PaymentComponent } from './payment/payment.component';
import { UsersPizzaComponent } from './users-pizza/users-pizza.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UpdatePizzaDetailsComponent } from './update-pizza-details/update-pizza-details.component';

const routes: Routes = [
  {path: 'pizza', component: PizzaListComponent},
  {path: 'orders/current', component: OrderFormComponent},
  {path: 'orders/payment', component: PaymentComponent},
  {path: 'pizza/create',component: CreatePizzaComponent},
  {path: 'pizza/user',component: UsersPizzaComponent},
  {path: 'ingredient/create',component: AddIngredientComponent},
  {path: 'admin/orders',component: OrderReviewComponent},
  {path: 'user/orders',component: UserOrdersComponent},
  {path: '',component: MainPageComponent},
  {path: 'pizza/edit/:id',component: UpdatePizzaDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
