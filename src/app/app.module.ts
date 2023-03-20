import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Component/User/userProfile/user-profile.component';
import { NavbarComponent } from './Component/Header/navbar/navbar.component';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import { SignInComponent } from './Component/User/sign-in/sign-in.component';
import { UserIntService } from './Service/Interface/User/user-int.service';
import { CardListImgComponent } from './Component/Card/card-list/card-list-img/card-list-img.component';
import { CardImgComponent } from './Component/Card/card-list/card-list-img/card-img/card-img.component';
import { FilterComponent } from './Component/Header/filter/filter.component';
import { ModalCardComponent } from './Component/Card/card-list/modal-card-view/modal-card.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerComponent } from './Component/Global/toast-container/toast-container.component';
import { NgbdToastGlobal } from './Component/Global/toast-global/toast-global.component';
import { ModalCardAddComponent } from './Component/Card/card-list/modal-card-add/modal-card-add.component';
import { CardButtonComponent } from './Component/Card/card-list/card-list-img/card-img/card-button/card-button.component';
import { CardListTextComponent } from './Component/Card/card-list/card-list-text/card-list-text.component';
import { CardListComponent } from './Component/Card/card-list/card-list.component';
import { CookieService } from 'ngx-cookie-service';
import { CrypterService } from './Service/Utility/Crypt/crypter.service';
import { GameCardComponent } from './Component/Card/card-list/modal-card-view/game-card/game-card.component';
import { HomeComponent } from './Component/Home/home.component';
import { DeckModifyComponent } from './Component/Deck/DeckModify/deck-modify.component';
import { DeckListComponent } from './Component/Deck/DeckList/deck-list.component';
import { DeckCreateComponent } from './Component/Deck/DeckCreate/deck-create.component';
import { ImportCardComponent } from './Component/Excel/import-card/import-card.component';
import { SetListComponent } from './Component/Card/set-list/set-list.component';
import { PromoFindJapComponent } from './Component/PromoFInd/Jap/promo-find-jap.component';
import { PromoFindGlobalComponent } from './Component/PromoFInd/Global/promo-find-global.component';
import { IncomingComponent } from './Component/incoming/incoming.component';
import { DonListComponent } from './Component/Card/don-list/don-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    CardListImgComponent,
    CardImgComponent,
    FilterComponent,
    ModalCardComponent,
    NgbdToastGlobal,
    ToastContainerComponent,
    ModalCardAddComponent,
    CardButtonComponent,
    CardListTextComponent,
    CardListComponent,
    GameCardComponent,
    HomeComponent,
    DeckModifyComponent,
    DeckListComponent,
    DeckCreateComponent,
    ImportCardComponent,
    SetListComponent,
    PromoFindJapComponent,
    PromoFindGlobalComponent,
    IncomingComponent,
    DonListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    CommonModule
  ],
  providers: [UserIntService,NgbActiveModal,CookieService,CrypterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
