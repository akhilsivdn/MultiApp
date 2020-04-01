import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimerComponent } from './components/timer/timer.component';
import { QuizComponent } from './components/quiz/quiz.component';


const routes: Routes = [{
  path: 'timer',
  component: TimerComponent
},
{
  path: 'quiz',
  component: QuizComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
