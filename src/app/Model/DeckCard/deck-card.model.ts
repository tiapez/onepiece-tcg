import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";
import { Card, CardAdapter } from "../Card/card.model";

export class DeckCard {

public card! : Card;
public qtyRequired! : number;
public qtyOwned! : number;
public qtyMax! : number;
}

@Injectable({
    providedIn: "root",
  })
  export class DeckCardAdapter implements Adapter<DeckCard> {
    constructor(public cardAdapter : CardAdapter){}
    adapt(item : any): DeckCard {
      let deckCard = new DeckCard();
        deckCard.card = this.cardAdapter.adapt(item.card);
        deckCard.qtyOwned = item.qtyOwned;
        deckCard.qtyRequired = item.qtyRequired;
        deckCard.qtyMax = item.qtyMax;
        
      return deckCard;
    }
  }