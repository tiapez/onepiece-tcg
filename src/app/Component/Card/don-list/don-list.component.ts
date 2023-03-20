import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/Service/global.service';

@Component({
  selector: 'app-don-list',
  templateUrl: './don-list.component.html',
  styleUrls: ['./don-list.component.css']
})
export class DonListComponent {

  constructor(private globalService : GlobalService,private modalService: NgbModal) { }

  ngOnInit(){
    this.globalService.changeUrl();
  }

  don : string[] = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
  o_regional_w_1 = "<a href='https://en.onepiece-cardgame.com/events/2023/championship/online_regional_wave1.php' target='_blank'> Online Regional Championship </a> <br> March 2023 ";

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
