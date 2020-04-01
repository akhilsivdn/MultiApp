import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timehh = 0;
  timemm = 0;
  timess = 0;
  isPaused = false;
  isStarted = false;
  isStopped = false;

  constructor() { }

  ngOnInit() {
  }

  startTimer(){
    this.isStarted = true;
    if(this.isPaused){
      this.isPaused = false;
      return;
    }

    if(this.isStopped){
      this.isStopped = false;
      return;
    }
    this.startIt();
  }

  startIt(){
    setInterval(()=>{
      if(!this.isPaused && !this.isStopped){
      if(this.timess == 59){
        this.timemm ++;
        this.timess = 0;
      }
      if(this.timemm == 60){
        this.timehh ++;
        this.timemm = 0;
      }
      this.timess ++;
    }
    }, 1000);
  }

  pauseTimer(){
    this.isPaused = !this.isPaused;
  }

  stopTimer(){
    this.isStopped = true;
    this.isPaused = false;
    this.isStarted = false;
    this.timehh = this.timemm = this.timess = 0;
  }
}
