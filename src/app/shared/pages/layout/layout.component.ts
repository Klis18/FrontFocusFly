import {MediaMatcher} from '@angular/cdk/layout';

import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../interfaces/menu.interface';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './layout.component.html',
  styles: `
    .sidenav-background{
      border-radius: 0 !important;
      color: white !important;
    }

    

    .example-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .example-is-mobile .example-toolbar {
      position: fixed;
      z-index: 2;
    }

    .example-sidenav-container {
      flex: 1;
    }

    .example-is-mobile .example-sidenav-container {
      flex: 1 0 auto;
    }
  `
})
export class LayoutComponent implements OnInit,OnDestroy{


  public menu: Menu[] = [];

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(private menuService: MenuService) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.menu = this.menuService.getMenuItems();
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
