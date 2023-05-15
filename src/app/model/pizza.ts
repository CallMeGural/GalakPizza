import { Ingredient } from "./ingredient";
import { SizeAndCost } from "./size-and-cost";
import { User } from "./user";

export class Pizza {
    id: number;
    name: string;
    ingredients: Ingredient[];
    sizeAndCosts: SizeAndCost[];
    custom: boolean;
    user = new User();
}
