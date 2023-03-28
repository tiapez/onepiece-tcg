import { Component } from '@angular/core';
import { GlobalService } from './Service/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-op';
  constructor(public globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.changeUrl();
    console.log(this.globalService.isCardList);
    console.warn(`🚨 Console output is disabled on production!`);
    // console.log = function (): void { };
    // console.debug = function (): void { };
    // console.warn = function (): void { };
    // console.info = function (): void { };
  }


}
