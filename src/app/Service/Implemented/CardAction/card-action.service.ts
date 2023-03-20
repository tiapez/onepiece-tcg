import { Injectable } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { CardActionIntService } from 'src/app/Service/Interface/CardAction/card-action-int.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CardActionService {

  constructor(private actionService: CardActionIntService, private toastService: ToastService) { }


  addClassic(card: CardDetails) {

    this.actionService.addCard(card.card.id).subscribe({
      next: () => { this.toastService.addSuccess() },
      error: () => this.toastService.addError(),
      complete: () => { card.qty = card.qty + 1 }
    });
  }

  removeClassic(card: CardDetails) {

    this.actionService.removeCard(card.card.id).subscribe({
      next: () => { this.toastService.removeSuccess() },
      error: () => this.toastService.removeError(),
      complete: () => { card.qty = card.qty - 1 }
    });
  }

  addDetails(card: CardDetails, details: Details) {

    this.actionService.addCardDetails(card.card.id, details).subscribe({
      next: () => { this.toastService.addSuccess() },
      error: () => this.toastService.addError(),
      complete: () => { details.qty = details.qty + 1; card.qty = card.qty + 1; }
    });
  }

  removeDetails(card: CardDetails, details: Details) {

    this.actionService.removeCardDetails(card.card.id, details).subscribe({
      next: () => { this.toastService.removeSuccess(); },
      error: () => this.toastService.removeError(),
      complete: () => { details.qty = details.qty - 1; card.qty = card.qty - 1; }
    });
  }

  getDetails(card: number, filter: Filter) {
    return this.actionService.getCardDetails(card, filter);
  }
}
