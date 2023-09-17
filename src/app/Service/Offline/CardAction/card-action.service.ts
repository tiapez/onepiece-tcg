import { Injectable } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { ToastService } from '../../Implemented/Toast/toast.service';
import { CardListService } from '../CardList/card-list.service';
import { GlobalService } from '../../global.service';
import { Set } from 'src/app/Model/Set/set.model';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Card } from 'src/app/Model/Card/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardActionService2 {

  constructor(private toastService: ToastService, private cardService : CardListService, private globalService : GlobalService) { }


  addClassic(card: CardDetails) {
    //this.toastService.addSuccess();
    card.qty = card.qty + 1;
    this.cardService.saveUserCard(card.card.setId);
  }

  removeClassic(card: CardDetails) {
    //this.toastService.removeSuccess();
    card.qty = card.qty - 1;
    this.cardService.saveUserCard(card.card.setId);
  }

  async getCardMarketUrl(card : Card){
    var url2 = "https://www.cardmarket.com/it/OnePiece/Products/Singles/Pillars-of-Strength/PortgasDAce-OP03-001-V1?language=1&minCondition=5";

    var setList :  Set[] = await lastValueFrom(this.globalService.getSetList());
    
    var setName = "";
    setList.forEach(set => {
      if(set.id == card.setId){
        setName =set.name.split(' ').join('-').split('.').join('');
      }
    });

    var cardName = card.name.split('.').join('').split('"').join('').split(' ').join('-');
    var cardNumber = card.number.split('_').join('-');
    var cardSet = "-" + card.setId + "-";
    if(card.setId != card.originalSetId)
      cardSet = "-";
    var url = "https://www.cardmarket.com/it/OnePiece/Products/Singles/"+setName+"/"+cardName+cardSet+cardNumber;

    console.log(url);
    window.open(url, "_blank");
  }

  async getEbaytUrl(card : Card){

    var alt;
    var number;
    if(!/^[0-9]*$|.*V1$/.test(card.number)){
      alt="alt";
    }else{
      alt="";
    }
    if(/^[A-Za-z]+/.test(card.number)){
      number="";
      alt="special"
    }else{
      number=card.number.substring(0,3);
    }
    var url = "https://www.ebay.com/sch/i.html?_nkw="+card.name+"+"+card.setId+" "+number+" "+alt;

    console.log(url);
    window.open(url, "_blank");
  }

  async getVintedtUrl(card : Card){

    var alt;
    var number;
    if(!/^[0-9]*$|.*V1$/.test(card.number)){
      alt="alt";
    }else{
      alt="";
    }
    if(/^[A-Za-z]+/.test(card.number)){
      number="";
      alt="special"
    }else{
      number=card.number.substring(0,3);
    }
    var url = "https://www.vinted.it/catalog?search_text="+card.name+"+"+card.setId+" "+number+" "+alt;

    console.log(url);
    window.open(url, "_blank");
  }
}
