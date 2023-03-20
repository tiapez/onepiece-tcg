import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CardDetails, CardDetailsAdapter} from 'src/app/Model/CardDetails/card-details.model';
import { Deck } from 'src/app/Model/Deck/deck.model';
import { SetAdapter } from 'src/app/Model/Set/set.model';
import { SetCard, SetCardAdapter } from 'src/app/Model/SetCard/set-card.model';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from '../../global.service';
import { Set } from 'src/app/Model/Set/set.model';

@Injectable({
  providedIn: 'root'
})
export class CardListIntService {
  url = environment.apiUrl;
  private baseUrl = this.url + "/api/card/";
  constructor(private http: HttpClient,
    private cardDetailsAdapter: CardDetailsAdapter, private globalService: GlobalService, private setCardAdapter: SetCardAdapter, private setAdapter: SetAdapter) { }
  httpParams = new HttpParams().set("nick", this.globalService.getNickCookie());

  getAllDetails(set: string): Observable<CardDetails[]> {
    const url = `${this.baseUrl}allDetails`;
    let params = this.httpParams.set("set", set);
    return this.http.get<CardDetails[]>(url, { params }).pipe(
      map((data: CardDetails[]) => data.map((item) => this.cardDetailsAdapter.adapt(item)))
    );
  }

  getAllClassic(set: string): Observable<CardDetails[]> {
    const url = `${this.baseUrl}allClassic`;
    let params = this.httpParams.set("set", set);
    return this.http.get<CardDetails[]>(url, { params }).pipe(
      map((data: CardDetails[]) => data.map((item) => this.cardDetailsAdapter.adapt(item)))
    );
  }

  getAll(): Observable<SetCard[]> {
    const url = `${this.baseUrl}all`;
    return this.http.get<SetCard[]>(url).pipe(
      map((data: SetCard[]) => data.map((item) => this.setCardAdapter.adapt(item)))
    );
  }

  getAll2(): Observable<SetCard[]> {
    let json_url = "./assets/cardList.json";
    return this.http.get<SetCard[]>(json_url).pipe(
      map((data: SetCard[]) => data.map((item) => this.setCardAdapter.adapt(item)))
    );
  }


  getDeckCard(deck: Deck): Observable<CardDetails[]> {
    const url = `${this.baseUrl}deckCardList`;
    let params = this.httpParams;
    return this.http.post<CardDetails[]>(url, deck, { params }).pipe(
      map((data: CardDetails[]) => data.map((item) => this.cardDetailsAdapter.adapt(item)))
    );
  }

  getSet(): Observable<Set[]> {
    const url = `${this.baseUrl}set`;
    return this.http.get<Set[]>(url).pipe(
      map((data: Set[]) => data.map((item) => this.setAdapter.adapt(item)))
    );
  }

  getSet2(): Observable<Set[]> {
    let json_url = "./assets/setList.json";
    return this.http.get<Set[]>(json_url).pipe(
      map((data: Set[]) => data.map((item) => this.setAdapter.adapt(item)))
    );
  }


  getDeckSet(format : string): Observable<Set[]> {
    const url = `${this.baseUrl}deckSet`;
    let params = new HttpParams().set("format", format);
    return this.http.get<Set[]>(url,{params}).pipe(
      map((data: Set[]) => data.map((item) => this.setAdapter.adapt(item)))
    );
  }

}
