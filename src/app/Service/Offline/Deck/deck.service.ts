import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { Card, CardAdapter } from 'src/app/Model/Card/card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { DeckCard } from 'src/app/Model/DeckCard/deck-card.model';
import { UserDeck, UserDeckAdapter } from 'src/app/Model/UserDeck/user-deck.model';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient, private userDeckAdapter: UserDeckAdapter, private globalService: GlobalService,
    private cardAdapter: CardAdapter) { }

  public deckList: UserDeck[] = [];
  public deckSelected!: UserDeck;
  public deckListMargin!: any;
  public deckListHeight!: any;
  public leaderList: Card[] = [];
  public cardListForDeck!: CardDetails[];

  getUserDeck() {
    var asd: any = localStorage.getItem("deckList");
    var json: UserDeck[] = JSON.parse(asd);
    var userDecks: UserDeck[] = [];
    var userDeck: any = null;
    if (asd != null) {
      console.log(json);
      userDecks = json.map((item) => this.userDeckAdapter.adapt(item));
    }
    
    this.deckList = userDecks;
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

  addNewCard(card: CardDetails) {
    let flag = true;
    this.deckSelected.cardList.forEach(card2 => {
      if (card.card.id == card2.card.id) {
        this.addCard(card2);
        flag = false;
      }
    })

    if (flag) {
      let deckCard = new DeckCard();
      deckCard.card = card.card;
      deckCard.qtyRequired = 1;
      deckCard.qtyOwned = card.qty;
      this.deckSelected.cardList.push(deckCard);
    }
  }

  removeCard0(card: CardDetails) {
    this.deckSelected.cardList.forEach(card2 => {
      if (card.card.id == card2.card.id) {
        this.removeCard(card2);
      }
    })
  }


  saveOnlyDeck(deck: Deck) {
    if (deck.id == null) {
      var jsonList: UserDeck[] = [];
      var list: any = localStorage.getItem("deckList");
      if (list != null) {
        var jsonList: UserDeck[] = JSON.parse(list);
        deck.id = jsonList.length;
      }else{
        deck.id = 0;
      }
      var userDeck = new UserDeck();
      userDeck.deck = deck;
      userDeck.cardList = [];
      userDeck.leader = deck.leader;
      jsonList.push(userDeck);
      localStorage.setItem("deckList",JSON.stringify(jsonList));
    }else{
      var asd: any = localStorage.getItem("deckList");
      var json: UserDeck[] = JSON.parse(asd);
      var newList : UserDeck[] = [];
      json.forEach( userDeck =>{
          var temp = userDeck;
          if(userDeck.deck.id == deck.id){
              temp.deck = deck;
              temp.cardList = userDeck.cardList;
              temp.leader = userDeck.leader;
          }else{
            temp = userDeck;
          }
          newList.push(temp);
      });
      localStorage.setItem("deckList",JSON.stringify(newList));
    }
    console.log(deck);
  }

  deleteDeck(deckId: number) {
  }

}
