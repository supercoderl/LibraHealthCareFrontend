import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from "ng-apexcharts";

type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'patient-survey',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div id="chart">
            <apx-chart
                [series]="chartOptions.series"
                [chart]="chartOptions.chart"
                [xaxis]="chartOptions.xaxis"
                [stroke]="chartOptions.stroke"
                [tooltip]="chartOptions.tooltip"
                [dataLabels]="chartOptions.dataLabels"
            ></apx-chart>
        </div>
    `
})

export class PatientSurvey {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "series1",
                    data: [31, 40, 28, 51, 42, 109, 100]
                },
                {
                    name: "series2",
                    data: [11, 32, 45, 32, 34, 52, 41]
                }
            ],
            chart: {
                height: 350,
                type: "area"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "datetime",
                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z"
                ]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            }
        };
    }

    public generateData(baseval: number, count: number, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
}