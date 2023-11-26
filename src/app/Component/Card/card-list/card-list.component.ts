import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { DeckService } from 'src/app/Service/Offline/Deck/deck.service';
import { GlobalService } from 'src/app/Service/global.service';
import {Title} from "@angular/platform-browser";
import { SetCard } from 'src/app/Model/SetCard/set-card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {


  constructor(private router: Router, public globalService: GlobalService, public cardService: CardListService,
    private deckService: DeckService,private titleService:Title) { }

    @Input() setCardList : CardDetails[] = [];


    async ngOnInit() {
      while(this.globalService.constCardSetList.length == 0){
        await new Promise<void>(resolve => setTimeout(()=>resolve(), 1000)).then(()=>console.log("fired"));
      }
    if (this.globalService.view == null || this.globalService.view == undefined || this.globalService.view == '') {
      this.globalService.changeView();
    }

    this.globalService.changeUrl();

    if (this.globalService.isUserCard || this.globalService.isDeck) {
      this.cardService.filter = new Filter();
      this.cardService.getUserCardList();
      if (this.globalService.isClassic) {
        this.titleService.setTitle("Onepiece TCG - Classic")
      }
    } else {
      this.titleService.setTitle("Onepiece TCG - Card List")
    }

    console.log(this.globalService.isDeck);
  }

  ngOnDestroy(){
    this.cardService.cardListDetails = []; 
  }

}
