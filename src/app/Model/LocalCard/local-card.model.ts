import { Injectable } from "@angular/core";
import { Adapter } from "../../Adapter/adapter";

export class LocalCard {
  public id!:number;
  public qty!:number;
  constructor() { }
}

@Injectable({
    providedIn: "root",
  })

  export class CardAdapter implements Adapter<LocalCard> {
    adapt(item: LocalCard) : LocalCard {
      let card = new LocalCard();
        card.id = item.id; 
        card.qty = item.qty;
        return card;
      }
}

