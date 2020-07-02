import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchModel} from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private extractDateString(date: Date): string {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  }

  hotelsList({departCity, country, date, nights, nightsTo}: SearchModel): Observable<any> {
    return this.http.get(`https://ht.kz/test/searchPartner1?departCity=${departCity.id}&country=${country.id}&date=${this.extractDateString(date)}&nights=${nights}&nightsTo=${nightsTo}`);
  }
}
