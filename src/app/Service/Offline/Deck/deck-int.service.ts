import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { Card, CardAdapter } from 'src/app/Model/Card/card.model';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { UserDeck, UserDeckAdapter } from 'src/app/Model/UserDeck/user-deck.model';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class DeckIntService {
  
  constructor( private userDeckAdapter : UserDeckAdapter, private globalService : GlobalService,
    private cardAdapter : CardAdapter) { }

  url = environment.apiUrl;
  private baseUrl = this.url + "/api/deck/";
  httpParams = new HttpParams().set("nick", this.globalService.getNickCookie());



  getUserDeck(): Observable<UserDeck[]> {
    const url = `${this.baseUrl}userDecks`;
    let params = this.httpParams;
    return this.http.get<UserDeck[]>(url,{params}).pipe(
      map((data: UserDeck[]) => data.map((item) => this.userDeckAdapter.adapt(item)))
    );
  }



  saveUserDeck(deck : UserDeck) {
    const url = `${this.baseUrl}saveUserDeck`;
    return this.http.post(url,deck).pipe();
  }

  saveOnlyDeck(deck : Deck) {
    const url = `${this.baseUrl}saveOnlyDeck`;
    let params = this.httpParams;
    return this.http.post(url,deck,{params}).pipe();
  }

  getLeader() : Observable<Card[]> {
    const url = `${this.baseUrl}allLeader`;
    return this.http.get<Card[]>(url).pipe(
      map((data: Card[]) => data.map((item) => this.cardAdapter.adapt(item)))
    );
  }

  deleteDeck(deckId : number){
    const url = `${this.baseUrl}deleteDeck`;
    let params = this.httpParams.set("id",deckId);
    return this.http.delete(url,{params}).pipe();
  }

}
