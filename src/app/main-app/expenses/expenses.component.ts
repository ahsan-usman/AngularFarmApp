import { ActivatedRoute } from '@angular/router';
import { EventEmitter, DoCheck } from '@angular/core';
import { ExpenseDialogComponent } from './../expense-dialog/expense-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any[] = ['date', 'utility', 'salary', 'maintenance', 'note', 'action'];
  TotalExpense: number = 0;
  total: number = 0;
  flockId: number = 0;
  farmName:string = "";
  flockName: string = "";

  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private toast: NgToastService
  ) {
    this.activeRoute.queryParams.subscribe(f => {
      this.farmName = f['farmName'];
      this.flockName = f['flockName'];
      this.getFarmsData();
    });

  }
  ngOnInit(): void {

  }

  getFarmsData() {
    this.apiService.getFlockData().subscribe(
      res => {
        const data = res.filter((x:any) => x.flockName == this.flockName);
        data.forEach((element:any) => {
          this.flockId = element._id;    
        });
        this.getAllData(this.flockId)
      }, err => {
        console.log("error while farm fetching ", err)
      });
  }
  openDialog() {
    this.dialog.open(ExpenseDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData(this.flockId)
      }
    }
    )
  }

  getAllData(flockId: any) {
    this.apiService.getExpenseData()
      .subscribe({
        next: (res) => {
          const flockData = res.filter((d: { flock_id: any; }) => d.flock_id === flockId)
          this.dataSource = new MatTableDataSource(flockData);
          this.total = 0;
          this.dataSource.data.map(t => {
            this.total += t.utility + t.salary + t.maintenance;
          })
          this.dataSource.sort = this.sort;
        }, error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error Occured while Fetching Data", duration: 5000 })
        }
      })
  }

  editData(row: any) {
    this.dialog.open(ExpenseDialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData(this.flockId)
      }
    })
  }

  deleteData(id: string) {
    this.apiService.deleteExpenseData(id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: "Record Deleted", summary: "Record Deleted Successfully", duration: 5000 })
          this.getAllData(this.flockId)
        },
        error: () => {
          this.toast.error({ detail: "Error Message", summary: "Error Occured while Fetching Data", duration: 5000 })
        
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
  // deleteAll(){
  //   this.storedata.forEach((element:any) => {
  //     console.log(element.id);
  //     this.apiService.deleteExpenseData(element.id)
  //     .subscribe(
  //       res=>{
  //         console.log(res)      
  //       });
  //   });  
  // }
}
