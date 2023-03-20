import { Component} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Filter } from 'src/app/Model/Filter/filter.model';
import { DeckService } from 'src/app/Service/Implemented/Deck/deck.service';
import { CardListService } from 'src/app/Service/Implemented/CardList/card-list.service';
import { GlobalService } from 'src/app/Service/global.service';
import { Router } from '@angular/router';
import { Set } from 'src/app/Model/Set/set.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private deviceService: DeviceDetectorService, public cardService: CardListService, private deckService : DeckService, public globalService: GlobalService,private router : Router) { }

  isMobile: boolean = this.deviceService.isMobile();
  filterHeight: string | undefined;
  filterWidth: string | undefined;
  isCollapsed: boolean = true;

  setList : Set[] = [];

  numberList : number[] = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000];

  ngOnInit() {
    if (!this.isMobile) {
      this.filterWidth = "100%";
    }
    if(this.globalService.isDeck){
      this.cardService.getDeckSet(this.deckService.deckSelected.deck.format).subscribe({
        next : data => {this.setList = data}
      });
    }else{
      this.cardService.getSet().subscribe({
        next : data => {this.setList = data}
      });
    }

  }

  openFilter() {
    if (this.isMobile) {
      this.filterWidth = "100%";
    }
  }

  closeFilter() {
    this.filterWidth = "0";
  }

  reset() {
    if(this.globalService.isCardListAll){
      this.cardService.filter = new Filter();
      this.cardService.filter.setOption = "Any/Any";
      this.cardService.filter.setId = "Any";
      this.cardService.filter.setName = "Any";
    }else{
      this.cardService.filter = new Filter();
    }

  }


  conta() {
    this.cardService.conta();
  }

  ngAfterViewInit(){
    if(!this.isMobile){
      this.deckService.deckListMargin = document.getElementById('navbar')?.clientHeight; 
      this.deckService.deckListHeight = window.innerHeight - this.deckService.deckListMargin;
    }
  }

  interval: any;

  startTimer() {
    let time = 5000;
      this.interval = setInterval(() => {
        if(time > 0) {
          time--;
          this.deckService.deckListMargin = document.getElementById('navbar')?.clientHeight; 
          this.deckService.deckListHeight = window.innerHeight - this.deckService.deckListMargin;
        } else {
          clearInterval(this.interval);
        }
      },1)
    }

    openDeck(){
      if(document.getElementById("deckbar")!.classList.contains("deckClose")){
        document.getElementById("deckbar")!.classList.remove("deckClose");
        document.getElementById("deckbtn")!.innerHTML = "Close Deck";
      }else{
        document.getElementById("deckbar")!.classList.add("deckClose");
        document.getElementById("deckbtn")!.innerHTML = "Show Deck";
      }
    }

}
