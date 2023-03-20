import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/Service/global.service';


@Component({
  selector: 'app-promo-find-global',
  templateUrl: './promo-find-global.component.html',
  styleUrls: ['./promo-find-global.component.css']
})
export class PromoFindGlobalComponent {

  constructor(private globalService : GlobalService,private modalService: NgbModal){}
  
  ngOnInit(){
    this.globalService.changeUrl();
  }


  promo_pack_1 = ['001', '002', '003', '004', '005'];
  tournament_pack_1 = ['006', '007', '008', '009', '010'];
  winner_pack_1 = ['006a', '007a', '008a', '009a', '010a'];
  event_pack_1 = ['028', '029', '030', '031', '032'];
  uta_deck = ['011','012','013','014','015','016','017','018','019','020','021','022','023'];
  regional_pack_p = ['OP02-035a','OP02-098a','ST01-004a','ST03-014a','ST04-008a','ST07-008a'];
  regional_pack_f = ['OP02-035b','OP02-098b','ST01-004b','ST03-014b','ST04-008b','ST07-008b'];
  regional_pack_w = ['OP02-035c','OP02-098c','ST01-004c','ST03-014c','ST04-008c','ST07-008c'];
  twentyfifth = ['001d', 'OP01-001b', 'OP01-013b', 'OP01-016b', 'OP01-022a', 'ST01-002', 'ST01-005', 'ST01-006a', 'ST01-008', 'ST01-010'];

  tutorial = "<a href='https://en.onepiece-cardgame.com/events/2022/officialevents/tutorial_at_store.php' target='_blank'> Tutorial at store </a> <br> Mid-August, 2022~";

  store_tournament_1 = "<a href='https://en.onepiece-cardgame.com/events/2022/officialevents/store_tournament_vol1.php' target='_blank'> Official Store Tournament Vol. 1 </a> <br> December 2, 2022 – February 2023 ";

  pirates_party_22 = "<a href='https://en.onepiece-cardgame.com/events/2022/officialevents/pirates_party_vol1.php' target='_blank'> Pirates Party </a> <br> December 2022 – February 2023 ";

  treasure_cup_22 = "<a href='https://en.onepiece-cardgame.com/events/2023/officialevents/treasure_cup_february.php' target='_blank'> Treasure Cup </a> <br> February 4 – February 25, 2023";

  regional_w_1 = "<a href='https://en.onepiece-cardgame.com/events/2023/championship/index.php' target='_blank'> Regional Championship </a> <br> March 2023 - June 2023 ";
  
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
