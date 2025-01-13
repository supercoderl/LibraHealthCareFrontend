import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexMarkers, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'performace-heart-rate',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-card nzTitle="Performance Heart Rate">
            <div id="chart" class="overflow-hidden">
                <apx-chart
                    [series]="chartOptions.series"
                    [chart]="chartOptions.chart"
                    [yaxis]="chartOptions.yaxis"
                    [xaxis]="chartOptions.xaxis"
                    [labels]="chartOptions.labels"
                    [stroke]="chartOptions.stroke"
                    [markers]="chartOptions.markers"
                    [fill]="chartOptions.fill"
                    [tooltip]="chartOptions.tooltip"
                ></apx-chart>
            </div>
        </nz-card>
    `
})

export class PerformanceHeartRate {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "TEAM A",
                    type: "area",
                    data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
                },
                {
                    name: "TEAM B",
                    type: "line",
                    data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
                }
            ],
            chart: {
                height: 350,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false,
                }
            },
            stroke: {
                curve: "smooth"
            },
            fill: {
                type: "solid",
                opacity: [0.35, 1]
            },
            labels: [
                "Dec 01",
                "Dec 02",
                "Dec 03",
                "Dec 04",
                "Dec 05",
                "Dec 06",
                "Dec 07",
                "Dec 08",
                "Dec 09 ",
                "Dec 10",
                "Dec 11"
            ],
            markers: {
                size: 0
            },
            yaxis: [
                {
                    title: {
                        text: "Series A"
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: "Series B"
                    }
                }
            ],
            xaxis: {
                labels: {
                    trim: false
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y: any) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " points";
                        }
                        return y;
                    }
                }
            }
        };
    }

    public generateData(count: number, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = "w" + (i + 1).toString();
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push({
                x: x,
                y: y
            });
            i++;
        }
        return series;
    }
}