import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { UserDeck } from 'src/app/Model/UserDeck/user-deck.model';
import { GlobalService } from 'src/app/Service/global.service';
import { DeckService } from 'src/app/Service/Offline/Deck/deck.service';
import { Title } from '@angular/platform-browser';
import { Card } from 'src/app/Model/Card/card.model';

@Component({
  selector: 'app-deck-create',
  templateUrl: './deck-create.component.html',
  styleUrls: ['./deck-create.component.css']
})
export class DeckCreateComponent {

  constructor(private router: Router,
    public deckService: DeckService, private globalService: GlobalService, private titleService: Title) { }

  public deck: Deck = new Deck();
  public leader!: string;
  public name!: string;
  public l!: Card;

  ngOnInit(): void {

    this.l = JSON.parse('{"id":501,"number":"001","rarity":"Leader","setId":"OP01","name":"Roronoa Zoro (Parallel)","color":"Red","cardType":"Leader","type":"Supernovas/Straw Hat Crew","effect":"/DON!! x1/ /Your Turn/ All of your Characters gain +1000 power.@","cost":5,"power":5000,"counter":0,"role":"Slash"}');

    this.deckService.leaderList.push(this.l);
    if (this.router.url.includes('create')) {
      this.name = 'CREATE';
      this.titleService.setTitle("Onepiece TCG - Create Deck");
      this.deck.name = '';
    }

    else {
      this.name = 'MODIFY';
      this.titleService.setTitle("Onepiece TCG - Modify Deck");
      this.leader = this.deckService.deckSelected.leader.id + '/'
        + this.deckService.deckSelected.leader.color;
      this.deck = this.deckService.deckSelected.deck;
    }


    this.globalService.changeUrl();
  }

  ngOnDestroy(): void {
    this.deckService.deckSelected = new UserDeck();
  }

  changeLeader() {
    this.deck.leader = this.l;
    let color = this.leader.split('/')[1];
    if (color != undefined) {

      if (color.includes("-")) {
        this.deck.color1 = color.split("-")[0];
        this.deck.color2 = color.split("-")[1];
      } else {
        this.deck.color1 = color;
        this.deck.color2 = color;
      }
    }
    
  }

  saveDeck() {
    if (this.deckFlag()) {
      if (this.deck.format == 'Global') {
        this.deck.language = 'Eng';
      } else {
        this.deck.language = 'Jap';
      }
      this.deckService.saveOnlyDeck(this.deck);
    }
  }

  goBack() {
    this.router.navigate(['/deck']);
  }

  imageChange(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String: string = (reader.result as string).replace('data:', '').replace(/^.+,/, '');
      this.deck.image = base64String as unknown as Blob;
    };
  }

  deckFlag() {
    return (this.deck.name.length > 0 && this.deck.leader != undefined && this.deck.format != undefined && this.deck.cond != undefined);
  }

  deleteDeck() {
    this.deckService.deleteDeck(this.deck.id);
  }
}
