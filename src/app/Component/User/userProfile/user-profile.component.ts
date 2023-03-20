import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Model/User/user.model';
import { UserIntService } from 'src/app/Service/Interface/User/user-int.service';
import { CryptServiceImpl } from 'src/app/Service/Utility/CryptImpl/crypt-impl.service';
import { ToastService } from 'src/app/Service/Implemented/Toast/toast.service';
import { GlobalService } from 'src/app/Service/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {
  public user!: User;
  selectedFile!: Blob;


  constructor(private cryptService: CryptServiceImpl, private cookieService: CookieService,
    private userService: UserIntService
    , private toastService: ToastService, private globalService: GlobalService, private titleService : Title) { }


  ngOnInit() {
    this.userService.getUser(this.cryptService.getNickCookieDecoded()).subscribe({
      next: data => { this.user = data; },
      complete: () => this.decodeUser()
    });
    this.globalService.changeUrl();
    this.titleService.setTitle("Onepiece TCG - User Profile");
  }

  decodeUser() {
    this.user.username = this.cryptService.getCryptUser(this.user.username);
    this.user.nick = this.cryptService.getCryptNick(this.user.nick);
  }



  saveUserConfig() {
    this.userService.saveUserConfig(this.user, this.cryptService.setNickCrypt(this.user.nick)).subscribe({
      next: data => this.cookieService.set("navType", data),
      error: () => this.toastService.userSaveError(),
      complete: () => {this.saveUserPost() }
    });
  }

  imageChange(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String: string = (reader.result as string).replace('data:', '').replace(/^.+,/, '');
      this.user.image = base64String as unknown as Blob;
    };
  }

  saveUserPost(){
    this.globalService.setUser();
    this.toastService.userSaveSuccess();

  }
}
