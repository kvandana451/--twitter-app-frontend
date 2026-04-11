import { Component, Input } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CommentData } from '../../models/tweet-type';

@Component({
  selector: 'app-commemts',
  imports: [NgFor, NgIf, JsonPipe],
  templateUrl: './commemts.component.html',
  styleUrl: './commemts.component.scss',
})
export class CommemtsComponent {
  @Input() tweetId?: string;
  // @Input() comments?: CommentData[] = []; //EQ1
  @Input() comments?: any; //EQ1
  // Track if the child comment section is visible
  isExpanded: boolean = false;
  expandedCommentId: string | null = null;
  // Add an optional Input for parentId and model
  @Input() parentId?: string;
  @Input() parentModel: 'Tweet' | 'Comment' = 'Tweet';
  // Add this property
  activeReplyId: string | null = null;
  // @Input() isRoot: boolean = false;

  constructor(private tweetService: TweetService) {}
  addReply(content: string, parentComment: any) {
    if (!content) return;

    const payload = {
      onModel: 'Comment',
      commentable: parentComment._id,
      content: content,
    };

    this.tweetService.tweetComment(payload).subscribe({
      next: (resp) => {
        if (resp.data) {
          // Ensure the parent has a comments array initialized
          if (!parentComment.comments) {
            parentComment.comments = [];
          }
          // Push the new reply directly into the specific comment's children
          parentComment.comments.push(resp.data);
          this.activeReplyId = null; // Close the reply box
        }
      },
    });
  }
  Comment(content: string) {
    if (!content) return;
    console.log(content, this.tweetId);
    // let payload = {
    //   onModel: 'Tweet',
    //   commentable: `${this.tweetId}`,
    //   content: content,
    // };
    // Use the Input parentId if provided, otherwise fallback to the component's tweetId
    const targetId = this.parentId || this.tweetId;
    const onModel = this.parentModel;

    let payload = {
      onModel: onModel,
      commentable: targetId,
      content: content,
    };
    this.tweetService.tweetComment(payload).subscribe({
      next: (resp) => {
        // this.notoficationService.showNotification('success', resp?.message);
        console.log(resp);

        if (resp.data) {
          //EQ2
          console.log(resp.data, this.comments);
          this.comments?.push(resp.data);
        }
      },
      error: (err) => {
        // this.notoficationService.showNotification('error', err?.message);
      },
    });
  }

  // like a comment
  like(commentId: string, onModel: string) {
    let payload = {
      onModel: onModel,
      likable: commentId,
    };
    this.tweetService.likeComment(payload).subscribe({
      next: (resp) => {
        // this.notoficationService.showNotification('success', resp?.message);
        console.log(resp);

        if (resp.data) {
          let likedComment = this.comments.find(
            (comment: any) => comment._id === resp.data._id,
          );
          // // Logic: Overwrite the old tweet object with the new one.
          // Angular doesn't care that the 'likes' array now has strings
          // instead of objects; it only cares that the array length changed.

          // If you eventually decide you want to show the profile pictures or names of the people who liked the comment, that's when you'll need to sync up with the BACKEND to make those responses consistent.
          likedComment.likes = resp.data.likes;
        }
      },
      error: (err) => {
        // this.notoficationService.showNotification('error', err?.message);
      },
    });
  }

  toggleComment(commentId: string) {
    // this.isExpanded = !this.isExpanded;
    // this.expandedCommentId =
    //   this.expandedCommentId === commentId ? null : commentId;
    // Only one form can be active at a time
    this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
  }

  ngOnInit() {
    // this.tweetService.getalltweets().subscribe({
    //   next: (resp) => {
    //     // this.notoficationService.showNotification('success', resp?.message);
    //     console.log(resp);
    //     this.comments = resp.data.flatMap((tweet) => tweet.comments || []);
    //     // this.comments = resp.data?.comments;
    //   },
    //   error: (err) => {
    //     // this.notoficationService.showNotification('error', err?.message);
    //   },
    // });
  }
}
