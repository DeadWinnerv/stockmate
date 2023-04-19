import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

type TButton = 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  showMenu: boolean = true
  activeButton: TButton

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.showMenu = !currentRoute?.data?.hideMenu;
        this.activeButton = currentRoute?.data?.activeButton
      }
    });
  }
}
