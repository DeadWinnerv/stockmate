import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

type TButton = 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  activeButton: TButton

  constructor(private router: Router, public auth: AuthService) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.activeButton = currentRoute?.data?.activeButton
      }
    });
  }
}
