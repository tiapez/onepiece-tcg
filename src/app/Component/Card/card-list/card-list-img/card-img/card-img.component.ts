import { Component,Input } from '@angular/core';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';
import { GlobalService } from 'src/app/Service/global.service';



@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.css']
})
export class CardImgComponent {

  constructor(public cardService : CardListService,public globalService : GlobalService){}
  @Input() cardDet!:CardDetails;

ngOnInit(){
  console.log('effect: ' +  this.cardDet.card.effect);
}

}
