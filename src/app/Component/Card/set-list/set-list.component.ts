import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { SetCard } from 'src/app/Model/SetCard/set-card.model';
import { GlobalService } from 'src/app/Service/global.service';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {

  constructor(public globalService: GlobalService, public cardService: CardListService) { }

  setCardList: SetCard[] = [];
  async ngOnInit() {
    this.cardService.filter.setOption = "OP04/Kingdoms of Intrigue";
    this.cardService.filter.setId = "OP04";
    this.cardService.changeFilter();
    this.globalService.changeUrl();
    this.cardService.getCardList2();
  }

  checkSet(cardList : CardDetails[]){
    let flag  = false;
    cardList.forEach(card => {
      if(this.cardService.cardIf(card)){
        flag = true;
        return;
      }

    });
    return flag;
  }

  

}
