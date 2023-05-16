import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

type TButton = 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages' | 'products';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  activeButton: TButton = 'dashboard';
  hiddenMenu: boolean = true;
  isLocked: boolean = true;
  screenWidth: number;
  
  constructor(private router: Router, public auth: AuthService) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute =
        router.routerState.snapshot.root.firstChild?.routeConfig;
        this.activeButton = currentRoute?.data?.activeButton
      }
    });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }

  @HostBinding('openCloseMenu') get state() {
    return this.hiddenMenu ? 'close' : 'open'
  }

  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth
  }

  changeMenuState = (): void => {
    this.hiddenMenu = !this.hiddenMenu
  };

  handleMenuSize(): void {
    this.isLocked
    ? this.hiddenMenu = true
    : this.hiddenMenu = !this.hiddenMenu
  }
}
