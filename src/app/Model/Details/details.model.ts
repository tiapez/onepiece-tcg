import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";

export class Details {
    constructor(
        public language:string,
        public condition:string,
        public codCondition : number,
        public qty:number,
        public userCardId:number
     ){}
}

@Injectable({
    providedIn: "root",
  })
  export class DetailsAdapter implements Adapter<Details> {
    adapt(item : Details): Details {
      return new Details( item.language, item.condition,item.codCondition,item.qty,item.userCardId);
    }
  }

  @Injectable({
    providedIn: "root",
  })
  export class DetailsAdapterFromDTO implements Adapter<Details> {
    adapt(item : any): Details {
      return new Details(  item.detailsDTO.language, item.detailsDTO.condition,item.detailsDTO.codCondition,item.detailsDTO.qty,item.detailsDTO.userCardId);
    }
  }