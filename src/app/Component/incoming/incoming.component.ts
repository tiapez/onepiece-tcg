import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/Service/global.service';
import { CardListService } from 'src/app/Service/Implemented/CardList/card-list.service';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {

  constructor(private modalService: NgbModal,private globalService : GlobalService, private cardService : CardListService) { }

  ngOnInit(): void {
    this.globalService.isCardList = false;
    this.globalService.changeUrl();
  }
  st_07 : string[] = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017'];
  op_03 : string[] = ['001', '002', '003', '0052', '006', '015', '018', '018a', '021', '022', '024', '024a', '025', '025a', '030', '040', '047', 
  '047a', '058', '062', '076', '077', '081', '090', '092', '092a', '099', '107', '113', '119', '122', '123', 'pre10', 'pre12', 'pre13', 'pre14', 'pre3', 'pre4', 'pre5', 'pre6', 'pre7', 'pre8'];
  st_08 : string[] = ['pre'];
  st_09 : string[] = ['pre'];
  src! : string;

  open(content: any,src : string) {
    this.src = src;
    if(src.includes('pre')){
      this.modalService.open(content,{centered: true,size: 'xl'})
    }else{
      this.modalService.open(content,{centered: true})
    }
  }
  
}
