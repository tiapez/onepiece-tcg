import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserIntService } from 'src/app/Service/Interface/User/user-int.service';
import { CryptServiceImpl } from 'src/app/Service/Utility/CryptImpl/crypt-impl.service';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/Service/global.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private userService: UserIntService, private router: Router, private cookie: CookieService
    , private cryptServiceImpl: CryptServiceImpl, private titleService : Title, private globalService : GlobalService) { }
  public user: string = "";
  public password: string = "";
  public error: string = "";
  public nick: string = "";
  public navbar : string = "";
  public headers!: Headers;

ngOnInit(){
  this.titleService.setTitle("Onepiece TCG - Sign In");
}


  loginButton() {
    const user = this.cryptServiceImpl.setUserCrypt(this.user);
    const password = this.cryptServiceImpl.setPassCrypt(this.password);
    this.userService.loginValidation(user, password).subscribe({
      next: data => this.nick = data,
      error: err => this.error = err,
      complete: () => this.redirect()
    });
  }

  redirect() {
    this.navbar = this.nick.split('/')[1];
    this.nick = this.nick.split('/')[0];
    this.nick = this.cryptServiceImpl.setNickCrypt(this.nick);
    console.error(this.nick);
    localStorage.setItem(this.cryptServiceImpl.nickCookie, this.nick);
    this.cookie.set(this.cryptServiceImpl.nickCookie, this.nick,{expires : 99999999999999});
    this.cookie.set("navType", this.navbar,{expires : 99999999999999});
    this.cookie.set("isLogged", "true",{expires : 99999999999999});
    this.globalService.setUser();
    this.router.navigate(['home', {esit: 'SignIn'}]);
  }
}
