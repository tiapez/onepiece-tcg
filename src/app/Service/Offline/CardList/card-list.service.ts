import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, lastValueFrom } from 'rxjs';
import { ModalCardAddComponent } from 'src/app/Component/Card/card-list/modal-card-add/modal-card-add.component';
import { ModalCardComponent } from 'src/app/Component/Card/card-list/modal-card-view/modal-card.component';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails, CardDetailsAdapterVoid } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { Set, SetAdapter } from 'src/app/Model/Set/set.model';
import { SetCardAdapter, SetCard } from 'src/app/Model/SetCard/set-card.model';
import { GlobalService } from '../../global.service';
import { LocalCard } from 'src/app/Model/LocalCard/local-card.model';
import { LocalSetCard, LocalSetCardAdapter } from 'src/app/Model/LocalSetCard/local-set-card.model';
import {Clipboard} from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root'
})
export class CardListService {

  constructor(private http: HttpClient, private globalService: GlobalService, private setCardAdapter: SetCardAdapter,
    private setAdapter: SetAdapter, private modalService: NgbModal, private localSetCardAdapter: LocalSetCardAdapter,
    private cardAdapter: CardDetailsAdapterVoid,private clipboard: Clipboard) { }

  public cardListDetails: CardDetails[] = [];
  public filter: Filter = new Filter();
  public setList!: Set[];
  public setCardList: SetCard[] = [];
  public missingSetCardList: SetCard[] = [];


  //SERVIZI JSON


  getJsonCardList(set: string) {
    let json_url = "./assets/Json/" + set + ".json";
    this.http.get<Card[]>(json_url).subscribe()
    return this.http.get<Card[]>(json_url).pipe(map((data: Card[]) => data.map((item) => this.cardAdapter.adapt(item))));
  }

  //JSON TO MODEL
  async getSetCardList() {
    console.log('getSetCardList');
    this.setCardList = [];
    let localSetCard: SetCard;
    if (this.filter.setOption.toLowerCase().includes('any')) {
      // Utilizza Promise.all con map per eseguire le richieste asincrone in parallelo
      const promises = this.globalService.constSetList.map(async set => {
        let list: CardDetails[];
        list = await lastValueFrom(this.getJsonCardList(set.id));
        let temp: SetCard = new SetCard();
        temp.set = set;
        temp.cardList = list;
        return temp;
      });
      this.setCardList = await Promise.all(promises);
    } else {
      localSetCard = new SetCard();
      this.globalService.constSetList.forEach(set => {
        if (set.id == this.filter.setId) {
          localSetCard.set = set;
        }
      })
      var cardList = await lastValueFrom(this.getJsonCardList(this.filter.setId));
      localSetCard.cardList = cardList;
      this.setCardList.push(localSetCard);
    }
    console.log('finish getSetCardList');
  }
  
  async getFilteredList(){
    console.log("start");
    await this.getSetCardList();
    this.setCardList = this.setCardList.filter(object => {
      // Inserisci qui la tua condizione di filtro, ad esempio:
      // return setCard.someProperty === 'valore desiderato';
      return object.set.id === "OP01";
    });
    console.log("end");
  }


  async getUserCardList() {
    console.log('getUserCardList');
    this.setCardList = [];
    this.cardListDetails = [];

    this.globalService.constCardSetList.forEach(setCard => {
      var temp = new SetCard();
      temp = this.getUserCardsBySet(setCard, setCard.set.id);
      this.setCardList.push(temp);
    })

  }


  getUserCardsBySet(setCard: SetCard, id: string) {
    let userSetCards: SetCard = new SetCard();
    userSetCards.set = setCard.set;
    userSetCards.set.cardOwned = 0;
    userSetCards.set.parallelOwned = 0;
    userSetCards.cardList = [];
    var userCard: LocalSetCard = this.retriveUserCard(id);
    var i = 0;

    setCard.cardList.forEach(card => {
      card.qtyMax = 4;
      if (userCard != undefined && userCard.cardList.length > i && card.card.id == userCard.cardList[i].id) {
        card.qty = userCard.cardList[i].qty;
        i++;
        if (card.card.number.includes('_') || card.card.number.includes('-')) {
          if(card.card.number.includes('-')){
            userSetCards.set.parallelOwned++;
          }else{
            var n = Number(card.card.number.split('_V')[1]);
            if(n>1){
              userSetCards.set.parallelOwned++;
            }
            else{
              userSetCards.set.cardOwned++;
            }
          }
          
        } else {
          userSetCards.set.cardOwned++;
        }
      } else {
        card.qty = 0;
      }
      userSetCards.cardList.push(card);
    });

    return userSetCards;
  }

  retriveUserCard(set: string) {
    var json: any = localStorage.getItem("cardList-" + set);
    var userCardJson!: LocalSetCard;
    if (json != null) {
      userCardJson = JSON.parse(json);
    }

    return userCardJson;
  }

  saveUserCard(set: string) {

    var userCardSet: LocalSetCard = new LocalSetCard();
    userCardSet.set = set;
    userCardSet.cardList = [];

    this.setCardList.forEach(setCard => {
      if (setCard.set.id == set) {
        setCard.cardList.forEach(card => {
          if (card.qty > 0) {
            var localCard: LocalCard = new LocalCard();
            localCard.id = card.card.id;
            localCard.qty = card.qty;
            userCardSet.cardList.push(localCard);
          }
        })
      }
    });


    localStorage.setItem("cardList-" + set, JSON.stringify(userCardSet));
  }

