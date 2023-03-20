import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";

export class Filter {

    constructor(
    public setId : string = 'OP01',
    public setName : string = "Romance Dawn",
    public color : string = "All",
    public role : string = "All",
    public cardType : string = "All",
    public type : string = "",
    public name : string = "",
    public rarity : string = "All",
    public effect : string = "",
    public power : number = -1,
    public counter : number = -1,
    public cost : number = -1,
    public condition : number = 0,
    public language : string = "All",
    public view : number = 0,
    public setOption : string = "OP01/Romance Dawn",
    ){}

}

@Injectable({
    providedIn: "root",
  })

  export class FilterAdapter implements Adapter<Filter> {
    adapt(item: any): Filter {
      return new Filter();
      }
    }


