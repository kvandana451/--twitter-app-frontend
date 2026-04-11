import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../models/tweet-type';

@Injectable({
  providedIn: 'root',
})
export class DatabusService {
  constructor() {}

  // private dataSource (The Source): A BehaviorSubject that acts as the "Writer." It holds the current value and allows the service to push new data using .next().
  // (BehaviorSubject): It stores the latest value. New subscribers get the current state immediately, even if they subscribe long after the data was sent.

  private dataSource = new BehaviorSubject<any>(null); //Behaviour Subject is an Observable.
  data$ = this.dataSource.asObservable(); //Why use .asObservable()? (Encapsulation)Data Integrity: It hides the .next() method from components.Read-Only Access: Components can subscribe to the data, but they cannot change the data. Only the service has the "remote control" to update the stream.Single Source of Truth: Ensures that all data logic stays inside the service, making the app easier to debug.
  sendData(data: Data) {
    this.dataSource.next(data);
  }
}

// Why Use a Subject at all?
// Manual Control: Plain Observables are "passive" (like an HTTP call). You can't manually tell them to emit. A Subject is "active"—it gives you a .next() method to trigger data updates whenever you want (e.g., on a button click).
