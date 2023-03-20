import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/Service/global.service';
import { ToastService } from 'src/app/Service/Implemented/Toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public esit : any;
  constructor(private route: ActivatedRoute, private toastService : ToastService,private globalService : GlobalService, private titleService: Title) { }

  ngOnInit(): void {
    this.esit = this.route.snapshot.paramMap.get('esit');
    if(this.esit == 'success'){
      this.toastService.userCreatedSuccess();
    }
    if(this.esit == 'SignIn'){
      this.toastService.userLogin();
    }
    this.globalService.changeUrl();
    this.titleService.setTitle("Onepiece TCG - Home")
  }


}
