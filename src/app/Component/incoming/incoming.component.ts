import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/Service/global.service';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {

  constructor(private modalService: NgbModal,private globalService : GlobalService) { }

  ngOnInit(): void {
    this.globalService.isCardList = false;
    this.globalService.changeUrl();
  }

  op_04 : string[] = [];

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
