import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Model/User/user.model';
import { CrypterService } from '../Crypt/crypter.service';

@Injectable({
  providedIn: 'root'
})
export class CryptServiceImpl {

  constructor(private cs: CookieService, private cryptService: CrypterService) { }

  private passKey = "1234567890123456";
  private userKey = "6543210987654321";
  private nickKey = "a54321098765432z";
  public nickCookie = "jver3894ksdf2";
  

  getPassCrypt(pass: string) {
    return this.cryptService.get(pass, this.passKey);
  }

  setPassCrypt(pass: string) {
    return this.cryptService.set(pass, this.passKey);
  }

  getCryptUser(user: string) {
    return this.cryptService.get(user, this.userKey)
  }

  setUserCrypt(user: string) {
    return this.cryptService.set(user, this.userKey)
  }

  getCryptNick(nick: string) {
    return this.cryptService.get(nick, this.nickKey)
  }

  setNickCrypt(nick: string) {
    return this.cryptService.set(nick, this.nickKey)
  }

  getNickCookieDecoded() {
    return this.getCryptNick(this.cs.get(this.nickCookie));
  }

  setCryptUserComplete(u : User){
    let user = this.cryptService.set(JSON.stringify(u), this.userKey );
    user = this.cryptService.set(user, this.passKey);
    return user;
  }

  getCryptUserComplete(u : string){
    let user = this.cryptService.get(u, this.passKey );
    user = this.cryptService.get(user, this.userKey);
    return user;
  }

}
