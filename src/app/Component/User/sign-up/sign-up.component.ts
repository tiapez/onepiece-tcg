import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User/user.model';
import { UserIntService } from 'src/app/Service/Interface/User/user-int.service';
import { CryptServiceImpl } from 'src/app/Service/Utility/CryptImpl/crypt-impl.service';
import { ToastService } from 'src/app/Service/Implemented/Toast/toast.service';
import { GlobalService } from 'src/app/Service/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  constructor(private userService: UserIntService, private cryptServiceImpl: CryptServiceImpl,
    private ts: ToastService, private router: Router, private globalService: GlobalService, private titleService: Title) { }
  public flag!: boolean;
  public flagUser1!: boolean;
  public flagUser2!: boolean;
  public flagPass!: boolean;
  public flagMail1!: boolean;
  public flagMail2!: boolean;
  public flagNick1!: boolean;
  public flagNick2!: boolean;
  public error: string = "";
  user: User = new User();

  ngOnInit() {
    this.globalService.changeUrl();
    this.titleService.setTitle("Onepiece TCG - Sign Up");
  }


  saveUser() {
    this.convalidateUser();
    if (this.flag) {
      let userToSave = new User();
      userToSave.password = this.user.password;
      userToSave.username = this.user.username.toLowerCase();
      userToSave.mail = this.user.mail.toLowerCase();
      userToSave.nick = this.user.nick.toLowerCase();

      userToSave.password = this.cryptServiceImpl.setPassCrypt(userToSave.password);
      userToSave.username = this.cryptServiceImpl.setUserCrypt(userToSave.username);
      userToSave.nick = this.cryptServiceImpl.setNickCrypt(userToSave.nick);

      this.userService.saveUser(userToSave).subscribe({
        next: data => this.flag = data,
        error: err => this.error = err,
        complete: () => this.redirect()
      });
    } else {
      this.ts.userNotValid();
    }
  }

  userValidation() {
    this.flagUser2 = this.userService.nickValidation(this.user.username);
    if (!this.flagUser2) {
      this.userService.checkUser(this.user.username).subscribe({
        next: data => this.flagUser1 = !data,
        error: err => this.error = err
      });
    }

  }

  passValidation() {
    this.flagPass = this.userService.passValidation(this.user.password);
  }

  nickValidation() {
    this.flagNick2 = this.userService.nickValidation(this.user.nick);
    if (!this.flagNick2) {
      this.userService.checkNick(this.user.nick).subscribe({
        next: data => this.flagNick1 = !data,
        error: err => this.error = err
      });
    }
  }

  mailValidation() {
    if (this.user.mail.length > 8) {
      this.flagMail1 = this.userService.mailValidation(this.user.mail);
      if (!this.flagMail1) {
        this.userService.checkMail(this.user.mail).subscribe({
          next: data => this.flagMail2 = !data,
          error: err => this.error = err
        })
      }
    } else {
      this.flagMail1 = true;
    }
  }

  convalidateUser() {
    this.flag = !this.flagUser2 && !this.flagUser1 && !this.flagMail1 && !this.flagMail2 && !this.flagNick2 && !this.flagNick1 && !this.flagPass
      && this.user.username != undefined && this.user.password != undefined && this.user.mail != undefined && this.user.nick != undefined;
  }

  redirect() {
    this.router.navigate(['home', { esit: 'SignUp' }])
      .then(() => {
        window.location.reload();
      });
  }

}