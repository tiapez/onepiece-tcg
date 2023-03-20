import { Injectable } from '@angular/core';
import { ToastIntService } from 'src/app/Service/Interface/Toast/toast-int.service';
import { CryptServiceImpl } from '../../Utility/CryptImpl/crypt-impl.service'; 


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastService: ToastIntService, public cryptService: CryptServiceImpl) { }
  
  addSuccess(){
    this.toastService.show('Card Added Succesfully!', { classname: 'bg-success text-light', delay: 3000 });
  }

  addError(){
    this.toastService.show('Error Adding Card', { classname: 'bg-danger text-light', delay: 3000 });
  }

  removeSuccess(){
    this.toastService.show('Card Removed Succesfully!', { classname: 'bg-success text-light', delay: 3000 });
  }

  removeError(){
    this.toastService.show('Error Removing Card', { classname: 'bg-danger text-light', delay: 3000 });
  }

  userSaveError(){
    this.toastService.show('Error Saving User', { classname: 'bg-danger text-light', delay: 3000 });
  }

  userCreatedSuccess(){
    this.toastService.show('User Created Succesfully!', { classname: 'bg-success text-light', delay: 3000 });
  }

  userSaveSuccess(){
    this.toastService.show('User Saved Succesfully!', { classname: 'bg-success text-light', delay: 3000 });
  }

  userNotValid(){
    this.toastService.show('User Not Valid!', { classname: 'bg-danger text-light', delay: 3000 });
  }

  userLogin(){
    this.toastService.show('Welcome Back, '+ this.loginName() + '!!', { classname: 'bg-success text-light', delay: 3000 });
  }

  loginName(){
    let nick = this.cryptService.getNickCookieDecoded();
    nick = nick[0].toUpperCase() + nick.slice(1);
    return nick;
  }

  deckSuccess(){
    this.toastService.show('Deck Saved Succesfully!', { classname: 'bg-success text-light', delay: 3000 });
  }

  deckError(){
    this.toastService.show('Deck saving error', { classname: 'bg-danger text-light', delay: 3000 });
  }

}
