import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { ModalCardAddComponent } from 'src/app/Component/Card/card-list/modal-card-add/modal-card-add.component';
import { ModalCardComponent } from 'src/app/Component/Card/card-list/modal-card-view/modal-card.component';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails, CardDetailsAdapter } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { Set, SetAdapter } from 'src/app/Model/Set/set.model';
import { SetCardAdapter, SetCard } from 'src/app/Model/SetCard/set-card.model';
import { GlobalService } from '../../global.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalCard } from 'src/app/Model/LocalCard/local-card.model';
import { LocalSetCard, LocalSetCardAdapter } from 'src/app/Model/LocalSetCard/local-set-card.model';
import { User } from 'src/app/Model/User/user.model';
import { UserData } from 'src/app/Model/UserData/user-data.model';
import { DeckService } from '../../Implemented/Deck/deck.service';


@Injectable({
  providedIn: 'root'
})
export class CardListService {

  constructor(private http: HttpClient,
    private cardDetailsAdapter: CardDetailsAdapter, private globalService: GlobalService, private setCardAdapter: SetCardAdapter, private setAdapter: SetAdapter ,private modalService: NgbModal, private localSetCardAdapter: LocalSetCardAdapter) { }

    public cardListDetails: CardDetails[] = [];
    public filter: Filter = new Filter();
    public setList!: Set[];

    //SERVIZI CARD
  getSetList(): Observable<Set[]> {
    let json_url = "./assets/setList.json";
    return this.http.get<Set[]>(json_url).pipe(
      map((data: Set[]) => data.map((item) => this.setAdapter.adapt(item)))
    );
  }

  getCardList(): Observable<SetCard[]> {
    let json_url = "./assets/cardList.json";
    return this.http.get<SetCard[]>(json_url).pipe(
      map((data: SetCard[]) => data.map((item) => this.setCardAdapter.adapt(item)))
    );
  }

  public userSetCards: CardDetails[] = [];

  getUserCards(setId: string) {
    this.userSetCards = [];
    var userCard: LocalSetCard = this.retriveUserCard(setId);
    var setCards: SetCard[] = [];
    this.getCardList().subscribe({
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
    this.cardListDetails = this.userSetCards;
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

    this.cardListDetails.forEach(card => {
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


  //FILTRI
  changeFilter() {
    this.filter.setName = this.filter.setOption.split('/')[1];
    this.filter.setId = this.filter.setOption.split('/')[0];

    if(this.globalService.isClassic){
      this.cardListDetails = [];
      this.getUserCards(this.filter.setId);
    }else{
      if(this.globalService.isDetails){
        this.cardListDetails = [];
        this.getCardList();
      }
    }
  }

  cardIf(cardDet : CardDetails){
    return cardDet.card.name.toLocaleLowerCase().includes(this.filter.name) && (this.filter.rarity.includes('All') || cardDet.card.rarity.includes(this.filter.rarity)) 
    && (this.filter.setId.includes(cardDet.card.setId) || this.filter.setId == 'Any') && cardDet.qtyMax != 0
    && (( (this.globalService.isDetails) ||(this.globalService.isClassic) ) && (this.filter.view == 0 || (this.filter.view == 1 && cardDet.qty > 0) || (this.filter.view == 2 && cardDet.qty == 0)) 
    ||
    (!this.globalService.isUserCard  && (this.filter.color.includes('All') || cardDet.card.color.includes(this.filter.color)) && (this.filter.role.includes('All') || cardDet.card.role.includes(this.filter.role)) 
    && (this.filter.cardType.includes('All') || cardDet.card.cardType.includes(this.filter.cardType)) && (cardDet.card.type.toLocaleLowerCase().includes(this.filter.type))
     &&  (this.filter.power == -1 || cardDet.card.power == this.filter.power) && (this.filter.counter == -1 || cardDet.card.counter == this.filter.counter) && (this.filter.cost == -1 || cardDet.card.cost == this.filter.cost))
    );
  }

  conta() {
    let c: number = 0;
    this.cardListDetails.forEach((cardDet: CardDetails) => {
      cardDet.cardDetails.forEach((dto: Details) => {
        if ((this.filter.condition == 0 || this.filter.condition >= dto.codCondition) && (this.filter.language.includes('All') || dto.language.includes(this.filter.language))) {
          c = c + dto.qty;
        }
      })
      cardDet.qty = c;
      c = 0;
    });
  }




  //MODAL
  openView(card : Card) {
    const modalRef = this.modalService.open(ModalCardComponent,{centered: true});
    modalRef.componentInstance.modalCard = card;
    modalRef.componentInstance.modalSet = this.filter.setName;
    if(this.globalService.isCardListAll){
      modalRef.componentInstance.modalSet = "PROVA2";
    }
  }

  openAdd(cardDet : CardDetails) {
    const modalRef = this.modalService.open(ModalCardAddComponent,{centered: true});
    modalRef.componentInstance.modalCard = cardDet;

  }



  
}
