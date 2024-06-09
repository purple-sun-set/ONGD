import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ThirdChartComponent } from './entities/components/third.chart/third.chart.component';
import { SecondChartComponent } from './entities/components/second.chart/second.chart.component';
import { FirstChartComponent } from './entities/components/first.chart/first.chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ThirdChartComponent,
    SecondChartComponent,
    FirstChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }