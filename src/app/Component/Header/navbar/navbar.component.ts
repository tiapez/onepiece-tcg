import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GlobalService } from 'src/app/Service/global.service';
import { ToastService } from 'src/app/Service/Implemented/Toast/toast.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	constructor(private deviceService: DeviceDetectorService, public globalService: GlobalService
		, public router: Router, private route: ActivatedRoute,
		private toastService: ToastService) { }

	public navbarWidth: string = "";
	error!: any;

	ngOnInit() {
		this.globalService.setUser();
		this.error = this.route.snapshot.paramMap.get('error');
		if (this.error == 1) {
			this.toastService.userSaveSuccess();
		}
	}

	openNav() {
		this.navbarWidth = "100%";
	}

	closeNav() {
		if (this.deviceService.isMobile())
			this.navbarWidth = "0";
	}

	signUp() {
		if (this.globalService.isLogged()) {
			this.router.navigate(['/userProfile'])
		} else {
			this.router.navigate(['/signIn'])
		}
	}

}
