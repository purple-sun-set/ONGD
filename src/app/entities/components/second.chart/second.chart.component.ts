import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-second.chart',
  templateUrl: './second.chart.component.html',
  styleUrl: './second.chart.component.css'
})
export class SecondChartComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const data = {
      labels: [307.363245392476, 283.0956724261307, 281.03298464105967, 278.97029055292893, 276.9075901617384, 275.9999999927861],
      datasets: [
        {
          label: 'Зависимость температуры от глубины скважины',
          data: [0, 250, 500, 750, 1000, 1100],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
              text: 'Температура, К'
            }
          }
        }
      }
    };

    this.chart = new Chart('myChart', config);
  }
}
