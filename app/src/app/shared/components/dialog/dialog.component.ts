import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { TweetService } from '../../../services/tweet.service';
import { Data } from '../../../models/tweet-type';
import { DatabusService } from '../../../services/databus.service';

@Component({
  selector: 'app-dialog',
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, TextareaModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  content: string = '';

  constructor(
    private tweetService: TweetService,
    private dataBus: DatabusService,
  ) {}
  // Creating a Blog using post api
  createBlog() {
    if (!this.content) return;
    let payload = { content: this.content };
    this.tweetService.createTweet(payload).subscribe({
      // success status code 2xx
      next: (resp) => {
        //typescript infers automatically, 'resp' type as <NewTweet>
        // this.notoficationService.showNotification('success', resp?.message);
        this.content = '';
        console.log(resp);
        this.dataBus.sendData(resp.data);
      },
      // error status code
      error: (err) => {
        console.log('Error is', err); //catches first error occurances either customised error else http client error
        // this.notoficationService.showNotification('error', err?.message);
      },

      complete: () => {
        console.log('Now i am done with the stream ');
      },
    });
  }
}
