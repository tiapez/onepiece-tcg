import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, map, lastValueFrom } from 'rxjs';
import { Set, SetAdapter } from '../Model/Set/set.model';
import { SetCard, SetCardAdapter } from '../Model/SetCard/set-card.model';
import { CryptServiceImpl } from './Utility/CryptImpl/crypt-impl.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient, private setCardAdapter: SetCardAdapter,
    private setAdapter: SetAdapter, private router: Router, private cookieService: CookieService,
    private deviceService: DeviceDetectorService, private cryptService: CryptServiceImpl) { }

  public userLogged!: string;
  public navbarImg!: string;


  public constCardSetList: SetCard[] = [];
  public constSetList: Set[] = [];

  //FILTRI
  public isCardList: boolean = false;
  public isCardListAll: boolean = false;
  public isClassic: boolean = false;
  public isDetails: boolean = false;
  public isUserCard: boolean = false;
  public isDeck: boolean = false;
  public view: string = this.cookieService.get("view");
  public isMobile: boolean = this.deviceService.isMobile();

  changeUrl() {
    this.isClassic = false;
    this.isDetails = false;
    this.isUserCard = false;
    this.isCardList = false;
    this.isDeck = false;
    this.isCardListAll = false;

    if (this.router.url.includes('userCard')) {
      this.isCardList = true;
      this.isUserCard = true;
    }

    if (this.router.url.includes('userCard/classic')) {
      this.isCardList = true;
      this.isClassic = true;
    }

    if (this.router.url.includes('userCard/details')) {
      this.isCardList = true;
      this.isDetails = true;
    }

    if (this.router.url.includes('deck/cardList')) {
      this.isCardList = true;
      this.isDeck = true;
    }

    if (this.router.url.includes('cardList') && !this.router.url.includes('deck')) {
      this.isCardListAll = true;
      this.isCardList = true;
    }
  }

  changeView() {
    if (this.view == '0') {
      this.cookieService.set("view", "1");
      this.view = '1';
    } else {
      this.cookieService.set("view", "0");
      this.view = '0';
    }
  }

  getNickCookie() {
    return this.cookieService.get(this.cryptService.nickCookie);
  }

  public isLogged(): boolean {

    return this.cookieService.get('isLogged') == "true";

  }

  setUser() {
    if (this.isLogged()) {
      this.userLogged = this.cryptService.getNickCookieDecoded();
      this.navbarImg = this.cookieService.get("navType");
    } else {
      this.userLogged = "Guest";
      this.navbarImg = "Light";
    }
  }


  getSetList(): Observable<Set[]> {
    let json_url = "./assets/Json/setList.json";
    return this.http.get<Set[]>(json_url).pipe(
      map((data: Set[]) => data.map((item) => this.setAdapter.adapt(item)))
    );
  }

  getCardList(): Observable<SetCard[]> {
    let json_url = "./assets/cardList.json";
    return this.http.get<SetCard[]>(json_url).pipe(
      map((data: SetCard[]) => data.map((item) => this.setCardAdapter.adapt(item)))
    );
  }


  async setSetList() {
    this.constSetList = await lastValueFrom(this.getSetList());
  }

  async setCardList() {
    this.constCardSetList = await lastValueFrom(this.getCardList());
  }

}
