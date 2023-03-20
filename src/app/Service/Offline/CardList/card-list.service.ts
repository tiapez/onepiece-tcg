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
import { DataService } from '../Data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CardListService {

  constructor(private http: HttpClient,
    private cardDetailsAdapter: CardDetailsAdapter, private globalService: GlobalService, private setCardAdapter: SetCardAdapter, private setAdapter: SetAdapter ,private modalService: NgbModal) { }

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


  //FILTRI
  changeFilter() {
    this.filter.setName = this.filter.setOption.split('/')[1];
    this.filter.setId = this.filter.setOption.split('/')[0];

    if(this.globalService.isClassic){
      this.cardListDetails = [];
      this.getCardList();
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
