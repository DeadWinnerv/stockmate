import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMenu: boolean = true;
  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root.firstChild?.routeConfig;
        this.showMenu = !currentRoute?.data?.hideMenu;
      }
    });
  }
}
