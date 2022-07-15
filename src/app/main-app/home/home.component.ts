import { ApiService } from './../../services/api.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any[] = ['date', 'age', 'mortality', 'cumMortality', 'cumMortalityPercent', 'feed', 'usedFeed', 'cumFeed', 'diesel', 'cumDiesel', 'weight', 'note', 'action'];
  totalMortality: number = 0;
  totalFeed: number = 0;
  usedFeed: number = 0;
  diesel: number = 0;
  cummulativeMortalityResult: number = 0;
  Feed: number = 0;
  Weight: number = 0;
  percent: number = 0;
  totalBirds: number = 0;
  cummulativeMortalityTotal: any;
  FeedTotal: any;
  Diesel: any;
  dieselCum: any;
  data:any;
  percentage: any[] = [];
  cumMortalityPercent: any;
  flockName: string = "";
  flockId: string = "";
  farmName:string = "";

  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(f => { 
      this.farmName = f['farmName'];
      this.flockName = f['flockName'];
      this.getFarmsData()
    });    
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',    
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData(this.flockId);
      }
    })
  }
  
  getFarmsData() {
    this.apiService.getFlockData().subscribe(
      res => {
        this.data = res;
        this.select()
        this.getAllData(this.flockId)
      }, err => {
        console.log("error while farm fetching ", err)
      });
  }

  select(){
    const testing = this.data.filter((x: any) => {
      if (x.flockName == this.flockName) {
        return x._id;
      }
    });
    testing.forEach((element: any) => {
      this.flockId = element._id;
      this.totalBirds = element.totalBirds;
    });
  }

  getAllData(farmID: any) {
    this.apiService.getData()
      .subscribe({
        next: (res) => {     
          const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === this.flockId);
          this.dataSource = new MatTableDataSource(farmData);
          //for calculating Mortality Total Sum
          this.totalMortality = 0;
          this.dataSource.data.map(d => {
            this.totalMortality = this.totalMortality + (parseInt(d.mortality));
          });

          //for Calculating Total Weight
          this.Weight = 0;
          this.dataSource.data.map(w => {
            this.Weight +=  (parseInt(w.weight));
          });

          //for calculating total feed
          this.totalFeed = 0;
          this.dataSource.data.map(f => {
            this.totalFeed +=  (parseInt(f.feed));
          });

          //for calculating total used feed
          this.usedFeed = 0;
          this.dataSource.data.map(u => {
            this.usedFeed += (parseInt(u.usedFeed));
          })

          //for calculating total diesel 
          this.diesel = 0;
          this.dataSource.data.map(d => {
            this.diesel += (parseInt(d.diesel));
          })

          //for cummulative mortality calculation 
          this.cummulativeMortalityTotal = [];
          this.dataSource.data.map(m => {
            this.cummulativeMortalityResult += (parseInt(m.mortality));
            this.cummulativeMortalityTotal.push(this.cummulativeMortalityResult);
            m.cumMortality = this.cummulativeMortalityTotal
          });

          //For Cummulative Feed calculation
          this.FeedTotal = [];
          this.dataSource.data.map(f => {
            this.Feed = this.Feed + (parseInt(f.usedFeed));
            this.FeedTotal.push(this.Feed);
            f.cumFeed = this.FeedTotal
          })

          //For Cummulative Diesel calculation
          this.dieselCum = [];
          this.Diesel = 0;
          this.dataSource.data.map(d => {
            this.Diesel =this.Diesel + (parseInt(d.diesel));
            this.dieselCum.push(this.Diesel);
            d.cumDiesel = this.dieselCum
          })

          //for Cummulative Percentage of Mortality
          for (let index = 0; index < this.cummulativeMortalityTotal.length; index++) {
            const element = this.cummulativeMortalityTotal[index];
            this.percent = element * 100 / this.totalBirds;

            this.percentage.push(this.percent);
          }
          this.dataSource.data.map(p => {
            p.cumMortalityPercent = this.percentage;
          })
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error Occured while Fetching Records")
        }
      })
  }

  editData(row: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData(this.flockId)
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteData(id)
      .subscribe({
        next: (res) => {
          alert("Product Deleted Successfully")
          this.getAllData(this.flockId);
        },
        error: (err) => {
          console.log(err)
          alert("Error While Deleting Data")
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  print() {
    window.print()
  }
}

