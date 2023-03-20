import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { UserDeck } from 'src/app/Model/UserDeck/user-deck.model';
import { GlobalService } from 'src/app/Service/global.service';
import { DeckService } from 'src/app/Service/Implemented/Deck/deck.service';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/Service/Implemented/Toast/toast.service';
import { DeckIntService } from 'src/app/Service/Interface/Deck/deck-int.service';

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

  ngOnInit(): void {

    if (this.router.url.includes('create')) {
      this.name = 'CREATE';
      this.titleService.setTitle("Onepiece TCG - Create Deck");
      this.deck.name = '';
    }

    else {
      this.name = 'MODIFY';
      this.titleService.setTitle("Onepiece TCG - Modify Deck");
      this.leader = this.deckService.deckSelected.leader.card.id + '/'
        + this.deckService.deckSelected.leader.card.color;
      this.deck = this.deckService.deckSelected.deck;
    }

    this.deckService.getLeader();

    this.globalService.changeUrl();
  }

  ngOnDestroy(): void {
    this.deckService.deckSelected = new UserDeck();
  }

  changeLeader() {
    this.deck.leader = Number(this.leader.split('/')[0]);
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
      if(this.deck.format == 'Global'){
        this.deck.language = 'Eng';
      }else{
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
