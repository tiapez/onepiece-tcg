import { Component, Input } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { DeckService } from 'src/app/Service/Implemented/Deck/deck.service';
import { GlobalService } from 'src/app/Service/global.service';
import { CardActionService2 } from 'src/app/Service/Offline/CardAction/card-action.service';
import { lastValueFrom } from 'rxjs';
import { Set } from '../../../../../../Model/Set/set.model';
import { makeStateKey } from '@angular/platform-browser';




@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.css']
})
export class CardButtonComponent{
  @Input() cardDet!:CardDetails;

  constructor(public cardService : CardListService, public deckService : DeckService,public globalService : GlobalService, public offlineAciton : CardActionService2) { }

  async getCardMarketUrl(){
    var url2 = "https://www.cardmarket.com/it/OnePiece/Products/Singles/Pillars-of-Strength/PortgasDAce-OP03-001-V1?language=1&minCondition=5";

    var setList :  Set[] = await lastValueFrom(this.globalService.getSetList());
    
    var setName = "";
    setList.forEach(set => {
      if(set.id == this.cardDet.card.setId){
        setName =set.name.split(' ').join('-');
      }
    });

    var cardName = this.cardDet.card.name.split('.').join('').split(' ').join('-');
    var cardNumber = this.cardDet.card.number.split('_').join('-');
    var cardSet = "-" + this.cardDet.card.setId + "-";
    if(this.cardDet.card.setId != this.cardDet.card.originalSetId)
      cardSet = "-";
    var url = "https://www.cardmarket.com/it/OnePiece/Products/Singles/"+setName+"/"+cardName+cardSet+cardNumber;

    console.log(url);
    window.open(url, "_blank");
  }
}
