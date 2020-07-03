import {Component, Input, OnInit} from '@angular/core';
import {HotelResponse} from '../../models/hotelResponse';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent implements OnInit {
  @Input() card: HotelResponse;
  constructor() { }

  ngOnInit(): void {
  }

}
