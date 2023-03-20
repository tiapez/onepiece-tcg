import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";

export class UserCard {
    constructor(
        public language:string,
        public condition:string,
        public cod_condition : number,
        public qty:number,
        public userCardId:number
     ){}
}

@Injectable({
    providedIn: "root",
  })
  export class UserCardAdapter implements Adapter<UserCard> {
    adapt(item : UserCard): UserCard {
      return new UserCard( item.language, item.condition,item.cod_condition,item.qty,item.userCardId);
    }
  }

  @Injectable({
    providedIn: "root",
  })
  export class UserCardAdapterFromDTO implements Adapter<UserCard> {
    adapt(item : any): UserCard {
      return new UserCard(item.detailsDTO.language, item.detailsDTO.condition,item.detailsDTO.cod_condition,item.detailsDTO.qty,item.detailsDTO.userCardId);
    }
  }