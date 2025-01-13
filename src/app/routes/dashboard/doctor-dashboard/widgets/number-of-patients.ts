import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexXAxis, ApexFill, ApexTooltip, ApexStroke, ApexLegend, ChartComponent } from "ng-apexcharts";

type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'number-of-patients',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div id="chart">
            <apx-chart
                [series]="chartOptions.series"
                [chart]="chartOptions.chart"
                [dataLabels]="chartOptions.dataLabels"
                [plotOptions]="chartOptions.plotOptions"
                [yaxis]="chartOptions.yaxis"
                [legend]="chartOptions.legend"
                [fill]="chartOptions.fill"
                [stroke]="chartOptions.stroke"
                [tooltip]="chartOptions.tooltip"
                [xaxis]="chartOptions.xaxis"
            ></apx-chart>
        </div>
    `
})

export class NumberOfPatients {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Net Profit",
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                },
                {
                    name: "Revenue",
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                },
                {
                    name: "Free Cash Flow",
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }
            ],
            chart: {
                type: "bar",
                height: 450
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct"
                ]
            },
            yaxis: {
                title: {
                    text: "$ (thousands)"
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return "$ " + val + " thousands";
                    }
                }
            }
        };
    }
}