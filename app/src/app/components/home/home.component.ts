import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { CreateTweetComponent } from '../create-tweet/create-tweet.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CreateTweetComponent, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
