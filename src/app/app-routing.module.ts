import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Component/User/sign-up/sign-up.component';
import { UserProfileComponent } from './Component/User/userProfile/user-profile.component';
import { CardListComponent } from './Component/Card/card-list/card-list.component';
import { SignInComponent } from './Component/User/sign-in/sign-in.component';
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
import { 
  AuthGuardService as AuthGuard 
} from './Component/Auth/auth-guard.service';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "signUp", component: SignUpComponent},
  {path: "signIn", component: SignInComponent},
  {path: "userProfile", component: UserProfileComponent},
  {path: "cardList", component: SetListComponent},
  {path: "userCard/classic", component: CardListComponent},
  {path: "userCard/details", component: CardListComponent},
  {path: "deck/cardList", component: DeckModifyComponent},
  {path: "deck", component: DeckListComponent},
  {path: "deck/create", component: DeckCreateComponent},
  {path: "deck/modify", component: DeckCreateComponent},
  {path: "import", component: ImportCardComponent},
  {path: "promo/jap", component: PromoFindJapComponent},
  {path: "promo/global", component: PromoFindGlobalComponent},
  {path: "incoming", component: IncomingComponent},
  {path: "don", component: DonListComponent},
  {path : "", redirectTo : "cardList", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
