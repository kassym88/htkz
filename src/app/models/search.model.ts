import {CityModel} from './city.model';

export interface SearchModel {
  departCity?: CityModel;
  country?: CityModel;
  date?: Date;
  nights?: number;
  nightsTo?: number;
}
