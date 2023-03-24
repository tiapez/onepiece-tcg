import { Component, Input } from '@angular/core';
import { CardActionService2 } from 'src/app/Service/Offline/CardAction/card-action.service';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { GlobalService } from 'src/app/Service/global.service';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';


@Component({
  selector: 'app-card-list-text',
  templateUrl: './card-list-text.component.html',
  styleUrls: ['./card-list-text.component.css']
})
export class CardListTextComponent {
  constructor(public cardService: CardListService, public globalService: GlobalService, public cardAction: CardActionService2) { }

  @Input() cardList! : CardDetails[];
  
  ngOnInit(): void {
    if (this.globalService.isUserCard)
      this.cardService.conta();
  }

}
