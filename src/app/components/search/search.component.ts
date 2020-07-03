import {Component,  OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityModel} from '../../models/city.model';
import {ApiService} from '../../api/api.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {HotelResponse} from '../../models/hotelResponse';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  cities: CityModel[] = [
    {name: 'Алматы', id: 10},
    {name: 'Астана', id: 11}
  ];
  coutriesToGo = {
    10: [
      {name: 'Турция', id: 552},
      {name: 'Тайланд', id: 553}
    ],
    11: [
      {name: 'Турция', id: 552},
      {name: 'Чехия', id: 554}
    ]
  };
  countries: CityModel[] = [];
  nights: number[] = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  nightsTo = this.nights;
  form: FormGroup;
  private destroy$: Subject<void> = new Subject();

  displayedColumns: string[] = [
    'departCity',
    'date',
    'hotelName',
    'nights',
    'price'
  ];
  dataSource: HotelResponse[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      departCity: ['', [Validators.required]],
      country: ['', [Validators.required]],
      date: ['', [Validators.required]],
      nights: ['', [Validators.required]],
      nightsTo: ['', [Validators.required]]
    });
  }

  submitSearch(): void {
    if (!this.form.valid) {
      alert('Заполните все поля поиска');
    } else if (this.form.get('nights').value >= this.form.get('nightsTo').value) {
      alert('"Кол-во ночей до" должно быть больше "Кол-во ночей от"');
    } else {
      this.api
        .hotelsList(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: {tours: HotelResponse[]}) => this.dataSource = res.tours
            .map(a => ({...this.form.value, ...a}))
            .sort((a, b) => a.price - b.price)
        );
    }
  }

  changeDepartCity(event): void {
    this.countries = this.coutriesToGo[event.value.id];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
