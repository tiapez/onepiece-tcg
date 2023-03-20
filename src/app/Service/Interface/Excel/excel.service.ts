import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  url = environment.apiUrl;
  private baseUrl = this.url + "/api/excel/";
  
  constructor(private http: HttpClient, private globalService: GlobalService) { }

    httpParams = new HttpParams().set("nick", this.globalService.getNickCookie());

  importExcel(file : File){
    let params = this.httpParams.set("set","OP02");
    let url = this.baseUrl+'importCardList';
    let fd = new FormData();
    fd.append('file', file);
    this.http.post(url,fd,{params}).subscribe();

  }
}
