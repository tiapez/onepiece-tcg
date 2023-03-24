import { Injectable } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { ToastService } from '../../Implemented/Toast/toast.service';
import { CardListService } from '../CardList/card-list.service';


@Injectable({
  providedIn: 'root'
})
export class CardActionService2 {

  constructor(private toastService: ToastService, private cardService : CardListService) { }


  addClassic(card: CardDetails) {
    this.toastService.addSuccess();
    card.qty = card.qty + 1;
    this.cardService.saveUserCard("OP01");
  }

  removeClassic(card: CardDetails) {
    this.toastService.removeSuccess();
    card.qty = card.qty - 1;
    this.cardService.saveUserCard("OP01");
  }

}
