import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";
import { Card } from "../Card/card.model";
import { CardDetails, CardDetailsAdapterVoid } from "../CardDetails/card-details.model";
import { Set } from "../Set/set.model";
import { SetCard } from "../SetCard/set-card.model";
import { User } from "../User/user.model";

export class UserData {
    public userCards! : SetCard[];
    public user! : User;
}

@Injectable({
    providedIn: "root",
  })
  export class SetCardAdapter implements Adapter<SetCard> {
    constructor(public cardAdapter : CardDetailsAdapterVoid){}
    adapt(item : any): SetCard {
      let setCard = new SetCard();
        setCard.set = item.set;
        setCard.cardList = item.cardList.map((data : Card) => {
          data.setName = setCard.set.name ;
          return this.cardAdapter.adapt(data);
        }
        );
        
      return setCard;
    }
  }