  getCardmarketList(userSetCards: SetCard){
    var s : string = "";
    s = s.concat(userSetCards.set.id + " - " + userSetCards.set.name);
    userSetCards.cardList.forEach(card =>{
      if(card.qty == 0){
        s = s.concat('\r');
        //s = s.concat(card.card.number.substring(0,3) + " " + card.card.name)
        var version = "";
        if(card.card.number.includes('_'))
          version = card.card.number.split("_")[1];
        s = s.concat("1x " + card.card.name + " " + card.card.setId + "-" + card.card.number.substring(0,3) + ' (' + version + ')' + " (" + userSetCards.set.name + ")");
      }
    })
    console.log(s);
    this.clipboard.copy(s);
  }


  getMissingCardList(userSetCards: SetCard){
    var s : string = "";
    s = s.concat(userSetCards.set.id + " - " + userSetCards.set.name);
    userSetCards.cardList.forEach(card =>{
      if(card.qty == 0){
        s = s.concat('\r');
        if(userSetCards.set.id.includes('OP')){
        //s = s.concat(card.card.number.substring(0,3) + " " + card.card.name)
        var version = "";
        if(card.card.number.includes('_V2'))
          version = "ALT";
        if(card.card.number.includes('_V3'))
           version = "Manga"
        if(card.card.number.includes('-'))
          version = "Special"
        s = s.concat("1x " + card.card.name + " " + version);
        }

      }
    })
    console.log(s);
    this.clipboard.copy(s);
  }

  async completeBaseSet(set: string) {
    let setCardList: CardDetails[] = await lastValueFrom(this.getJsonCardList(set));
    var userCard: LocalSetCard = new LocalSetCard();
    userCard.set = set;
    userCard.cardList = [];
    var userCardLocal: LocalSetCard;

    var json: any = localStorage.getItem("cardList-" + set);
    userCardLocal = JSON.parse(json);
    var i = 0;


    setCardList.forEach(card => {
      let temp: LocalCard = new LocalCard;
      console.log(userCardLocal);
      if (json != null && card.card.id == userCardLocal.cardList[i].id) {
        temp = userCardLocal.cardList[i];
        i++;
      } else {
        temp.id = card.card.id;
        temp.qty = 1;
      }
      userCard.cardList.push(temp);
    })

    localStorage.setItem("cardList-" + set, JSON.stringify(userCard));
    this.getUserCardList();
  }



  //FILTRI
  changeFilter() {
    this.filter.setName = this.filter.setOption.split('/')[1];
    this.filter.setId = this.filter.setOption.split('/')[0];

    if (this.globalService.isCardListAll) {
      this.getSetCardList();
    }
    if (this.globalService.isClassic) {
      this.cardListDetails = [];
      this.getUserCardList();
    } else {
      if (this.globalService.isDetails) {
        this.cardListDetails = [];
      }
    }
  }

  cardIf(cardDet: CardDetails) {
    return cardDet.card.name.toLocaleLowerCase().includes(this.filter.name) 
    && (this.filter.rarity.includes('All') || cardDet.card.rarity == this.filter.rarity)
      && (this.filter.setId == cardDet.card.setId || this.filter.setId == 'Any') && cardDet.qtyMax != 0
      && (((this.globalService.isDetails) || (this.globalService.isClassic)) 
      && (this.filter.view == 0 || (this.filter.view == 1 && cardDet.qty > 0) || (this.filter.view == 2 && cardDet.qty == 0))
          || (!this.globalService.isUserCard && 
              (this.filter.color.includes('All') || cardDet.card.color.includes(this.filter.color)) 
              && (this.filter.role.includes('All') || cardDet.card.role.includes(this.filter.role))
              && (this.filter.cardType.includes('All') || cardDet.card.cardType == this.filter.cardType) 
              && (cardDet.card.type.toLocaleLowerCase().includes(this.filter.type))
              && (this.filter.power == -1 || cardDet.card.power == this.filter.power) 
              && (this.filter.counter == -1 || cardDet.card.counter == this.filter.counter)
              && (this.filter.cost == -1 || cardDet.card.cost == this.filter.cost))
          && (
            this.globalService.isDeck && cardDet.card.cardType != "Leader" 
            || !this.globalService.isDeck 
          )
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
  openView(card: Card) {
    const modalRef = this.modalService.open(ModalCardComponent, { centered: true });
    modalRef.componentInstance.modalCard = card;
    modalRef.componentInstance.modalSet = this.filter.setName;
    if (this.globalService.isCardListAll) {
      modalRef.componentInstance.modalSet = "PROVA2";
    }
  }

  openAdd(cardDet: CardDetails) {
    const modalRef = this.modalService.open(ModalCardAddComponent, { centered: true });
    modalRef.componentInstance.modalCard = cardDet;

  }

  async getCardList2(){
    while (!this.globalService.constCardSetList || this.globalService.constCardSetList.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Attendi per 100 millisecondi prima di verificare nuovamente
    }

      var setCardList: any = [];
      var setCard = [];
      var set;
      this.globalService.constCardSetList.forEach(object => {
        if(this.filter.setOption == 'Any/Any' || this.filter.setId == object.set.id){
          set = object.set;
          setCard = object.cardList.filter( card =>{
            return this.cardIf(card);
          })
          var a = new SetCard();
          a.set = set;
          a.cardList = setCard;
          setCardList.push(a)
        }
      });
      this.setCardList = setCardList;
  }


}
