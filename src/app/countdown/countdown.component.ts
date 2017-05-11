import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

    private days: number;
    private hours: number;
    private minutes: number;
    private seconds: number;

    private counter: Observable<number>;
    private subscription: Subscription;

    private now: any;

    constructor() {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    ngOnInit() {


        this.counter = Observable.interval(1000).map((x) => {
            this.now = new Date().getTime();
            return x;
        });

        this.subscription = this.counter.subscribe((x) => this.updateTimes(this.now));
    }

    updateTimes(now: any){
        let countDownDate = new Date("Jan 1, 2018").getTime();

        let timeLeft = countDownDate - now;

        let hour = 1000*60*60;

        this.days = Math.floor(timeLeft/(hour*24));
        this.hours = Math.floor((timeLeft % (hour*24)) / hour);
        this.minutes = Math.floor((timeLeft % hour) / (1000 * 60));
        this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    }

}
