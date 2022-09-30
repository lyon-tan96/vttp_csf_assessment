// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Order, OrderList } from "./models";

@Injectable()
export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(newOrder: Order) {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    return firstValueFrom(
      this.http.post<Order>("api/order", newOrder, { headers })
    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string) { 
      return firstValueFrom(this.http.get<OrderList[]>(`api/order/${email}/all`))
  }

}
