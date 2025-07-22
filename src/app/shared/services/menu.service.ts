import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menuItems: Menu[] = [
    {
      icon: 'dashboard',
      option: 'Dashboard',
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
    },
    {
      icon: 'work',
      option: 'Proyectos',
      route: 'proyectos'
    },
    {
      icon: 'group_2',
      option: 'Clientes',
      route: 'clientes'
    }
  ]

  constructor() { }

  getMenuItems():Menu[]{
    return this.menuItems;
  }
}
