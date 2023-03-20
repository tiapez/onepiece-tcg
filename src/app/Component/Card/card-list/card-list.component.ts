import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { DeckService } from 'src/app/Service/Implemented/Deck/deck.service';
import { GlobalService } from 'src/app/Service/global.service';
import {Title} from "@angular/platform-browser";
import { SetCard } from 'src/app/Model/SetCard/set-card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { DataService } from 'src/app/Service/Offline/Data/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {


  constructor(private router: Router, public globalService: GlobalService, public cardService: CardListService,
    private deckService: DeckService,private titleService:Title,private dataService : DataService) { }

    @Input() setCardList : CardDetails[] = [];


    ngOnInit() {
    if (this.globalService.view == null || this.globalService.view == undefined || this.globalService.view == '') {
      this.globalService.changeView();
    }

    this.globalService.changeUrl();

    if (this.globalService.isUserCard || this.globalService.isDeck) {
      if (!this.globalService.isLogged()) {
        this.router.navigate(['/']);
      }
      this.cardService.filter = new Filter();
      if (this.globalService.isClassic) {
        this.dataService.getUserCards("OP01");
        this.titleService.setTitle("Onepiece TCG - Classic")
      }
      // if (this.globalService.isDetails) {
      //   this.cardService.getCardDetails();
      //   this.titleService.setTitle("Onepiece TCG - Details")
      // }
      // if (this.globalService.isDeck) {
      //   this.cardService.getCardDeck(this.deckService.deckSelected.deck);
      //   this.cardService.filter.setOption="Any/Any";
      //   this.cardService.changeFilter();
      //   this.titleService.setTitle("Onepiece TCG - DeckCard")
      // }
    } else {
      this.titleService.setTitle("Onepiece TCG - Card List")
    }
  }

  ngOnDestroy(){
    this.cardService.cardListDetails = []; 
  }

}
