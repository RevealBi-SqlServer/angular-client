// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable } from 'rxjs';
// import { OrdersType } from '../models/orders/orders-type';
// import { ErrorHandlerService } from './error-handler.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {
//   constructor(
//     private http: HttpClient
//   ) { }

//   public getOrdersList(): Observable<OrdersType[]> {
//     return this.http.get<OrdersType[]>("https://excel2json.io/api/share/1e0599db-dc5e-4743-bd52-08dcf9e57512")
//       .pipe(catchError(ErrorHandlerService.handleError<OrdersType[]>('getOrdersList', [])));
//   }
// }
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrdersType } from '../models/orders/orders-type';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersData: OrdersType[] = [
    { "OrderID": 10248 },
    { "OrderID": 10249 },
    { "OrderID": 10250 },
    { "OrderID": 10251 },
    { "OrderID": 10252 },
    { "OrderID": 10253 },
    { "OrderID": 10254 },
    { "OrderID": 10255 },
    { "OrderID": 10256 }
  ];

  public getOrdersList(): Observable<OrdersType[]> {
    return of(this.ordersData); 
  }
}
