import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModalLoginFormComponent } from './modal-login-form/modal-login-form.component';
import { ModalRegisterFormComponent } from './modal-register-form/modal-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';

import { httpInterceptorProviders } from './http.interceptor';
import { OrderFormComponent } from './order-form/order-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { StripeModule } from "stripe-angular";
import { PaymentComponent } from './payment/payment.component';
import { UsersPizzaComponent } from './users-pizza/users-pizza.component';
import { UpdatePizzaDetailsComponent } from './update-pizza-details/update-pizza-details.component'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MainPageComponent } from './main-page/main-page.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    NavigationBarComponent,
    ModalLoginFormComponent,
    ModalRegisterFormComponent,
    CreatePizzaComponent,
    OrderFormComponent,
    PaymentComponent,
    UsersPizzaComponent,
    UpdatePizzaDetailsComponent,
    AddIngredientComponent,
    OrderReviewComponent,
    UserOrdersComponent,
    MainPageComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: [],
      },
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    StripeModule.forRoot('pk_test_51MvQE4KF6BtFLQH3B3bs07mB2YQ9Jl0CXvlIcN2lxiZVVYyWl8uKsl0Inoh1UkV86oGKoawhPrJpBwGH12u4rxzt00VL1KEG3I')
  ],
  providers: [httpInterceptorProviders, JwtHelperService],
  bootstrap: [AppComponent,NavigationBarComponent]
})
export class AppModule { }
