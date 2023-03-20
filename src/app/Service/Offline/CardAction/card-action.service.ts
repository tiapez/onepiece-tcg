import { Injectable } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { CardActionIntService } from 'src/app/Service/Interface/CardAction/card-action-int.service';
import { ToastService } from '../../Implemented/Toast/toast.service';
import { DataService } from '../Data/data.service';


@Injectable({
  providedIn: 'root'
})
export class CardActionService2 {

  constructor(private actionService: CardActionIntService, private toastService: ToastService, private dataService : DataService) { }


  addClassic(card: CardDetails) {
    this.toastService.addSuccess();
    card.qty = card.qty + 1;
    this.dataService.saveUserCard("OP01");
  }

  removeClassic(card: CardDetails) {
    this.toastService.removeSuccess();
    card.qty = card.qty - 1;
    this.dataService.saveUserCard("OP01");
  }

}
