import { Component, Input } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { CardActionService } from 'src/app/Service/Implemented/CardAction/card-action.service';
import { CardListService } from 'src/app/Service/Implemented/CardList/card-list.service';
import { DeckService } from 'src/app/Service/Implemented/Deck/deck.service';
import { GlobalService } from 'src/app/Service/global.service';
import { CardActionService2 } from 'src/app/Service/Offline/CardAction/card-action.service';




@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.css']
})
export class CardButtonComponent{
  @Input() cardDet!:CardDetails;

  constructor(public cardService : CardListService, public deckService : DeckService,public globalService : GlobalService, public cardAction : CardActionService, public offlineAciton : CardActionService2) { }

}
