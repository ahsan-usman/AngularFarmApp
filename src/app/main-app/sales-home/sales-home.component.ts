import { AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SalesDialogComponent } from './../sales-dialog/sales-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['date', 'truckNumber', 'driver', 'emptyWeight', 'loadedWeight', 'weight', 'rate', 'totalAmount', 'birds', 'gatePass', 'note', 'action'];
  totalSoldBirds: number = 0;
  totalweight: number = 0;
  totalAmountRate: number = 0;
  flockId: number = 0;
  selectedValue: string = "";
  flockName: string = "";
  farmName: string = "";

  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private toast: NgToastService,
    private activeRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
    this.activeRoute.queryParams.subscribe(f => {
      this.farmName = f['farmName'];
      this.flockName = f['flockName'];
      this.getFarmsData()
    });
  }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData(this.flockId)
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getFarmsData() {
    this.apiService.getFlockData().subscribe(
      res => {
        const data = res.filter((x: any) => x.flockName == this.flockName)
        data.forEach((element: any) => {
          this.flockId = element._id;
        });
        this.getAllData(this.flockId)
      }, err => {
        console.log("error while farm fetching ", err)
      });
  }

  openDialog() {
    this.dialog.open(SalesDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData(this.flockId);
      }
    })
  }
  getAllData(flockId: any) {
    this.apiService.getSalesData()
      .subscribe({
        next: (res) => {
          const flockData = res.filter((d: { flock_id: any; }) => d.flock_id === flockId)
          this.dataSource = new MatTableDataSource(flockData);

          this.totalSoldBirds = 0;
          this.dataSource.data.map(d => {
            this.totalSoldBirds += d.birds;
          })

          var netWeight = 0;
          this.dataSource.data.map(n => {
            netWeight = n.loadedWeight - n.emptyWeight;
            n.weight = netWeight;
          })

          var rate = 0;
          this.dataSource.data.map(r => {
            rate = r.weight * r.rate;
            r.totalAmount = rate;
          })

          this.totalweight = 0;
          this.dataSource.data.map(w => {
            this.totalweight += w.weight
          })

          this.totalAmountRate = 0;
          this.dataSource.data.map(t => {
            this.totalAmountRate += t.totalAmount;
          })
          this.dataSource.sort = this.sort;
        }, error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Fetching  Data", duration: 5000 })
        }
      })
  }

  editData(row: any) {
    this.dialog.open(SalesDialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData(this.flockId)
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteSalesData(id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Deleted Successfully", duration: 4000 })
          this.getAllData(this.flockId)
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Deleting Data", duration: 5000 })
        }
      })
  }

  print() {
    window.print()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
