import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { min } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-first.chart',
  templateUrl: './first.chart.component.html',
  styleUrl: './first.chart.component.css'
})
export class FirstChartComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const data = {
      labels: [10.069762611228342, 10.282168360800915, 10.499054450813622, 10.72051538696661, 10.946647668398331, 11.038430560037236].reverse(),
      datasets: [
        {
          label: 'Зависимость давления от глубины скважины',
          data: [1100, 1000, 750, 500, 250, 0],
          fill: false,
          borderColor: 'rgb(255, 0, 0)',
        },
      ]
    };

    const config: any = { 
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            min: 0,
            max: 1100,
            reverse: true,
            type: 'linear',
            title: {
              display: true,
              text: 'Глубина, м'
            }
          },
          x: {
            beginAtZero: true,
            type: 'linear',
            title: {
              display: true,
              text: 'Давление, МПа'
            }
          }
        }
      }
    };

    this.chart = new Chart('myChart', config);
  }
}
