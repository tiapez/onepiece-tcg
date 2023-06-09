import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";
import { Card, CardAdapter } from "../Card/card.model";
import { Deck, DeckAdapter } from "../Deck/deck.model";
import { DeckCard, DeckCardAdapter } from "../DeckCard/deck-card.model";

export class UserDeck {
    public deck! : Deck;
    public cardList! : DeckCard[];
    public leader! : Card;
}

@Injectable({
    providedIn: "root",
  })
  export class UserDeckAdapter implements Adapter<UserDeck> {
    constructor(public deckAdapter : DeckAdapter, public deckCardAdapter : DeckCardAdapter, public cardAdapter : CardAdapter){}
    adapt(item : any): UserDeck {
      let userDeck = new UserDeck();
        userDeck.deck = this.deckAdapter.adapt(item.deck);
        userDeck.leader = item.leader;
        userDeck.cardList = item.cardList.map((data : any) => this.deckCardAdapter.adapt(data));
      return userDeck;
    }
  }