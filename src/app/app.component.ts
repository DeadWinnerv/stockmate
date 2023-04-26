import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  shownMenu: boolean = true;
  hiddenMenu: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.shownMenu = !currentRoute?.data?.shownMenu;
      }
    });
  }

  handleMenuStateChange(): void {
    this.hiddenMenu = !this.hiddenMenu
  }
}
