import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdChartComponent } from './entities/components/third.chart/third.chart.component';
import { SecondChartComponent } from './entities/components/second.chart/second.chart.component';
import { FirstChartComponent } from './entities/components/first.chart/first.chart.component';


export const routes: Routes = [
    {
        path: 'firstChart',
        component: FirstChartComponent
      },
      {
        path: 'secondChart',
        component: SecondChartComponent
      },
      {
        path: 'thirdChart',
        component: ThirdChartComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'main'
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }