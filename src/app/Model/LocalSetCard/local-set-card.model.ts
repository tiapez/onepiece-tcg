import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";
import { CardDetails } from "../CardDetails/card-details.model";
import { CardAdapter, LocalCard } from "../LocalCard/local-card.model";
import { Set } from "../Set/set.model";

export class LocalSetCard {
    public set! : string;
    public cardList! : LocalCard[];
      constructor() { }
}

@Injectable({
    providedIn: "root",
  })
  export class LocalSetCardAdapter implements Adapter<LocalSetCard> {
    constructor(public cardAdapter : CardAdapter){}
    adapt(item : any): LocalSetCard {
      let setCard = new LocalSetCard();
        setCard.set = item.set;
        setCard.cardList = item.cardList.map((data : LocalCard) => {
          return this.cardAdapter.adapt(data);
        }
        );
        
      return setCard;
    }
  }

