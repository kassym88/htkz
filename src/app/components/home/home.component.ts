import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardsAmount = 5;
  cards = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.cardsAmount; i++) {
      this.cards.push(i);
    }
  }

}
