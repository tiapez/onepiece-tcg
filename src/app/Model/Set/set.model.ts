import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";

export class Set {
public id! : string;
public name! : string;
public nCard! : number;
public nParallel! : number;
public format! : string;
public cardOwned : number = 0;
public parallelOwned : number = 0;
constructor(){}
}

@Injectable({
    providedIn: "root",
  })
  export class SetAdapter implements Adapter<Set> {
    adapt(item : any): Set {
      let set = new Set();
        set.id = item.id;
        set.name = item.name;
        set.nCard = item.nCard;
        set.nParallel = item.nParallel;
        set.format = item.format;
        
      return set;
    }
  }