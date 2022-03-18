import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedDialogComponent } from './../feed-dialog/feed-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  displayedColumns: any[] = ['date', 'cost', 'totalBags', 'usedBags','cumUsedBags','note', 'action'];
  totalBag: number = 0;
  usedBag:number = 0;
  cummTotal:any;
  cummResult:any;

  constructor(private dialog: MatDialog, private apiService:ApiService) { }
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData()
  }

  openDialog() {
    this.dialog.open(FeedDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData();
      }
    })
  }

  getAllData(){
    this.apiService.getFeedData()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
          
          this.totalBag = 0;
          this.dataSource.data.map(t => {
            this.totalBag += t.totalBags
          });

          this.usedBag = 0;
          this.dataSource.data.map(u=>{
            this.usedBag += u.usedBags;
          })

          this.cummTotal = [];
          this.cummResult = 0;
          this.dataSource.data.map(c=>{
            this.cummResult += c.usedBags;
            this.cummTotal.push(this.cummResult)
            c.cumUsedBags = this.cummTotal;
          })
      },error:()=>{alert("Error occured while fetching record")}
    })
  }

  editData(row:any){
    this.dialog.open(FeedDialogComponent,{
      width:'50%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllData()
      }
    })
  }

  deleteData(id:number){
    this.apiService.deleteFeedData(id)
    .subscribe({
      next:(res)=>{
        alert("Data deleted Successfully")
      },
      error:()=>{
        alert("Error while deleting record")
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
