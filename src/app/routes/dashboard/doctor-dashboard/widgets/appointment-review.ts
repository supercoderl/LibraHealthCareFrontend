import { Component, ViewChild } from "@angular/core";
import { SharedModule } from "../../../../shared";
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from "ng-apexcharts";

type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'appointment-review',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <div id="chart">
            <apx-chart
                [series]="chartOptions.series"
                [chart]="chartOptions.chart"
                [plotOptions]="chartOptions.plotOptions"
                [labels]="chartOptions.labels"
            ></apx-chart>
        </div>
    `
})

export class AppointmentReview {
    @ViewChild("chart") chart?: ChartComponent;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [44, 55, 67, 83],
            chart: {
                height: 362,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: "22px"
                        },
                        value: {
                            fontSize: "16px"
                        },
                        total: {
                            show: true,
                            label: "Total",
                            formatter: function () {
                                return "249";
                            }
                        }
                    }
                }
            },
            labels: ["Apples", "Oranges", "Bananas", "Berries"]
        };
    }
}