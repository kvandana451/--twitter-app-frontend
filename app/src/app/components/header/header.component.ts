import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [
    Menu,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  avatarMenu: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        class: 'hide-on-mobile ',
      },

      { label: 'Dashboard', class: 'hide-on-desktop' },
      { label: 'Team', class: 'hide-on-desktop' },
      { label: 'Projects', class: 'hide-on-desktop' },
      { label: 'Calendar', class: 'hide-on-desktop' },
      { label: 'Reports', class: 'hide-on-desktop' },
    ];
    this.avatarMenu = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      // {
      //   separator: true,
      // },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
      },
    ];
  }
}
