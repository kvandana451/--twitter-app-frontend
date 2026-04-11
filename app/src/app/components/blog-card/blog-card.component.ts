import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TweetService } from '../../services/tweet.service';
import { NgFor } from '@angular/common';
import { Data, LikeClickData, LikesClickData } from '../../models/tweet-type';
import { DatabusService } from '../../services/databus.service';
import { CommemtsComponent } from '../commemts/commemts.component';

@Component({
  selector: 'app-blog-card',
  imports: [CardModule, NgFor, CommemtsComponent],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  constructor(
    private tweetService: TweetService,
    private dataBus: DatabusService,
  ) {}

  tweets!: Data[];

  // Display All Tweets
  displayAllTweets() {
    this.tweetService.getalltweets().subscribe({
      next: (resp) => {
        // this.notoficationService.showNotification('success', resp?.message);
        console.log(resp);
        this.tweets = resp.data;
        console.log(this.tweets);
      },
      error: (err) => {
        // this.notoficationService.showNotification('error', err?.message);
      },
    });
  }

  // like Tweets
  likeTweet(type: 'Tweet' | 'Comment', id: string) {
    this.tweetService.like({ onModel: type, likable: id }).subscribe({
      next: (resp) => {
        // this.tweet.likes = resp.data.likes;
        console.log(resp);
        const updatedLikes = resp.data.likes;
        const tweet = this.tweets.find((t) => t._id === id);
        //TRANSFORMING LIKED RESPONSE(Data transformation)
        let transformedLikeRes = resp.data.likes.map((item: LikesClickData) => {
          return {
            _id: item._id,
            user: {
              username:
                'Logged in user name should be there i havent written here',
              _id: item.user,
            },
          };
        });
        console.log(transformedLikeRes);
        const findTweet = this.tweets.find((t) => t._id === resp.data._id);
        console.log(findTweet);
        if (findTweet) {
          findTweet.likes = transformedLikeRes;

          //   // findTweet.likes.push(...transformedLikeRes);
          //   // const alreadyLiked = findTweet.likes.some(
          //   //   (like) => like.user._id === transformedLikeRes[0].user._id
          //   // );

          //   // if (alreadyLiked) {
          //   //   // UNLIKE → remove
          //   //   findTweet.likes = findTweet.likes.filter(
          //   //     (like) => like.user._id !== transformedLikeRes[0].user._id
          //   //   );
          //   // } else {
          //   //   // LIKE → add
          //   //   findTweet.likes.push(...transformedLikeRes);
          //   // }
        }
      },
      error: (err) => {},
    });
  }

  // ngOnInit runs once when component loads, but it can START things that keep running
  ngOnInit() {
    // HTTP Observables emit once and complete
    this.displayAllTweets();
    // Subjects are hot observables that can emit multiple times.
    this.dataBus.data$.subscribe((data) => {
      if (data) {
        console.log('Received:', data);
        // this.tweets = data;
        this.tweets.push(data);
      }
    });
  }
}
