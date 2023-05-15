import { Address } from "./address";
import { EOrderStatus } from "./eorderstatus";
import { Pizza } from "./pizza";
import { User } from "./user";

export class Order {
    paymentMethod: string;
    address = new Address();
    pizzas: Pizza[] = [];
    username : string;
    cost: number;
    status: EOrderStatus;
    placedAt: Date;
}