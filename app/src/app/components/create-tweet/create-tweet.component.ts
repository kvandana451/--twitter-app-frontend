import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
@Component({
  selector: 'app-create-tweet',
  imports: [RippleModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './create-tweet.component.html',
  styleUrl: './create-tweet.component.scss',
})
export class CreateTweetComponent {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}
  show() {
    this.ref = this.dialogService.open(DialogComponent, {
      header: 'Create a Blog',
      width: '40vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      closable: true, // Show X button
      // dismissableMask: true, // Close dialog on mask click
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        console.log('data');
      } else {
        console.log('no data');
      }
    });
  }
}
