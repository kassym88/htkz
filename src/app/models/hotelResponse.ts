import {SearchModel} from './search.model';

export interface HotelResponse extends SearchModel{
  hotelName: string;
  price: number;
  currency: string;
}
