import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VaccineDialogComponent } from '../vaccine-dialog/vaccine-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  flockName: string = "";
  farmName: string = "";
  Totalbirds: number = 0;
  totalVaccinatedBirds: number = 0;
  remaining: number = 0;
  flockId: number = 0;
  displayedColumns: any[] = ['date', 'medicine', 'price', 'quantity', 'vaccinated', 'note', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private toast: NgToastService,
    private activeRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
    this.activeRoute.queryParams.subscribe(f => {
      this.farmName = f['farmName'];
      this.flockName = f['flockName'];
      this.getFarmsData()
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getFarmsData() {
    this.apiService.getFlockData().subscribe(
      res => {
        const data = res.filter((x: any) => x.flockName == this.flockName);
        data.forEach((element: any) => {
          this.flockId = element._id;
          this.Totalbirds = element.totalBirds;
        });
        this.getAllData(this.flockId)
      }, err => {
        console.log("error while farm fetching ", err)
      });
  }

  getAllData(flockId: any) {
    this.apiService.getVaccineData()
      .subscribe({
        next: (res) => {
          this.totalVaccinatedBirds = 0;
          const flockData = res.filter((d: { flock_id: any; }) => d.flock_id === flockId)
          this.dataSource = new MatTableDataSource(flockData);
          this.dataSource.data.map(m => {
            this.totalVaccinatedBirds += m.vaccinated;
          })
          this.remaining = 0;
          this.dataSource.data.map(r => {
            this.remaining = this.Totalbirds - this.totalVaccinatedBirds;
          })
          this.dataSource.sort = this.sort;
        }, error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error Occured While Fetching  Data", duration: 5000 })
        }
      })
  }

  editData(row: any) {
    this.dialog.open(VaccineDialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData(this.flockId)
      }
    })
  }
  openDialog() {
    this.dialog.open(VaccineDialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData(this.flockId);
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteVaccineData(id)
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
