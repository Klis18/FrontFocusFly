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
      route: 'dashboard'
    },
    {
      icon: 'list',
      option: 'Tareas',
      route: 'tareas'
    },
    {
      icon: 'event',
      option: 'Eventos',
      route: 'eventos'
    }
  ]

  constructor() { }

  getMenuItems():Menu[]{
    return this.menuItems;
  }
}
