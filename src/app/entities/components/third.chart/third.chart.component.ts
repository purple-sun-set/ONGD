import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-third.chart',
  templateUrl: './third.chart.component.html',
  styleUrl: './third.chart.component.css'
})
export class ThirdChartComponent implements OnInit {
  chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const data = {
      labels: [223.99576522308485, 224.16320460757868, 224.33064397403, 
        224.49808332317656, 224.6655226557259, 224.73249838425136],
      datasets: [
        {
          label: 'Зависимость равновесной температуры гидратообразования от глубины скважины',
          data: [0, 250, 500, 750, 1000, 1100],
          fill: false,
          borderColor: 'rgb(222, 0, 255)',
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
              text: 'Равновесная температура гидратообразования, К'
            }
          }
        }
      }
    };

    this.chart = new Chart('myChart', config);
  }
}
