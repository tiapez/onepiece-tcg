import { Injectable } from "@angular/core";
import { Adapter } from "src/app/Adapter/adapter";

export class Deck {
  public id!: number;
  public userId!: number;
  public leader!: number;
  public name!: string;
  public color1!: string;
  public color2!: string;
  public desc!: string;
  public counter!: string;
  public side!: string;
  public note!: string;
  public format!: string;
  public language!: string;
  public cond!: number;
  public image!: Blob;
  constructor(){}
}

@Injectable({
  providedIn: "root",
})
export class DeckAdapter implements Adapter<Deck> {
  adapt(item: any): Deck {
    let deck = new Deck();
    deck.id = item.id;
    deck.leader = item.leader;
    deck.userId = item.userId;
    deck.name = item.name;
    deck.color1 = item.color1;
    deck.color2 = item.color2;
    deck.desc = item.desc;
    deck.counter = item.counter;
    deck.side = item.side;
    deck.format = item.format;
    deck.note = item.note;
    deck.cond = item.cond;
    deck.language = item.language;
    deck.image = item.image;
    return deck;
  }
}