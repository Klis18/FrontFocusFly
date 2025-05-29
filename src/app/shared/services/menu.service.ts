import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuItems: Menu[] = [
    {
      icon: 'dashboard',
      option: 'Panel de Control',
      route: ''
    },
    {
      icon: 'list',
      option: 'Tareas',
      route: ''
    },
    {
      icon: 'event',
      option: 'Eventos',
      route: ''
    }
  ]

  constructor() { }

  getMenuItems():Menu[]{
    return this.menuItems;
  }
}
