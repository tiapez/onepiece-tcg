import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/Service/global.service';

@Component({
  selector: 'app-promo-find-jap',
  templateUrl: './promo-find-jap.component.html',
  styleUrls: ['./promo-find-jap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PromoFindJapComponent {

  constructor(private globalService: GlobalService,private modalService: NgbModal) { }
  
  ngOnInit() {
    this.globalService.isCardList = false;
    this.globalService.changeUrl();
  }

  uta_deck = ['011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023'];
  promo_pack_1 = ['001', '002', '003', '004', '005'];
  jump_pack_1 = ['007', '008', '009', '010'];
  promo_pack_2 = ['028', '029', '030', '031', '032'];
  standard_pack_1 = ['OP01-021', 'OP01-033', 'ST04-011'];
  standard_pack_2 = ['ST01-007', 'ST02-007', 'ST03-007', 'ST04-010'];
  twentyfifth = ['001d', 'OP01-001b', 'OP01-013b', 'OP01-016b', 'OP01-022a', 'ST01-002', 'ST01-005', 'ST01-006a', 'ST01-008', 'ST01-010'];

  teaching_tour_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/teaching_tour.php' target='_blank'> Teaching Tour </a> <br> From June 2022 ";

  meet_up_aug_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/summer-meetup.php' target='_blank'> Meet Up Event </a> <br> August 11, 2022 – August 15, 2022 ";

  meet_up_o_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/onlineevents/online-meetup/' target='_blank'> Meet Up Event online </a> <br> August 27, 2022 ";

  rookie_tour_oct_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/rookie-tours.php' target='_blank'> Rookie Tour </a> <br> October 1, 2022 – October 30, 2022 ";

  flag_ship_oct_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/flagship-battle_thailand.php' target='_blank'> Flag Ship Battle </a> <br> October 1, 2022 – October 30, 2022 ";

  meet_up_dcm_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/meetup.php' target='_blank'> Meet Up Event </a> <br> December 8, 2022 - February 7, 2023 ";

  stnd_btl_dcm_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/standardbattle.php' target='_blank'> Standard Battle </a> <br> December 8, 2022 - February 7, 2023 ";

  national_teaching_tour = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/national-teaching-tour.php' target='_blank'> National Teaching Tour </a> <br> From November 2022 ";

  flag_ship_battle_dcm_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/flagship-battle.php' target='_blank'> Flag Ship Battle </a> <br> December 3, 2022 – January 29, 2023 ";

  asia_cup_22 = "<a href='https://asia-en.onepiece-cardgame.com/events/2022/officialevents/championship/' target='_blank'> Asia Chiampionshin Cup </a> <br> February 2023 ";

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
