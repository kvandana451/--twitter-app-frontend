import { Component, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { StyleClass } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-drawer',
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    RouterLink,
    RouterLinkActive,
    NgFor,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }

  visible: boolean = false;

  drawerVisible: boolean = false;

  navItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Profile', icon: 'pi pi-user', route: '/profile' },
    { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
    { label: 'Messages', icon: 'pi pi-envelope', route: '/messages' },
  ];
}
