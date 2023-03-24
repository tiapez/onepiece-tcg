import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.cardService.getCardList().subscribe({
      next: data => { this.setCardList = data }
    });

    this.cardService.filter.setOption = "OP01/Romance Dawn";
    this.cardService.changeFilter();
    this.globalService.changeUrl();
  }

  contaFiltro(cardList : CardDetails[]){
    let n  = 0;
    cardList.forEach(card => {
      if(this.cardService.cardIf(card)){
        n++;
        return;
      }

    });
    if(n>0){
      return true;
    }else{
      return false;
    }
  }

}
