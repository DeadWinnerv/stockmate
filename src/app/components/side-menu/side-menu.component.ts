import { style, trigger, state, transition, animate } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

type TButton = 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages' | 'products';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('openCloseMenu', [
      state('open', style({
        'width': '18vw'
      })
      ),
      state('close', style({
        'width': '5vw'
      })
      ),
      transition('open => close', [
        animate('0.2s'),
      ]
      ),
      transition('close => open', [
        animate('0.2s'),
      ]
      )
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  activeButton: TButton;
  hiddenMenu: boolean = true;
  isLocked: boolean = true;
  screenWidth: number;
  
  constructor(private router: Router, public auth: AuthService) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute =
        router.routerState.snapshot.root.firstChild?.routeConfig;
        this.activeButton = currentRoute?.data?.activeButton;
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
