import { Component, Input } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardDetails } from 'src/app/Model/CardDetails/card-details.model';
import { Details } from 'src/app/Model/Details/details.model';


@Component({
  selector: 'app-modal-card-add',
  templateUrl: './modal-card-add.component.html',
  styleUrls: ['./modal-card-add.component.css']
})
export class ModalCardAddComponent {

  @Input() public modalCard! : CardDetails;


  // constructor(public activeModal: NgbActiveModal,private cardAction : CardActionService,public cardService : CardListService) {
  // }
  
  // ngAfterViewInit() {
  // }

  // add(card : CardDetails,details : Details){
  //   this.cardAction.addDetails(card,details);
  // }

  // remove(card : CardDetails,details : Details){
  //   if(details.qty > 0)
  //   this.cardAction.removeDetails(card,details);
  // }

}
