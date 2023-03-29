import { Component, Input } from '@angular/core';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { GlobalService } from 'src/app/Service/global.service';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';

@Component({
  selector: 'app-card-list-img',
  templateUrl: './card-list-img.component.html',
  styleUrls: ['./card-list-img.component.css']
})
export class CardListImgComponent {
  constructor( public cardService: CardListService,public globalService : GlobalService) { }

  @Input() cardList! : CardDetails[];

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
