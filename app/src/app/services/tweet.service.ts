import { Injectable } from '@angular/core';
import {
  CommentApiResponse,
  CreateTweet,
  Like,
  LikeCommentApiResponse,
  LikePayload,
  NewTweet,
  Tweets,
} from '../models/tweet-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  apiUrl = 'http://localhost:3000/api';
  //  `https://twitterapi-6tp6.onrender.com/api/tweets`,

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  // Function returns ONE thing → Observable (stream)
  // Inside stream → multiple channels (next, error, complete)
  // Function is NOT doing:return data OR return error ,instead it is doing return stream
  // If at least one path(stream) emits value → include that type
  //Ignore paths that emit nothing (never)
  createTweet(payload: CreateTweet): Observable<NewTweet> | Observable<never> {
    //typescript infers automatically,return type of the function  as Observable<NewTweet>,because we only mentioned response type of httpClient request as <NewTweet>
    let token = this.authService.getToken();
    if (!token) {
      // observable that throws the ERROR
      // if only error() runs → then never
      // throwError(...) → creates an Observable that immediately sends an error instead of data
      return throwError(() => new Error('Token is missing'));
    }

    // Observable that gives the DATA
    // If next() runs → it has a value (even null,undefined,[])
    return this.http.post<NewTweet>(`${this.apiUrl}/tweet`, payload, {
      // Attaching Authorization token to secure Apis
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // get all tweets to display.
  getalltweets() {
    return this.http.get<Tweets>(`${this.apiUrl}/tweets`);
  }

  // Like Tweets,comments
  like(payload: LikePayload) {
    let token = this.authService.getToken();

    return this.http.post<Like>(
      `${this.apiUrl}/likes/toggle`,
      payload,
      // Attaching Authorization token to secure Apis
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  // Comment
  tweetComment(payload: any) {
    let token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token is missing'));
    }
    return this.http.post<CommentApiResponse>(
      `${this.apiUrl}/comment`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  // like comment
  likeComment(payload: any) {
    let token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token is missing'));
    }
    return this.http.post<LikeCommentApiResponse>(
      `${this.apiUrl}/likes/toggle`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
