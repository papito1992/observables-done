import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
numberObsSubscription: Subscription;
customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNrs =  Observable.interval(1000).map(
      (data: number) => {
      return (data * 2);
    });
    this.numberObsSubscription = myNrs.subscribe((number: number) => console.log(number));

    const myObserv = Observable.create((observer: Observer<string>) => {
    setTimeout(() => {observer.next('first pcg'); }, 2000);
    setTimeout(() => {observer.next('2 pcg'); }, 4000);
    setTimeout(() => {observer.error('this doesnt work'); }, 5000);
    });
   this.customObsSubscription = myObserv.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }

    );
  }
  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();

  }

}
