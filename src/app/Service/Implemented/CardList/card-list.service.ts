import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCardAddComponent } from 'src/app/Component/Card/card-list/modal-card-add/modal-card-add.component';
import { ModalCardComponent } from 'src/app/Component/Card/card-list/modal-card-view/modal-card.component';
import { Card } from 'src/app/Model/Card/card.model';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { Details } from 'src/app/Model/Details/details.model';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { CardListIntService } from 'src/app/Service/Interface/CardList/card-list-int.service';
import { GlobalService } from '../../global.service';
import { Set } from 'src/app/Model/Set/set.model';



@Injectable({
  providedIn: 'root'
})
export class CardListService {

  constructor(private cardListIntService : CardListIntService
    ,private modalService: NgbModal, public router: Router,private globalService : GlobalService){}
 
    public cardListDetails: CardDetails[] = [];
  public filter: Filter = new Filter();
  public setList!: Set[];

  getCardDetails() {
    this.cardListIntService.getAllDetails(this.filter.setId).subscribe({
      next: data => { this.cardListDetails = data },
      complete: () => this.conta()
    }
    )
  }

  getCardClassic() {
    this.cardListIntService.getAllClassic(this.filter.setId).subscribe(
      {
        next: data => { this.cardListDetails = data },
        complete: () => this.conta()
      }
    )
  }

  getCardAll() {
    return this.cardListIntService.getAll();
  }

  getCardAll2() {
    return this.cardListIntService.getAll2();
  }

  getSet() {
    return this.cardListIntService.getSet();
  }

  getSet2() {
    return this.cardListIntService.getSet2();
  }

  getDeckSet(format : string) {
    return this.cardListIntService.getDeckSet(format);
  }
  
  getCardDeck(deck: Deck) {
    this.cardListIntService.getDeckCard(deck).subscribe(
      {
        next: data => { this.cardListDetails = data },
        complete: () => {this.conta();}
      }
    )
  }

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
  


  changeFilter() {
    this.filter.setName = this.filter.setOption.split('/')[1];
    this.filter.setId = this.filter.setOption.split('/')[0];

    if(this.globalService.isClassic){
      this.cardListDetails = [];
      this.getCardClassic();
    }else{
      if(this.globalService.isDetails){
        this.cardListDetails = [];
        this.getCardDetails();
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

  setSetList(){
   this.getSet2().subscribe({
    next : data => {this.setList = data}
   });
  }
  


}
