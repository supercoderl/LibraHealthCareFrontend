import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexLegend, ApexFill, ChartComponent } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    colors: string[];
    legend: ApexLegend;
    fill: ApexFill;
};

@Component({
    selector: 'earning-bar',
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
            [dataLabels]="chartOptions.dataLabels"
            [yaxis]="chartOptions.yaxis"
            [colors]="chartOptions.colors"
            [grid]="chartOptions.grid"
        />
        </div>
    `
})

export class EarningBar {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "South",
                    data: this.generateDayWiseTimeSeries(
                        new Date("11 Feb 2017 GMT").getTime(),
                        10,
                        {
                            min: 0,
                            max: 8
                        }
                    )
                },
            ],
            chart: {
                type: "area",
                height: 135,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false,
                }
            },
            colors: ["#008FFB", "#00E396", "#CED4DC"],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: "datetime",
                labels: {
                    show: false // Ẩn nhãn trục X
                },
                axisTicks: {
                    show: false // Ẩn dấu gạch trên trục X
                },
                axisBorder: {
                    show: false // Ẩn đường trục X
                }
            },
            yaxis: {
                labels: {
                    show: false // Ẩn nhãn trục Y
                },
                axisTicks: {
                    show: false // Ẩn dấu gạch trên trục Y
                },
                axisBorder: {
                    show: false // Ẩn đường trục Y
                }
            },
            grid: {
                show: false
            }
        };
    }

    public generateDayWiseTimeSeries = function (baseval: number, count: number, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };
}