import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";
import { Deck, DeckAdapter } from "../Deck/deck.model";
import { DeckCard, DeckCardAdapter } from "../DeckCard/deck-card.model";

export class UserDeck {
    public deck! : Deck;
    public cardList! : DeckCard[];
    public leader! : DeckCard;
}

@Injectable({
    providedIn: "root",
  })
  export class UserDeckAdapter implements Adapter<UserDeck> {
    constructor(public deckAdapter : DeckAdapter, public deckCardAdapter : DeckCardAdapter){}
    adapt(item : any): UserDeck {
      let userDeck = new UserDeck();
        userDeck.deck = this.deckAdapter.adapt(item.deck);
        userDeck.leader = this.deckCardAdapter.adapt(item.leader);
        userDeck.cardList = item.cardList.map((data : any) => this.deckCardAdapter.adapt(data));
      return userDeck;
    }
  }