import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatabusService } from '../../services/databus.service';

@Component({
  selector: 'app-comming-soon',
  imports: [],
  templateUrl: './comming-soon.component.html',
  styleUrl: './comming-soon.component.scss',
})
export class CommingSoonComponent {
  constructor(
    private route: Router,
    private ds: DatabusService,
  ) {}
  goBack() {
    this.route.navigate(['/home']);
  }
  ngOnInit() {
    this.ds.dataSource.subscribe((data) => {
      console.log(data);
    });
  }
}
