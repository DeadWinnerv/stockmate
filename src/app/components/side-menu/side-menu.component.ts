import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  showMenu: boolean = true

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.showMenu = !currentRoute?.data?.hideMenu;
      }
    });
  }

  buttonValue: 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages'  = 'dashboard'
  setButtonValue(value: 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages'):void {
    this.buttonValue = value
  }
}
