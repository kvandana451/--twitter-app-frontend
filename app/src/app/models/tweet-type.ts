export type Data = {
  _id: string;
  content: string;
  createdby: { username: string; id: string };
  __v: number;
  comments: CommentData[];
  // likes: any[];
  // never use emppty type like this likes:[]
  likes: LikeData[];
};

// Request Payload
export type CreateTweet = {
  content: string;
};
// Response Payload /MODEL for the created Tweet
export type NewTweet = {
  success: boolean;
  message: string;
  data: Data;
  err: {};
};
// Response Payload /MODEL for the getting all the tweets from the db

export type Tweets = {
  success: boolean;
  message: string;
  data: Data[];
  err: {};
};
// {
//     "success": true,
//     "message": "data created successfully",
//     "data": {
//         "_id": "6947cf2133bd4575cffa6f92",
//         "content": "#postmans demoes",
//         "likes": [
//             {
//                 "onModel": "Tweet",
//                 "likable": "6947cf2133bd4575cffa6f92",
//                 "user": "692ff089a47eab999e4acc82",
//                 "_id": "6947cf5833bd4575cffa6fa1",
//                 "__v": 0
//             }
//         ],
//         "comments": [],
//         "createdby": {
//             "_id": "692ff089a47eab999e4acc82",
//             "username": "Messiah"
//         },
//         "__v": 1
//     },
//     "err": {}
// }
// Request Payload for Liking a Tweet
export type LikePayload = {
  likable: string;
  onModel: 'Tweet' | 'Comment';
};
export type LikeClickData = {
  _id: string;
  content: string;
  createdby: { username: string; id: string };
  __v: number;
  comments: Comment[];
  likes: LikesClickData[];
};
// Response payload /Modal for Liking a tweet

export type Like = {
  success: boolean;
  message: string;
  data: LikeClickData;
  err: {};
};
export type LikeData = {
  _id: string;
  user: { _id: string; username: string };
};
// response payload/modal for likes field, upon liking a tweet
export type LikesClickData = {
  onModel: 'Tweet' | 'Comment';
  likable: String;
  user: string;
  _id: string;
  _v: number;
};

// Comments Interface section
// Response payload for commenting tweet
export interface CommentApiResponse {
  success: boolean;
  message: string;
  data: CommentData;
  err: {};
}

// 2. Define the main Data payload
export interface CommentData {
  _id: string;
  content: string;
  user: { _id: string; username: string };
  onModel: 'Tweet' | 'Comment';
  comments: any[]; // Replace 'any' with a Comment interface if they share the same structure
  likes: any[];
  commentable: string;
  __v: number;
}
// {
//     "success": true,
//     "message": "data created successfully",
//     "data": {
//         "_id": "6924af5299bc24cabe8b8faf",
//         "content": "inner comment",
//         "user": "6924a20a99bc24cabe8b8f35",
//         "onModel": "Comment",
//         "comments": [],
//         "likes": [],
//         "commentable": "6924ad1399bc24cabe8b8f4d",
//         "__v": 6
//     },
//     "err": {}
// }

// Response Payload for liking a comment
export interface LikeCommentApiResponse {
  success: boolean;
  message: string;
  data: LikeCommentData;
  err: {};
}
export interface LikeCommentData {
  _id: string;
  content: string;
  user: string;
  onModel: string;
  comments: any[];
  likes: any[];
  commentable: string;
  __v: number;
}
