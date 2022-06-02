import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customItervalObservable = Observable.create(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count);
        if (count ===2 ){
            observer.complete();
        }
        if (count > 3) {
          observer.error(new Error ('count is greater than 3'));
          
        }
        count++;
      }, 1000)
    });
    this.firstObsSubscription = customItervalObservable.subscribe(data =>{
      console.log(data);
    }, error =>{
      console.log(error);
      alert(error);
      
    })
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
