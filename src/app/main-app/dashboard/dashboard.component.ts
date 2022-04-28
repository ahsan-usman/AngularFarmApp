import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Observable } from 'rxjs';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  UserName: string = "";
  FarmName: string = "";
  SelectedFarmvalue: string = "";
  flockValue: string = "";
  FlockName: string = "";
  selectedFlockId: string = "";
  Expensetotal: number = 0;
  vaccinatedTotal: number = 0;
  totalMortality: number = 0;
  totalFeed: number = 0;
  totalUsedFeed: number = 0;
  totalWeight: number = 0;
  totalDiesel: number = 0;
  totalSoldBirds: number = 0;
  totalBirds: number = 0;
  selectFarmOptions: any;
  flockOptions: any;
  UserData: any;
  flockDetails: any;
  markers: any = [];

  constructor(private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.addMarker()
    this.UserData = JSON.parse(localStorage.getItem("userData")!);
    this.UserName = this.UserData?.fullname;
    this.apiService.getFarmData()
      .subscribe(res => {
        this.selectFarmOptions = res;
        this.activeRoute.queryParams.subscribe(s => {
          this.FarmName = s['farmName'];
          this.initData(this.FarmName)
        });
      });

    this.apiService.getFlockData()
      .subscribe(res => {
        this.flockOptions = res;
        this.activeRoute.queryParams.subscribe(f => {
          this.FlockName = f['flockName']
          this.flockData(this.FlockName)
        })
      })
  }

  flockDropDown(val: any) {
    this.afterSelect(val)
    this.flockValue = val;
  }

  flockData(val: any) {
    const flockId = this.flockOptions.find((x: any) => x.flockName == val)
    this.selectedFlockId = flockId?._id;
    localStorage.setItem('flockid', this.selectedFlockId)
    this.populateData()
  }

  initData(val: any) {
    const farmId = this.selectFarmOptions.find((x: any) => x.farmName == val);
    this.SelectedFarmvalue = farmId?._id;
    localStorage.setItem('farmid', this.SelectedFarmvalue)

    setTimeout(() => { this.chartUpdate() }, 2000);
  }

  SelectDropDown(val: any) {
    this.afterSelect(val);
    this.apiService.getFlockData()
      .subscribe(res => {
        this.flockOptions = res;
        this.flockDetails = this.flockOptions.filter((x: any) => x.farms_id == this.SelectedFarmvalue);
      });
  }

  afterSelect(val: any) {
    this.router.navigate([], { queryParams: { farmName: this.FarmName, flockName: this.FlockName } })
    this.Expensetotal = 0;
    this.vaccinatedTotal = 0;
    this.totalMortality = 0;
    this.totalFeed = 0;
    this.totalUsedFeed = 0;
    this.totalWeight = 0;
    this.totalDiesel = 0;
    this.totalSoldBirds = 0;
  }

  populateData() {
    // this.apiService.getAllData()
    // .subscribe(stats => {
    //   console.log("response", stats)
    //   let mortalityTotal;
    //   let weightTotal;
    //   stats.reduce((accumulator:any, object:any) => {
    //     if(object.mortality){
    //       mortalityTotal = accumulator + object.mortality;
    //       return accumulator + object.mortality;
    //     }
    //     else if(object.salary){
    //       weightTotal = accumulator + object.salary;    
    //       return accumulator + object.salary;   
    //     }
    //   }, 0);
    //   console.log("sum ", mortalityTotal, "sum 2 ", weightTotal)
    // })

    this.apiService.getFlockData()
      .subscribe(res => {
        const farmData = res.filter((d: { _id: any; }) => d._id == this.selectedFlockId);
        farmData.forEach((element: any) => {
          this.totalBirds = element.totalBirds;
        });
      })

    this.apiService.getExpenseData()
      .subscribe(res => {
        const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === this.selectedFlockId);
        farmData.forEach((element: any) => {
          this.Expensetotal = this.Expensetotal + element.salary + element.maintenance + element.utility;
        });
      });

    this.apiService.getVaccineData()
      .subscribe(res => {
        const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === this.selectedFlockId)
        farmData.forEach((element: any) => {
          this.vaccinatedTotal = this.vaccinatedTotal + element.vaccinated;
        });
      })

    this.apiService.getData()
      .subscribe(res => {
        const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === this.selectedFlockId)
        farmData.forEach((element: any) => {
          this.totalMortality = this.totalMortality + element.mortality;
          this.totalFeed = this.totalFeed + element.feed;
          this.totalUsedFeed = this.totalUsedFeed + element.usedFeed;
          this.totalWeight = this.totalWeight + element.weight;
          this.totalDiesel = this.totalDiesel + element.diesel;
        });
      })

    this.apiService.getSalesData()
      .subscribe(res => {
        const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === this.selectedFlockId)
        farmData.forEach((element: any) => {
          this.totalSoldBirds = this.totalSoldBirds + element.birds;
        });
      })
  }

  chartUpdate() {
    if (!this.charts) {
      return
    }
    this.charts.forEach(child => {
      this.pieChartData.datasets.map(d => {
        d.data = [this.totalBirds, this.totalSoldBirds, this.totalMortality]
        child.chart?.update()
      }),
        this.pieChartData2.datasets.map(x => {
          x.data = [this.totalFeed, this.totalUsedFeed]
          child.chart?.update()
        })
    });
  }

  apiLoaded!: Observable<boolean>;
  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: 31.885724, lng: 73.301950 };
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    minZoom: 8,
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: 31.885724,
        lng: 73.301950
      },
      label: {
        color: 'darkgray',
        text: 'Farm 1'
      },
      options: { animation: google.maps.Animation.BOUNCE },
    }, {
      position: {
        lat: 31.882224,
        lng: 73.303350
      },
      label: {
        color: 'darkgray',
        text: 'Farm 2'
      },
      options: { animation: google.maps.Animation.BOUNCE }
    })
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Total Birds'], ['Sold Birds'], ['Total Mortality']],
    datasets: [{
      data: [],
      backgroundColor: [
        '#DDA063',
        '#EEDEC7',
        '#944b03'
      ],
      hoverBackgroundColor: [
        '#DDA063',
        '#EEDEC7',
        '#944b03'
      ],
      hoverBorderColor: [
        '#DDA063',
        '#EEDEC7',
        '#944b03'
      ]
    }],
  }

  public pieChartData2: ChartData<'pie', number[], string | string[]> = {
    labels: [['Total Feed'], ['Used Feed']],
    datasets: [{
      data: [],
      backgroundColor: [
        '#DDA063',
        '#EEDEC7'
      ],
      hoverBackgroundColor: [
        '#DDA063',
        '#EEDEC7'
      ],
      hoverBorderColor: [
        '#DDA063',
        '#EEDEC7'
      ]
    },
    ],
  }
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartColors = [{
    backgroundColor: ['#DDA063',
      '#EEDEC7',]
  }]
}
