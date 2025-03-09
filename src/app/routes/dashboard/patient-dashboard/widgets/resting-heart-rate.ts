import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";

type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    markers: any; //ApexMarkers;
    stroke: any; //ApexStroke;
    yaxis: ApexYAxis | ApexYAxis[];
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'resting-heart-rate',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-card [nzTitle]="'app.dashboard.resting-heart-rate' | i18n">
            <div id="chart" class="overflow-hidden relative">
                <apx-chart
                    [series]="chartOptions.series"
                    [chart]="chartOptions.chart"
                    [xaxis]="chartOptions.xaxis"
                    [markers]="chartOptions.markers"
                    [stroke]="chartOptions.stroke"
                    [yaxis]="chartOptions.yaxis"
                    [dataLabels]="chartOptions.dataLabels"
                    [title]="chartOptions.title"
                    [fill]="chartOptions.fill"
                    [tooltip]="chartOptions.tooltip"
                    [legend]="chartOptions.legend"
                ></apx-chart>
            </div>
        </nz-card>
    `
})

export class RestingHeartRate {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Income",
                    type: "column",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    name: "Cashflow",
                    type: "column",
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                },
                {
                    name: "Revenue",
                    type: "line",
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
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
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 4]
            },
            xaxis: {
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: "#008FFB"
                    },
                    labels: {
                        style: {
                            colors: "#008FFB"
                        }
                    },
                    title: {
                        text: "Income (thousand crores)",
                        style: {
                            color: "#008FFB"
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                {
                    seriesName: "Income",
                    opposite: true,
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: "#00E396"
                    },
                    labels: {
                        style: {
                            colors: "#00E396"
                        }
                    },
                    title: {
                        text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: "#00E396"
                        }
                    }
                },
                {
                    seriesName: "Revenue",
                    opposite: true,
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                        color: "#FEB019"
                    },
                    labels: {
                        style: {
                            colors: "#FEB019"
                        }
                    },
                    title: {
                        text: "Revenue (thousand crores)",
                        style: {
                            color: "#FEB019"
                        }
                    }
                }
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                }
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 40
            }
        };
    }
}