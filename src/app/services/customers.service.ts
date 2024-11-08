import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CustomersType } from '../models/customers/customers-type';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomersList(): Observable<CustomersType[]> {
    return this.http.get<CustomersType[]>("https://excel2json.io/api/share/b2a9c35c-638c-47c9-bd53-08dcf9e57512")
      .pipe(catchError(ErrorHandlerService.handleError<CustomersType[]>('getCustomersList', [])));
  }
}
