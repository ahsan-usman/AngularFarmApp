import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedDialogComponent } from './../feed-dialog/feed-dialog.component';
import { Component, EventEmitter, OnInit, Output, ViewChild, DoCheck, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['date', 'cost', 'totalBags', 'usedBags', 'cumUsedBags', 'note', 'action'];
  farmName: string = "";
  flockName: string = "";
  totalBag: number = 0;
  usedBag: number = 0;
  flockId: number = 0;
  cummulativeTotal: any;
  cummulativeResult : number = 0;
  data: any;


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private toast: NgToastService,
    private activeRoute: ActivatedRoute
    ) {
    this.dataSource = new MatTableDataSource();
    this.activeRoute.queryParams.subscribe(f => {
      this.farmName = f['farmName'];
      this.flockName = f['flockName'];
      this.getFarmsData()
    });

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllData(this.flockId)
  }
  openDialog() {
    this.dialog.open(FeedDialogComponent, {
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
        const testing = this.data.filter((x: any) => x.flockName == this.flockName);
        testing.forEach((element: any) => {
          this.flockId = element._id;
        });
        this.getAllData(this.flockId)
      }, err => {
        console.log("error while farm fetching ", err)
      });
  }

  getAllData(flockId: any) {
    this.apiService.getFeedData()
      .subscribe({
        next: (res) => {
          const farmData = res.filter((d: { flock_id: any; }) => d.flock_id === flockId)
          this.dataSource = new MatTableDataSource(farmData);

          this.totalBag = 0;
          this.dataSource.data.map(t => {
            this.totalBag += t.totalBags
          });

          this.usedBag = 0;
          this.dataSource.data.map(u => {
            this.usedBag += u.usedBags;
          })

          this.cummulativeTotal = [];
          this.dataSource.data.map(c => {
            this.cummulativeResult += c.usedBags;
            this.cummulativeTotal.push(this.cummulativeResult)
            c.cumUsedBags = this.cummulativeTotal;
          })
          this.dataSource.sort = this.sort;
        }, error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error While Adding Data", duration: 5000 })
        }
      })
  }

  editData(row: any) {
    this.dialog.open(FeedDialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData(this.flockId)
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteFeedData(id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Success Message", summary: "Data Deleted Successfully", duration: 4000 })
          this.getAllData(this.flockId);
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
