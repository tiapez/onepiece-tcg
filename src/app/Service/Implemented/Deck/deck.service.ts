import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { DeckCard } from 'src/app/Model/DeckCard/deck-card.model';
import { UserDeck } from 'src/app/Model/UserDeck/user-deck.model';
import { DeckIntService } from 'src/app/Service/Interface/Deck/deck-int.service';
import { ToastService } from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private deckIntService: DeckIntService, private toastService : ToastService, private router : Router ) { }
  public deckList: UserDeck[] = [];
  public deckSelected!: UserDeck;
  public deckListMargin!: any;
  public deckListHeight!: any;
  public leaderList! : Card[];
  public cardListForDeck! : CardDetails[];

  getUserDeck() {
    this.deckIntService.getUserDeck().subscribe(
      {
        next: data => { this.deckList = data },
      }
    )
  }
  
  getLeader() {
    this.deckIntService.getLeader().subscribe({
      next: data => {this.leaderList = data}
    })
  }

  addCard(card: DeckCard) {
    card.qtyRequired = card.qtyRequired + 1;
    if (card.qtyRequired > 4)
      card.qtyRequired = 4;
  }

  removeCard(card: DeckCard) {
    card.qtyRequired = card.qtyRequired - 1;
    if (card.qtyRequired <= 0) {
      this.deckSelected.cardList.forEach((card2, index) => {
        if (card == card2) {
          this.deckSelected.cardList.splice(index, 1);
        }
      });
    }
  }

  createCard(card: CardDetails) {
    let flag = true;
    this.deckSelected.cardList.forEach(card2 => {
      if (card.card.id == card2.card.id) {
        this.addCard(card2);
        flag = false;
      }
    })

    if(flag){
      let deckCard = new DeckCard();
      deckCard.card = card.card;
      deckCard.qtyRequired = 1;
      deckCard.qtyOwned = card.qty;
      this.deckSelected.cardList.push(deckCard);
    }
  }

  removeDet(card: CardDetails) {
    this.deckSelected.cardList.forEach(card2 => {
      if (card.card.id == card2.card.id) {
        this.removeCard(card2);
      }
    })
  }

  saveUserDeck(){
    this.deckIntService.saveUserDeck(this.deckSelected).subscribe({
      error: err => this.toastService.deckError(),
      complete: () => this.toastService.deckSuccess()
    });
  }

  saveOnlyDeck(deck : Deck){
    this.deckIntService.saveOnlyDeck(deck).subscribe({
      error: err => this.toastService.deckError(),
      complete: () => this.toastService.deckSuccess()
    });
  }

  deleteDeck(deckId : number){
    this.deckIntService.deleteDeck(deckId).subscribe({
      complete : () => this.router.navigate(['/deck'])
    });
  }

}
