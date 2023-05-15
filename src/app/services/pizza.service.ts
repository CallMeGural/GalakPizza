import { Injectable } from '@angular/core';
import { Pizza } from '../model/pizza';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ingredient } from '../model/ingredient';
import { SizeAndCost } from '../model/size-and-cost';
import { Order } from '../model/order';
import { User } from '../model/user';
import { PizzaUser } from '../model/pizzaUser';
import { OrderLocalStorageService } from './order-local-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private pizzaUrl: string;
  private ingredientsUrl: string;
  private sizeAndCostUrl: string;
  private pizzaUser = new PizzaUser();
  public pizzaOrder = new Order();

  constructor(private http: HttpClient,private orderLocalStorageService: OrderLocalStorageService) {
    this.pizzaUrl='http://localhost:8082/pizza';
    this.ingredientsUrl='http://localhost:8082/ingredients'
    this.sizeAndCostUrl='http://localhost:8082/size-and-cost'
    const order = orderLocalStorageService.getOrder();
    if (order) {
      this.pizzaOrder = order;
    }
  }

  public findAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.pizzaUrl,httpOptions);
  }

  public findPizzaById(id: number) : Observable<Pizza> {
    return this.http.get<Pizza>(this.pizzaUrl+"/"+id,httpOptions);
  }

  public findAllByUser(user : User): Observable<Pizza[]> {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("username",user.username)
    return this.http.get<Pizza[]>(this.pizzaUrl+"/custom/"+user.username,httpOptions);
  }

  public findAllIngredients() : Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl,httpOptions);
  }

  addToCard(pizza: Pizza,size: SizeAndCost) {
    let pizzaClone=Object.assign({},pizza);
    pizzaClone.sizeAndCosts=[size];

    this.pizzaOrder.pizzas.push(pizzaClone);
    this.orderLocalStorageService.setOrder(this.pizzaOrder);
    console.log('order',this.orderLocalStorageService.getOrder())
  }

  updateOrder() {
    this.orderLocalStorageService.setOrder(this.pizzaOrder);
  }

  getCustomPizzaSizeAndCost(): Observable<SizeAndCost[]> {
      return this.http.get<SizeAndCost[]>(this.sizeAndCostUrl,httpOptions);
  }

  saveCustomPizza(pizza: Pizza,user:User): Observable<PizzaUser> {
      this.pizzaUser.pizza=pizza;
      this.pizzaUser.user=user;
      return this.http.post<PizzaUser>(this.pizzaUrl+"/custom",JSON.stringify({"pizza":pizza,"username": user.username}),httpOptions)
  }

  saveNewPizza(pizza: Pizza) : Observable<Pizza> {
    return this.http.post<Pizza>(this.pizzaUrl,JSON.stringify(pizza),httpOptions);
  }

  saveIngredient(ingredient : Ingredient) : Observable<Ingredient>{
      return this.http.post<Ingredient>(this.ingredientsUrl,JSON.stringify(ingredient),httpOptions);
  }

  deletePizza(id: number) : Observable<any> {
    return this.http.delete<Pizza>(this.pizzaUrl+"/"+id,httpOptions);
  }

  updatePizza(pizza : Pizza) : Observable<Pizza> {
    return this.http.put<Pizza>(this.pizzaUrl,JSON.stringify(pizza),httpOptions);
  }

}
