import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalService } from 'src/app/Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {      
  constructor(private router: Router,private globalService : GlobalService) { }      
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
     if (this.globalService.isLogged()) {      
     return true;      
     }      
     // navigate to login page as user is not authenticated      
  this.router.navigate(['/signIn']);      
return false;      
}      
}
