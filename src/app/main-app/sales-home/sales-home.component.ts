import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SalesDialogComponent } from './../sales-dialog/sales-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent implements OnInit {

  displayedColumns: any[] = ['date', 'age', 'truckNumber', 'weight', 'cumWeight','sold','note', 'action'];

  totalSoldBirds: number = 0;
  totalweight: number = 0;
  cummWeightTotal: any;
  cummWeightResult: number = 0;

  constructor(private dialog: MatDialog, private apiService:ApiService) { }
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData()
  }
  openDialog() {
    this.dialog.open(SalesDialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData();
      }
    })
  }
  getAllData(){
    this.apiService.getSalesData()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });

          this.totalSoldBirds= 0 ;
          this.dataSource.data.map(d=>{
            this.totalSoldBirds += d.sold;
          })

          this.totalweight = 0;
          this.dataSource.data.map(w=>{
            this.totalweight += w.weight
          })

          this.cummWeightTotal = [];
          this.cummWeightResult = 0;

          this.dataSource.data.map(c=>{
            this.cummWeightResult += c.weight;
            this.cummWeightTotal.push(this.cummWeightResult);
            c.cumWeight = this.cummWeightTotal
          })
      },error:()=>{
        alert("Error occured while fetching records")
      }
    })
  }

  editData(row:any){
    this.dialog.open(SalesDialogComponent,{
      width: '50%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllData()
      }
    })
  }

  deleteData(id:number){
    this.apiService.deleteSalesData(id)
    .subscribe({
      next:(res)=>{
        alert("Data Deleted Successfully")
        this.getAllData()
      },
      error:()=>{
        alert("Error while fetching Data")
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
