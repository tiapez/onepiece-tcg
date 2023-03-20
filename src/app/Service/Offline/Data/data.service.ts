import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';
import { LocalCard } from 'src/app/Model/LocalCard/local-card.model';
import { LocalSetCard, LocalSetCardAdapter } from 'src/app/Model/LocalSetCard/local-set-card.model';
import { SetCard } from 'src/app/Model/SetCard/set-card.model';
import { User } from 'src/app/Model/User/user.model';
import { UserData } from 'src/app/Model/UserData/user-data.model';
import { GlobalService } from '../../global.service';
import { DeckService } from '../../Implemented/Deck/deck.service';
import { CardListService } from '../CardList/card-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, public globalService: GlobalService, public cardService: CardListService,
    private deckService: DeckService, private titleService: Title, private localSetCardAdapter: LocalSetCardAdapter) { }

  public userSetCards: CardDetails[] = [];

  public users!: User[];

  getUserCards(setId: string) {
    this.userSetCards = [];
    var userCard: LocalSetCard = this.retriveUserCard(setId);
    var setCards: SetCard[] = [];
    this.cardService.getCardList().subscribe({
      next: data => { setCards = data },
      complete: () => {
        console.log(setCards.length);
        setCards.forEach(set => {
          if (set.set.id == setId) {
            var i = 0;
            set.cardList.forEach(card => {
              card.qtyMax = 4;
              if (userCard != null && userCard.cardList.length>i && card.card.id == userCard.cardList[i].id) {
                card.qty = userCard.cardList[i].qty;
                i++;
              } else {
                card.qty = 0;
              }
              this.userSetCards.push(card);
            })
          }
        });
      }
    });
    this.cardService.cardListDetails = this.userSetCards;
  }


  retriveUserCard(set: string) {
    var asd: any = localStorage.getItem("cardList");
    var json : LocalSetCard[] = JSON.parse(asd);
    var userCards: LocalSetCard[] = [];
    var userSetCards: any = null;
    if (asd != null) {
      userCards = json.map((item) => this.localSetCardAdapter.adapt(item));
      userCards.forEach(setCard => {
        if (setCard.set == set) {
          userSetCards = setCard;
        }

      })
    }

    return userSetCards;
  }

  saveUserCard(set: string) {
    var asd: any = localStorage.getItem("cardList");
    var json : LocalSetCard[] = JSON.parse(asd);
    var userCards: LocalSetCard[] = [];

    var userCardSet: LocalSetCard = new LocalSetCard();
    userCardSet.set = set;
    userCardSet.cardList = [];

    this.cardService.cardListDetails.forEach(card => {
      if (card.qty > 0) {
        var localCard: LocalCard = new LocalCard();
        localCard.id = card.card.id;
        localCard.qty = card.qty;
        userCardSet.cardList.push(localCard);
      }
    });

    if (asd != null) {
      userCards = json.map((item) => this.localSetCardAdapter.adapt(item));
      var i : number = 0;
      var n : number = 0;
      userCards.forEach(setCard => {
        if (setCard.set == set) {
          n=i;
        }
        i++;
      })
      userCards[n] = userCardSet;
    } else {
      userCards.push(userCardSet);
    }

    localStorage.setItem("cardList", JSON.stringify(userCards));
  }


  changeFilter(){
    this.getUserCards(this.cardService.filter.setId);
  }

}
