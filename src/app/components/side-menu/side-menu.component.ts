import { style, trigger, state, transition, animate, group } from '@angular/animations';
import { Component, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

type TButton = 'profile' | 'dashboard' | 'inventory' | 'orders' | 'storages' | 'products';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('menuHideAnimation', [
      state("shown", style({
        'width': '5vw'
      })),
      state('hidden', style({
        'width': '18vw'
      })),
      transition('shown <=> hidden', 
        animate('0.2s')
      )
    ])
  ]
})
export class SideMenuComponent {
  activeButton: TButton;
  hiddenMenu: boolean = false;
  
  @HostBinding('@menuHideAnimation') get state() {
    return this.hiddenMenu ? 'shown' : 'hidden'
  }
  @Output() hiddenMenuStateChange: EventEmitter<null> = new EventEmitter();

  changeMenuState = (): void => {
    this.hiddenMenu = !this.hiddenMenu
    this.hiddenMenuStateChange.emit(null);
  };

  constructor(private router: Router, public auth: AuthService) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const currentRoute =
          router.routerState.snapshot.root.firstChild?.routeConfig;
        this.activeButton = currentRoute?.data?.activeButton;
      }
    });
  }
}
