import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Card } from 'src/app/Model/Card/card.model';
import { CardListService } from 'src/app/Service/Offline/CardList/card-list.service';

export interface CardData {
  imageId: string;
  state: 'default' | 'flipped' | 'matched';
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ])
    ])
  ]
})

export class GameCardComponent {
  data: CardData = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  constructor(public cardService: CardListService) { }
  @Input() card!: Card;
  @Input() set!: string;
  public description: string = "";

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
      this.description = this.createDescription();
    } else {
      this.data.state = "default";
    }
  }

  createDescription() {
    let desc: string = "";
    let descRows: string[] = this.card.effect.split('@');

    descRows.forEach(row => {
      if(row.length <2)
        return;
      let flag = row.includes('/Trigger/');

      if(flag){
        desc = desc.concat("<div class='trigger'>");
      }else{
        desc = desc.concat("<div class='row-text'>");
      }
      
      let rowDesc: string[] = row.split('/');

      rowDesc.forEach(descs => {
        let part: string = "";
        part = this.createBadge(descs);
        desc = desc.concat(part);
      }
      );
      
        desc = desc.concat("</div>");

    });
    desc = "<ng-content>" + desc + "</ng-content>";
    return desc;

  }



  createBadge(string: string) {
    switch (string) {
      case ("DON!! x1"):
      case ("DON!! x2"):
      case ("DON!! x3"):
        string = "<span class='badge bg-dark'>" + string + "</span>";
        break;
      case "Your Turn": case "Activate: Main": case "On Play": case "On K.O.": case "When Attacking": case "On Opponent Turn": case "On Block": case "Main": case "Opponent's Turn": case "End of Your Turn":
        string = "<span class='badge bg-blue'>" + string + "</span>";
        break;
      case "Blocker": case "Rush": case "Banish": case "Double Attack":
        string = "<span class='badge  bg-orange'>" + string + "</span>";
        break;
      case "Once Per Turn":
        string = "<span class='badge  bg-red'>" + string + "</span>";
        break;
      case "1": case "2": case "3": case "4":
        string = "<span class='badge bg-light rounded-pill text-dark border border-dark'>" + string + "</span>";
        break;
      case "Counter":
        string = "<span class='badge bg-counter'><i class='fas fa-bolt'></i>" + string + "</span>";
        break;
      case "Trigger":
        string = "<span class='badge bg-yellow'>" + string + "</span>";
        break;
      default:
          string = string.replace('<', '');
          string = string.replace('>', '');

          string = string.replace('[', '<b>[');
          string = string.replace(']', ']</b>');

          string = string.replace('{', '<b>{');
          string = string.replace('}', '}</b>');

          string = string.replace('(', '<b>(');
          string = string.replace(')', ')</b>');
        
        if (string.includes(':')) {
          string = "<b>" + string.split(':')[0] + ":</b>" + string.split(':')[1];
        }
        break;
    }
    return string;
  }

}

